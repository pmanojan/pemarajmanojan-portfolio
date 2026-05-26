/* ══════════════════════════════════════════════════════════════════
   PEMARAJ MANOJAN — Portfolio JS v3.0
   ══════════════════════════════════════════════════════════════════ */
;(function () {
  'use strict';

  /* ─── Utility ─── */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const raf = requestAnimationFrame;

  /* ─── Preloader / Boot Sequence ─── */
  const preloader = $('#preloader');
  const bootLines = $$('#bootLines > p[data-line]');
  const bootFill = $('#bootFill');
  const bootPct = $('#bootPct');
  const bootWelcome = $('.boot-welcome');

  let bootIndex = 0;
  let pct = 0;

  function runBoot() {
    if (bootIndex < bootLines.length) {
      bootLines[bootIndex].style.opacity = '1';
      bootIndex++;
      pct = Math.min(Math.round((bootIndex / bootLines.length) * 90), 90);
      if (bootFill) bootFill.style.width = pct + '%';
      if (bootPct) bootPct.textContent = pct;
      setTimeout(runBoot, 250 + Math.random() * 200);
    } else {
      // finish
      if (bootFill) bootFill.style.width = '100%';
      if (bootPct) bootPct.textContent = '100';
      if (bootWelcome) bootWelcome.style.opacity = '1';
      setTimeout(() => {
        if (preloader) preloader.classList.add('hidden');
        document.body.classList.remove('loading');
        startAnimations();
      }, 600);
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(runBoot, 400);
    initAll();
  });

  /* ─── Init All ─── */
  function initAll() {
    initThemeToggle();
    initNavigation();
    initScrollProgress();
    initCustomCursor();
    initTypewriter();
    initParticles();
    initMatrixRain();
    initScrollAnimations();
    initCounters();
    initSkillBars();
    initSkillFilter();
    initProjectFilter();
    initVCard();
    initContactForm();
    initCopyToClipboard();
    initTerminalAbout();
    initBackToTop();
    initTiltCards();
    initTestimonials();
    initCommandPalette();
    initEasterEgg();
    initDynamicYear();
    initLiveTime();
    initQRCode();
    initKeyboardNav();
  }

  function startAnimations() {
    // Trigger in-view for elements already visible
    setTimeout(() => {
      $$('[data-animate]').forEach(el => {
        if (isInView(el)) el.classList.add('in-view');
      });
    }, 100);
  }

  /* ─── Theme Toggle ─── */
  function initThemeToggle() {
    const toggle = $('#themeToggle');
    const icon = $('#themeIcon');
    if (!toggle) return;

    const saved = localStorage.getItem('theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
      updateIcon(saved);
    }

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateIcon(next);
    });

    function updateIcon(theme) {
      if (!icon) return;
      icon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }
  }

  /* ─── Navigation ─── */
  function initNavigation() {
    const navbar = $('#navbar');
    const burger = $('#navBurger');
    const overlay = $('#navOverlay');
    const navLinks = $$('.nav__links a, .nav__overlay-links a');
    let lastScroll = 0;

    // Scroll hide/show
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 100) {
        navbar.classList.add('scrolled');
        navbar.classList.toggle('hidden', y > lastScroll && y > 300);
      } else {
        navbar.classList.remove('scrolled', 'hidden');
      }
      lastScroll = y;
      updateActiveNav();
    }, { passive: true });

    // Burger
    if (burger && overlay) {
      burger.addEventListener('click', () => {
        const open = burger.classList.toggle('is-active');
        overlay.classList.toggle('is-open', open);
        overlay.setAttribute('aria-hidden', !open);
        burger.setAttribute('aria-expanded', open);
        document.body.classList.toggle('nav-open', open);
      });
    }

    // Smooth scroll for all nav links (prevent page reload)
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = $(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          // Close mobile menu
          if (burger) burger.classList.remove('is-active');
          if (overlay) {
            overlay.classList.remove('is-open');
            overlay.setAttribute('aria-hidden', 'true');
          }
          if (burger) burger.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('nav-open');
        }
      });
    });

    // Also handle ALL anchor links on the page that start with #
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href && href.length > 1) {
        const target = $(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Update URL hash without scrolling
          history.pushState(null, null, href);
        }
      }
    });

    // Active section highlighting
    function updateActiveNav() {
      const sections = $$('section[id]');
      let current = '';
      sections.forEach(s => {
        const top = s.offsetTop - 120;
        if (window.scrollY >= top) current = s.id;
      });
      $$('.nav__links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('data-nav') === current);
      });
    }
  }

  /* ─── Scroll Progress ─── */
  function initScrollProgress() {
    const bar = $('.scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ─── Custom Cursor ─── */
  function initCustomCursor() {
    const dot = $('.cursor-dot');
    const ring = $('.cursor-ring');
    if (!dot || !ring || window.matchMedia('(pointer: coarse)').matches) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    (function render() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      raf(render);
    })();

    $$('a, button, .tilt, .icon-cell, .project-card, .cert-card, .contact-card, .skills__tab, .project-filter').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }

  /* ─── Typewriter ─── */
  function initTypewriter() {
    const el = $('#typewriter');
    if (!el) return;
    const roles = [
      'Network Engineer',
      'IT Administrator',
      'Cybersecurity Specialist',
      'Python Automation Developer',
      'Aspiring Penetration Tester',
      'FortiGate Operator',
      'Assistant Lecturer'
    ];
    let ri = 0, ci = 0, deleting = false;

    function tick() {
      const word = roles[ri];
      el.textContent = word.substring(0, ci);
      if (!deleting) {
        ci++;
        if (ci > word.length) { deleting = true; setTimeout(tick, 2000); return; }
      } else {
        ci--;
        if (ci < 0) { ci = 0; deleting = false; ri = (ri + 1) % roles.length; setTimeout(tick, 500); return; }
      }
      setTimeout(tick, deleting ? 40 : 80);
    }
    setTimeout(tick, 1500);
  }

  /* ─── Particle Canvas ─── */
  function initParticles() {
    const canvas = $('#particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];

    function resize() {
      w = canvas.width = canvas.parentElement.offsetWidth;
      h = canvas.height = canvas.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.5, o: Math.random() * 0.5 + 0.1
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const style = getComputedStyle(document.documentElement);
      const accent = style.getPropertyValue('--accent').trim() || '#64ffda';

      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = p.o;
        ctx.fill();
      });

      // Lines
      ctx.globalAlpha = 0.05;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      raf(draw);
    }
    draw();
  }

  /* ─── Matrix Rain Canvas ─── */
  function initMatrixRain() {
    const canvas = $('#matrixCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, cols, drops;
    const chars = '01アイウエオカキクケコ█▓▒░ABCDEF';

    function resize() {
      w = canvas.width = canvas.parentElement.offsetWidth;
      h = canvas.height = canvas.parentElement.offsetHeight;
      cols = Math.floor(w / 18);
      drops = Array(cols).fill(0).map(() => Math.random() * h / 18);
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.fillStyle = 'rgba(2, 12, 27, 0.06)';
      ctx.fillRect(0, 0, w, h);
      ctx.font = '14px "Fira Code", monospace';

      const style = getComputedStyle(document.documentElement);
      const accent = style.getPropertyValue('--accent').trim() || '#64ffda';

      for (let i = 0; i < cols; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 18;
        const y = drops[i] * 18;
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.15;
        ctx.fillText(char, x, y);
        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      ctx.globalAlpha = 1;
    }
    setInterval(draw, 80);
  }

  /* ─── Scroll Animations (Intersection Observer) ─── */
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    $$('[data-animate]').forEach(el => observer.observe(el));
  }

  function isInView(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  /* ─── Animated Counters ─── */
  function initCounters() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          if (isNaN(target)) return;
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    $$('[data-count]').forEach(el => observer.observe(el));
  }

  function animateCounter(el, target) {
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target);
      if (progress < 1) raf(update);
    }
    raf(update);
  }

  /* ─── Skill Bars ─── */
  function initSkillBars() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const pct = el.getAttribute('data-percent');
          const fill = el.querySelector('.skill__fill');
          const label = el.querySelector('.skill__pct');
          if (fill) fill.style.width = pct + '%';
          if (label) label.textContent = pct + '%';
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    $$('.skill').forEach(el => observer.observe(el));
  }

  /* ─── Skill Filter ─── */
  function initSkillFilter() {
    const tabs = $$('.skills__tab');
    const groups = $$('.skills-group');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');
        const filter = tab.getAttribute('data-filter');
        groups.forEach(g => {
          if (filter === 'all' || g.getAttribute('data-category') === filter) {
            g.classList.remove('hidden');
            g.style.display = '';
          } else {
            g.classList.add('hidden');
            g.style.display = 'none';
          }
        });
      });
    });
  }

  /* ─── Project Filter ─── */
  function initProjectFilter() {
    const filters = $$('.project-filter');
    const featured = $('.project-featured');
    const cards = $$('.project-card');

    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        filters.forEach(f => f.classList.remove('is-active'));
        btn.classList.add('is-active');
        const filter = btn.getAttribute('data-pfilter');

        // Featured project
        if (featured) {
          const tags = (featured.getAttribute('data-ptag') || '').split(',');
          if (filter === 'all' || tags.includes(filter)) {
            featured.style.display = '';
          } else {
            featured.style.display = 'none';
          }
        }

        // Cards
        cards.forEach(card => {
          const tags = (card.getAttribute('data-ptag') || '').split(',');
          if (filter === 'all' || tags.includes(filter)) {
            card.classList.remove('proj-hidden');
          } else {
            card.classList.add('proj-hidden');
          }
        });
      });
    });
  }

  /* ─── VCard ─── */
  function initVCard() {
    const card = $('#vcardEl');
    const downloadBtn = $('#vcardDownload');

    if (card) {
      card.addEventListener('click', (e) => {
        // Don't flip if clicking links inside the card
        if (e.target.closest('a')) return;
        card.classList.toggle('flipped');
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.classList.toggle('flipped');
        }
      });
    }

    if (downloadBtn) {
      downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const vcf = `BEGIN:VCARD
VERSION:3.0
FN:Pemaraj Manojan
TITLE:IT Administrator | Network Engineer
ORG:BCAS Campus - Jaffna
TEL;TYPE=CELL:+94762883931
EMAIL:manojmanojan1392@gmail.com
URL:https://pemarajmanojan.dev
ADR;TYPE=WORK:;;Colombo District;Western Province;;Sri Lanka
NOTE:CCNA | CyberOps Associate | FortiGate 7.4 Operator | Network Defense | ISO 27001
END:VCARD`;
        const blob = new Blob([vcf], { type: 'text/vcard' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'Pemaraj_Manojan.vcf';
        a.click();
        URL.revokeObjectURL(a.href);
        showToast('Contact file downloaded! 📇');
      });
    }
  }

  /* ─── Contact Form ─── */
  function initContactForm() {
    const form = $('#contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Honeypot check
      const hp = form.querySelector('input[name="website"]');
      if (hp && hp.value) return;

      const name = $('#cName');
      const email = $('#cEmail');
      const subject = $('#cSubject');
      const message = $('#cMessage');
      const status = $('#formStatus');
      const submit = $('#cSubmit');
      let valid = true;

      // Validate
      clearErrors();
      if (!name.value.trim()) { showError('cName', 'Name is required'); valid = false; }
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { showError('cEmail', 'Valid email is required'); valid = false; }
      if (!subject.value) { showError('cSubject', 'Please select a subject'); valid = false; }
      if (!message.value.trim() || message.value.trim().length < 10) { showError('cMessage', 'Message must be at least 10 characters'); valid = false; }

      if (!valid) return;

      submit.classList.add('is-loading');

      // Simulate send
      setTimeout(() => {
        submit.classList.remove('is-loading');
        status.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        status.className = 'form-status success';
        form.reset();
        setTimeout(() => { status.textContent = ''; status.className = 'form-status'; }, 5000);
      }, 2000);
    });

    function showError(id, msg) {
      const field = $(`[data-for="${id}"]`);
      if (field) { field.textContent = msg; field.closest('.field')?.classList.add('error'); }
    }
    function clearErrors() {
      $$('.field__err').forEach(e => { e.textContent = ''; });
      $$('.field').forEach(f => f.classList.remove('error'));
    }
  }

  /* ─── Copy to Clipboard ─── */
  function initCopyToClipboard() {
    $$('.js-copy').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const text = el.getAttribute('data-copy');
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => showToast('Copied: ' + text));
      });
    });
  }

  /* ─── Toast ─── */
  function showToast(msg) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  /* ─── About Terminal ─── */
  function initTerminalAbout() {
    const live = $('.terminal--about .terminal__live');
    if (!live) return;

    const commands = [
      { cmd: '$ whoami', out: 'pemaraj_manojan' },
      { cmd: '$ cat role.txt', out: 'IT Administrator | Network Engineer' },
      { cmd: '$ cat location.txt', out: '📍 Colombo District, Sri Lanka' },
      { cmd: '$ cat skills.json', out: '{\n  "networking": ["CCNA", "OSPF", "EIGRP", "VPN"],\n  "security": ["FortiGate", "CyberOps", "IDS/IPS"],\n  "coding": ["Python", "Java", "PowerShell"],\n  "systems": ["Win Server", "Linux", "AD"]\n}' },
      { cmd: '$ cat education.txt', out: 'BSc (Hons) Network Technology & Cybersecurity\nLincoln University College — 2024-2026' },
      { cmd: '$ cat goal.txt', out: '🎯 Evolving into a Penetration Testing Specialist' },
      { cmd: '$ uptime', out: '3+ years in IT & Network Engineering' },
      { cmd: '$ echo $STATUS', out: '🟢 AVAILABLE FOR OPPORTUNITIES' }
    ];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeTerminal(commands, 0);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(live.closest('.terminal'));

    function typeTerminal(cmds, idx) {
      if (idx >= cmds.length) return;
      const { cmd, out } = cmds[idx];
      const cmdEl = document.createElement('div');
      cmdEl.className = 'cmd';
      live.appendChild(cmdEl);

      let i = 0;
      function typeChar() {
        if (i < cmd.length) {
          cmdEl.textContent += cmd[i++];
          setTimeout(typeChar, 30 + Math.random() * 30);
        } else {
          const outEl = document.createElement('div');
          outEl.className = 'out';
          outEl.textContent = out;
          live.appendChild(outEl);
          live.parentElement.scrollTop = live.parentElement.scrollHeight;
          setTimeout(() => typeTerminal(cmds, idx + 1), 400);
        }
      }
      setTimeout(typeChar, 300);
    }
  }

  /* ─── Back to Top ─── */
  function initBackToTop() {
    const btn = $('#backToTop');
    const circle = $('#bttCircle');
    if (!btn) return;

    const circumference = 2 * Math.PI * 20; // r=20
    if (circle) {
      circle.style.strokeDasharray = circumference;
      circle.style.strokeDashoffset = circumference;
    }

    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? window.scrollY / h : 0;
      btn.classList.toggle('visible', window.scrollY > 400);
      if (circle) {
        circle.style.strokeDashoffset = circumference - (pct * circumference);
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── Tilt Cards ─── */
  function initTiltCards() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    $$('.tilt').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -5;
        const rotateY = ((x - cx) / cx) * 5;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ─── Testimonials Carousel ─── */
  function initTestimonials() {
    const track = $('#testimonialTrack');
    const prev = $('#testPrev');
    const next = $('#testNext');
    const dotsContainer = $('#testDots');
    if (!track) return;

    const cards = $$('.testimonial-card', track);
    let current = 0;
    const total = cards.length;

    // Create dots
    if (dotsContainer) {
      cards.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot-indicator' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      });
    }

    function goTo(idx) {
      current = ((idx % total) + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      if (dotsContainer) {
        $$('.dot-indicator', dotsContainer).forEach((d, i) => d.classList.toggle('active', i === current));
      }
    }

    if (prev) prev.addEventListener('click', () => goTo(current - 1));
    if (next) next.addEventListener('click', () => goTo(current + 1));

    // Auto-rotate
    let autoplay = setInterval(() => goTo(current + 1), 5000);
    track.closest('.testimonials__carousel')?.addEventListener('mouseenter', () => clearInterval(autoplay));
    track.closest('.testimonials__carousel')?.addEventListener('mouseleave', () => { autoplay = setInterval(() => goTo(current + 1), 5000); });
  }

  /* ─── Command Palette (Ctrl+K) ─── */
  function initCommandPalette() {
    const palette = $('#cmdPalette');
    const input = $('#cmdInput');
    const results = $('#cmdResults');
    if (!palette) return;

    const commands = [
      { label: 'Go to Home', icon: 'fa-house', action: () => scrollToSection('#home') },
      { label: 'Go to About', icon: 'fa-user', action: () => scrollToSection('#about') },
      { label: 'Go to Experience', icon: 'fa-briefcase', action: () => scrollToSection('#experience') },
      { label: 'Go to Skills', icon: 'fa-code', action: () => scrollToSection('#skills') },
      { label: 'Go to Certifications', icon: 'fa-certificate', action: () => scrollToSection('#certifications') },
      { label: 'Go to Education', icon: 'fa-graduation-cap', action: () => scrollToSection('#education') },
      { label: 'Go to Projects', icon: 'fa-diagram-project', action: () => scrollToSection('#projects') },
      { label: 'Go to Contact', icon: 'fa-envelope', action: () => scrollToSection('#contact') },
      { label: 'Toggle Dark/Light Mode', icon: 'fa-moon', action: () => $('#themeToggle')?.click() },
      { label: 'Download CV', icon: 'fa-download', action: () => showToast('CV download coming soon!') },
      { label: 'Copy Email', icon: 'fa-copy', action: () => { navigator.clipboard.writeText('manojmanojan1392@gmail.com'); showToast('Email copied!'); } },
      { label: 'Open LinkedIn', icon: 'fa-linkedin-in', action: () => window.open('https://www.linkedin.com/in/pemarajmanojan', '_blank') },
      { label: 'Open GitHub', icon: 'fa-github', action: () => window.open('https://github.com/pemarajmanojan', '_blank') },
    ];

    function scrollToSection(selector) {
      const el = $(selector);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function openPalette() {
      palette.classList.add('is-open');
      palette.setAttribute('aria-hidden', 'false');
      input.value = '';
      renderResults('');
      setTimeout(() => input.focus(), 100);
    }

    function closePalette() {
      palette.classList.remove('is-open');
      palette.setAttribute('aria-hidden', 'true');
    }

    function renderResults(query) {
      const filtered = commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));
      results.innerHTML = filtered.map((c, i) =>
        `<li data-idx="${i}" class="${i === 0 ? 'active' : ''}"><i class="fa-solid ${c.icon}"></i> ${c.label}</li>`
      ).join('');

      $$('li', results).forEach(li => {
        li.addEventListener('click', () => {
          const idx = parseInt(li.dataset.idx);
          if (filtered[idx]) { filtered[idx].action(); closePalette(); }
        });
      });
    }

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        palette.classList.contains('is-open') ? closePalette() : openPalette();
      }
      if (e.key === 'Escape' && palette.classList.contains('is-open')) closePalette();
    });

    palette.querySelector('.cmd-palette__overlay')?.addEventListener('click', closePalette);
    if (input) input.addEventListener('input', () => renderResults(input.value));
  }

  /* ─── Easter Egg ─── */
  function initEasterEgg() {
    const banner = $('#hackBanner');
    if (!banner) return;
    const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let idx = 0;

    document.addEventListener('keydown', (e) => {
      if (e.key === code[idx]) {
        idx++;
        if (idx === code.length) {
          banner.classList.add('show');
          document.body.style.filter = 'hue-rotate(90deg)';
          setTimeout(() => {
            banner.classList.remove('show');
            document.body.style.filter = '';
          }, 3000);
          idx = 0;
        }
      } else {
        idx = 0;
      }
    });
  }

  /* ─── Dynamic Year ─── */
  function initDynamicYear() {
    const el = $('#year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ─── Live Time ─── */
  function initLiveTime() {
    const el = $('#liveTime');
    if (!el) return;
    function update() {
      const now = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit', second: '2-digit' });
      el.textContent = now;
    }
    update();
    setInterval(update, 1000);
  }

  /* ─── QR Code (simple decorative grid) ─── */
  function initQRCode() {
    const qr = $('#vcardQR');
    if (!qr) return;
    // Simple decorative QR-like pattern
    const pattern = [
      1,1,1,0,1,1,1,
      1,0,1,1,1,0,1,
      1,1,1,0,1,1,1,
      0,0,0,1,0,0,0,
      1,1,1,0,1,1,1,
      1,0,1,0,1,0,1,
      1,1,1,0,1,1,1
    ];
    pattern.forEach(v => {
      const cell = document.createElement('div');
      cell.style.cssText = `background:${v ? 'var(--accent)' : 'transparent'}; border-radius:1px;`;
      qr.appendChild(cell);
    });
  }

  /* ─── Keyboard Navigation ─── */
  function initKeyboardNav() {
    // Navigate sections with arrow keys when not in an input
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

      // 1-9 keys for quick section navigation
      const num = parseInt(e.key);
      if (num >= 1 && num <= 9) {
        const sections = ['#home', '#about', '#experience', '#skills', '#certifications', '#education', '#card', '#projects', '#contact'];
        if (sections[num - 1]) {
          const el = $(sections[num - 1]);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

})();
