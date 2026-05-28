/* =============================================
   ORTOPEDISTA CUAUTITLÁN - MAIN JS
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  // ---- NAVBAR SCROLL EFFECT ----
  const navbar = document.getElementById('navbar');
  const scrollThreshold = 50;

  function handleNavbarScroll() {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu on nav link click
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // ---- ACTIVE NAV LINK ON SCROLL ----
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-link');

  function setActiveNav() {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinksAll.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();

  // ---- SCROLL REVEAL ANIMATION ----
  const revealElements = document.querySelectorAll(
    '.service-card, .product-category, .contact-card, .value-item, .cert-item, .products-badge-float, .about-experience-badge'
  );

  revealElements.forEach(function (el) {
    el.classList.add('reveal');
  });

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, index) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, index * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ---- COUNTER ANIMATION ----
  function animateCounter(el, target, suffix) {
    const duration = 2000;
    const start = performance.now();
    const isFloat = target % 1 !== 0;

    function update(time) {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = isFloat
        ? (eased * target).toFixed(1)
        : Math.round(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach(function (el) {
          const text = el.textContent.trim();
          // Extract number and suffix
          const match = text.match(/^([\d,]+)(\+?)\s*(.*)$/);
          if (match) {
            const num = parseInt(match[1].replace(/,/g, ''), 10);
            const suffix = match[2] + (match[3] ? ' ' + match[3] : '');
            animateCounter(el, num, suffix);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  // ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- HERO SCROLL INDICATOR HIDE ----
  const scrollIndicator = document.getElementById('scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', function () {
      scrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '1';
    }, { passive: true });
  }

  // ---- WHATSAPP FLOAT TOOLTIP ----
  const waFloat = document.getElementById('whatsapp-float');
  if (waFloat) {
    // Show tooltip after 3s
    setTimeout(function () {
      const tooltip = waFloat.querySelector('.whatsapp-tooltip');
      if (tooltip) {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateX(0)';
        setTimeout(function () {
          tooltip.style.opacity = '';
          tooltip.style.transform = '';
        }, 2500);
      }
    }, 3000);
  }

  // ---- SERVICE CARDS STAGGER ----
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(function (card, i) {
    card.style.transitionDelay = (i * 0.05) + 's';
  });

  console.log('🦴 Ortopedista Cuautitlán - Sitio web iniciado correctamente');
});
