// ============================================================
//  POSM Website — main.js
//  Handles: nav scroll, hamburger, tabs, scroll animations,
//           hero canvas particles, smooth interactions
// ============================================================

(function () {
  'use strict';

  // ─── Utility ───────────────────────────────────────────────
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // ─── Navbar scroll effect ───────────────────────────────────
  const navbar = $('#navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on load
  }

  // ─── Hamburger / Mobile menu ────────────────────────────────
  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        hamburger.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ─── Research Tabs ──────────────────────────────────────────
  const tabBtns = $$('.tab-btn');
  const tabPanels = $$('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const panel = $(`#panel-${target}`);
      if (panel) panel.classList.add('active');
    });

    // Keyboard navigation for tabs
    btn.addEventListener('keydown', (e) => {
      const idx = tabBtns.indexOf(btn);
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        tabBtns[(idx + 1) % tabBtns.length].focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        tabBtns[(idx - 1 + tabBtns.length) % tabBtns.length].focus();
      }
    });
  });

  // ─── Scroll-reveal (IntersectionObserver) ───────────────────
  const revealEls = $$('.reveal, .reveal-stagger');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // ─── Hero Canvas — subtle floating particles ─────────────────
  const canvas = $('#hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], animId;

    const COLORS = [
      'rgba(168, 85, 247,', // purple
      'rgba(196, 132, 252,', // light purple
      'rgba(34, 211, 238,',  // cyan
      'rgba(224, 64, 251,',  // magenta
    ];

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.alpha = Math.random() * 0.5 + 0.1;
        this.alphaDir = (Math.random() - 0.5) * 0.003;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha += this.alphaDir;
        if (this.alpha < 0.05 || this.alpha > 0.6) this.alphaDir *= -1;
        if (this.x < -10 || this.x > W + 10 || this.y < -10 || this.y > H + 10) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${this.alpha})`;
        ctx.fill();
      }
    }

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function init() {
      particles = [];
      const count = Math.min(Math.floor((W * H) / 8000), 120);
      for (let i = 0; i < count; i++) particles.push(new Particle());
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(loop);
    }

    function start() {
      resize();
      init();
      if (animId) cancelAnimationFrame(animId);
      loop();
    }

    window.addEventListener('resize', () => {
      resize();
      init();
    }, { passive: true });

    // Only animate when visible
    const heroEl = $('#hero');
    if (heroEl && 'IntersectionObserver' in window) {
      const heroObs = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            start();
          } else {
            if (animId) cancelAnimationFrame(animId);
          }
        },
        { threshold: 0 }
      );
      heroObs.observe(heroEl);
    } else {
      start();
    }
  }

  // ─── Smooth anchor scroll ───────────────────────────────────
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.getElementById(a.getAttribute('href').slice(1));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── Mark active nav link ───────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  $$('.nav-link[href]').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

})();
