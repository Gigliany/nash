/* =============================================
   NASH — script.js
   Animações, interações e comportamentos
   ============================================= */

'use strict';

/* ===== HEADER: scroll behavior ===== */
(function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run on load
})();


/* ===== MOBILE MENU ===== */
(function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav    = document.getElementById('nav');
  if (!toggle || !nav) return;

  const openMenu = () => {
    toggle.classList.add('is-open');
    nav.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    toggle.classList.remove('is-open');
    nav.classList.remove('is-open');
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    if (nav.classList.contains('is-open')) closeMenu();
    else openMenu();
  });

  // Close on nav link click
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
})();


/* ===== SCROLL ANIMATIONS (IntersectionObserver) ===== */
(function initAnimations() {
  const elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Animate only once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach(el => observer.observe(el));
})();


/* ===== SMOOTH SCROLL for anchor links ===== */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const headerH = document.getElementById('header')?.offsetHeight || 70;
      const targetY = target.getBoundingClientRect().top + window.scrollY - headerH;

      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });
})();


/* ===== ACTIVE NAV LINK on scroll ===== */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const onScroll = () => {
    const scrollY = window.scrollY + 120;

    let currentId = '';
    sections.forEach(section => {
      if (section.offsetTop <= scrollY) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ===== PORTFOLIO: hover glow effect ===== */
(function initPortfolioHover() {
  const cards = document.querySelectorAll('.portfolio-card');

  cards.forEach(card => {
    const thumb = card.querySelector('.portfolio-thumb');
    if (!thumb) return;

    const color = getComputedStyle(thumb).getPropertyValue('--card-color').trim();

    card.addEventListener('mouseenter', () => {
      if (color) {
        thumb.style.background = `radial-gradient(circle at 50% 50%, ${hexToRgba(color, 0.2)} 0%, var(--blue-card) 70%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      thumb.style.background = '';
    });
  });

  // Helper: convert hex to rgba
  function hexToRgba(hex, alpha) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return hex;
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
})();


/* ===== TYPING EFFECT for hero title (optional, subtle) ===== */
(function initHeroEntrance() {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;

  // Trigger hero animation slightly after page load
  setTimeout(() => {
    heroContent.classList.add('is-visible');
  }, 200);

  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    setTimeout(() => {
      heroVisual.classList.add('is-visible');
    }, 450);
  }
})();


/* ===== WHATSAPP BUTTON: show tooltip on first visit ===== */
(function initWhatsappTooltip() {
  const waBtn = document.querySelector('.whatsapp-float');
  const tooltip = document.querySelector('.whatsapp-tooltip');
  if (!waBtn || !tooltip) return;

  // Show tooltip briefly after 3 seconds
  setTimeout(() => {
    tooltip.style.opacity = '1';
    setTimeout(() => {
      if (!waBtn.matches(':hover')) {
        tooltip.style.opacity = '';
      }
    }, 3000);
  }, 3000);
})();


/* ===== PARTICLE-LIKE MOUSE GLOW on hero (subtle) ===== */
(function initHeroMouseEffect() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  hero.addEventListener('mousemove', (e) => {
    const rect  = hero.getBoundingClientRect();
    const x     = ((e.clientX - rect.left) / rect.width  * 100).toFixed(2);
    const y     = ((e.clientY - rect.top)  / rect.height * 100).toFixed(2);

    hero.style.setProperty('--mouse-x', `${x}%`);
    hero.style.setProperty('--mouse-y', `${y}%`);
  });
})();


/* ===== COUNTER ANIMATION (for future use) ===== */
// Reusable counter utility — plug in when you add stats section
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);

  const update = () => {
    start += step;
    el.textContent = Math.min(Math.floor(start), target);
    if (start < target) requestAnimationFrame(update);
    else el.textContent = target;
  };

  requestAnimationFrame(update);
}


/* ===== LOG: init complete ===== */
console.log('%cNash 🚀 — Site carregado com sucesso!', 'color:#4DD9C0; font-weight:bold; font-size:14px;');
