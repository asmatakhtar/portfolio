/* ===========================
   PORTFOLIO JAVASCRIPT
   Asmat Akhtar Portfolio
=========================== */

'use strict';

/* ───────────────────────────
   1. NAVBAR + ACTIVE LINK
─────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll class
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveLink();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // Active link via IntersectionObserver
  function highlightActiveLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  }
})();


/* ───────────────────────────
   3. MOBILE HAMBURGER MENU
─────────────────────────── */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    }
  });
})();


/* ───────────────────────────
   4. TYPEWRITER EFFECT
─────────────────────────── */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = ['Python Developer', 'AI Enthusiast', 'Problem Solver', 'Automation Expert'];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let isPaused = false;

  const TYPING_SPEED = 80;
  const DELETE_SPEED = 45;
  const PAUSE_BEFORE_DELETE = 2000;
  const PAUSE_BEFORE_TYPE = 400;

  function type() {
    if (isPaused) return;

    const currentPhrase = phrases[phraseIdx];

    if (!isDeleting) {
      el.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;

      if (charIdx === currentPhrase.length) {
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          isDeleting = true;
          type();
        }, PAUSE_BEFORE_DELETE);
        return;
      }
      setTimeout(type, TYPING_SPEED);
    } else {
      el.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;

      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          type();
        }, PAUSE_BEFORE_TYPE);
        return;
      }
      setTimeout(type, DELETE_SPEED);
    }
  }

  // Start with a slight delay for polish
  setTimeout(type, 1200);
})();


/* ───────────────────────────
   5. SCROLL REVEAL (Intersection Observer)
─────────────────────────── */
(function initScrollReveal() {
  const items = document.querySelectorAll('.reveal-item');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // fire once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px',
  });

  items.forEach(item => observer.observe(item));
})();


/* ───────────────────────────
   6. PROJECT CARD – DYNAMIC GLOW
─────────────────────────── */
(function initCardGlow() {
  const cards = document.querySelectorAll('.project-card-inner');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
})();


/* ───────────────────────────
   7. SMOOTH SCROLL ENHANCEMENT
─────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = document.getElementById('navbar')?.offsetHeight || 72;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
})();


/* ───────────────────────────
   8. HERO PARALLAX (subtle)
─────────────────────────── */
(function initParallax() {
  const orbs = document.querySelectorAll('.orb');
  if (!orbs.length || window.innerWidth < 768) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        orbs.forEach((orb, i) => {
          const speed = (i + 1) * 0.08;
          orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


/* ───────────────────────────
   9. SKILL TAG STAGGER ON REVEAL
─────────────────────────── */
(function initTagStagger() {
  const categories = document.querySelectorAll('.skill-category');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const tags = entry.target.querySelectorAll('.tag');
        tags.forEach((tag, i) => {
          tag.style.transitionDelay = `${i * 60}ms`;
          tag.style.opacity = '0';
          tag.style.transform = 'translateY(8px)';
          requestAnimationFrame(() => {
            setTimeout(() => {
              tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.2s ease';
              tag.style.opacity = '1';
              tag.style.transform = 'translateY(0)';
            }, 200 + i * 60);
          });
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  categories.forEach(cat => observer.observe(cat));
})();


/* ───────────────────────────
   10. FOOTER BACK-TO-TOP
─────────────────────────── */
(function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ───────────────────────────
   11. PAGE LOAD ANIMATION
─────────────────────────── */
(function initPageLoad() {
  // Stagger hero reveal items on first load
  const heroItems = document.querySelectorAll('.hero .reveal-item');
  heroItems.forEach((item, i) => {
    item.style.transitionDelay = `${0.1 + i * 0.12}s`;
  });

  // Trigger hero items after a short wait (before observer fires)
  setTimeout(() => {
    heroItems.forEach(item => item.classList.add('revealed'));
  }, 100);
})();


/* ───────────────────────────
   12. DYNAMIC YEAR IN FOOTER
─────────────────────────── */
(function setFooterYear() {
  const copyEl = document.querySelector('.footer-copy');
  if (copyEl) {
    copyEl.textContent = copyEl.textContent.replace('2025', new Date().getFullYear());
  }
})();