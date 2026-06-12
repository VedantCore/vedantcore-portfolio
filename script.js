/* ═══════════════════════════════════════════════
   Vedant Sarva — Brutalist Portfolio script.js
═══════════════════════════════════════════════ */

/* ─── 1. PAGE LOAD FADE IN ─────────────────── */
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });
  
  
  /* ─── 2. LIVE CLOCK (IST) ──────────────────── */
  function updateClock() {
    const el = document.getElementById('liveClock');
    if (!el) return;
    const now = new Date();
    const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const hh  = String(ist.getHours()).padStart(2, '0');
    const mm  = String(ist.getMinutes()).padStart(2, '0');
    const ss  = String(ist.getSeconds()).padStart(2, '0');
    el.textContent = `${hh}:${mm}:${ss} IST`;
  }
  updateClock();
  setInterval(updateClock, 1000);
  
  
  /* ─── 3. SCROLL REVEAL + SKILL BARS ─────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('is-visible');
  
      /* Animate skill fill bars when the about section reveals */
      if (el.classList.contains('about')) {
        el.querySelectorAll('.skill-fill').forEach((bar, i) => {
          setTimeout(() => bar.classList.add('is-animated'), i * 80);
        });
      }
  
      revealObserver.unobserve(el);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  
  
  /* ─── 4. ACTIVE NAV LINK ────────────────────── */
  const navLinks   = document.querySelectorAll('.nav-link');
  const sections   = document.querySelectorAll('section[id]');
  const navHeight  = 56;
  
  function setActiveLink() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - navHeight - 80) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('is-active',
        link.getAttribute('data-section') === current
      );
    });
  }
  
  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();
  
  
  /* ─── 5. SMOOTH SCROLL ──────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
      /* Close mobile drawer if open */
      closeMobileDrawer();
    });
  });
  
  
  /* ─── 6. MOBILE NAV DRAWER ──────────────────── */
  const mobileBtn = document.querySelector('.nav-mobile-btn');
  const drawer    = document.getElementById('navDrawer');
  
  function closeMobileDrawer() {
    drawer.classList.remove('is-open');
    mobileBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    mobileBtn.textContent = 'MENU';
  }
  
  mobileBtn?.addEventListener('click', () => {
    const open = drawer.classList.toggle('is-open');
    mobileBtn.setAttribute('aria-expanded', String(open));
    drawer.setAttribute('aria-hidden', String(!open));
    mobileBtn.textContent = open ? 'CLOSE' : 'MENU';
  });
  
  /* Close drawer on outside click */
  document.addEventListener('click', e => {
    if (!e.target.closest('.site-nav')) closeMobileDrawer();
  });
  
  
  /* ─── 7. TYPEWRITER — hero name ─────────────── */
  function typeWriter(el, text, speed = 90) {
    el.textContent = '';
    let i = 0;
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.cssText = 'animation:blink 1s step-end infinite;opacity:1;';
    el.appendChild(cursor);
  
    const styleTag = document.getElementById('tw-cursor-style') || (() => {
      const s = document.createElement('style');
      s.id = 'tw-cursor-style';
      s.textContent = '@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}';
      document.head.appendChild(s);
      return s;
    })();
  
    function type() {
      if (i < text.length) {
        cursor.insertAdjacentText('beforebegin', text[i++]);
        setTimeout(type, speed);
      } else {
        /* Remove cursor after typing finishes */
        setTimeout(() => cursor.remove(), 800);
      }
    }
    setTimeout(type, 300);
  }
  
  const heroName = document.getElementById('heroName');
  if (heroName) {
    const original = heroName.textContent.trim();
    typeWriter(heroName, original, 90);
  }
  
  
  /* ─── 8. PROJECT CARD — keyboard accessible hover ── */
  document.querySelectorAll('.project-card').forEach(card => {
    /* Make cards focusable so keyboard users get the hover effect too */
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const firstLink = card.querySelector('.project-link');
        if (firstLink) firstLink.click();
      }
    });
  });