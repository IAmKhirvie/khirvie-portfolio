/* ===================================================
   KHIRVIE PORTFOLIO — script.js
   Vanilla JS — No dependencies
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== PARTICLE CANVAS =====
  const ParticleSystem = (() => {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    let animId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticles() {
      const count = Math.min(80, Math.floor(window.innerWidth / 15));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 58, 237, ${p.opacity})`;
        ctx.fill();
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Mouse interaction
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(animate);
    }

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    document.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
  })();

  // ===== TYPED TEXT EFFECT =====
  const TypeWriter = (() => {
    const el = document.getElementById('typed-text');
    if (!el) return;
    const words = ['work', 'scale', 'matter', 'ship'];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function tick() {
      const current = words[wordIdx];

      if (isDeleting) {
        el.textContent = current.substring(0, charIdx - 1);
        charIdx--;
      } else {
        el.textContent = current.substring(0, charIdx + 1);
        charIdx++;
      }

      let delay = isDeleting ? 50 : 100;

      if (!isDeleting && charIdx === current.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        delay = 300;
      }

      setTimeout(tick, delay);
    }

    tick();
  })();

  // ===== SCROLL REVEAL =====
  const RevealOnScroll = (() => {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, parseInt(delay));
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
  })();

  // ===== ACTIVE NAV HIGHLIGHTING =====
  const NavHighlight = (() => {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.removeAttribute('aria-current');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.setAttribute('aria-current', 'page');
            }
          });
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(s => observer.observe(s));
  })();

  // ===== NAVBAR SCROLL STATE =====
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });
  }

  // ===== THEME TOGGLE =====
  const ThemeToggle = (() => {
    const btn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    if (!btn) return;

    const saved = localStorage.getItem('theme');
    if (saved) {
      html.dataset.theme = saved;
    }

    btn.addEventListener('click', () => {
      const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
      html.dataset.theme = next;
      localStorage.setItem('theme', next);
    });
  })();

  // ===== CURSOR GLOW =====
  const CursorGlow = (() => {
    const glow = document.getElementById('cursor-glow');
    if (!glow || window.innerWidth < 1024) return;

    document.addEventListener('mousemove', (e) => {
      glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    });
  })();

  // ===== STATS COUNTER =====
  const CountUp = (() => {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          let current = 0;
          const step = Math.ceil(target / 40);
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            el.textContent = current;
          }, 30);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  })();

  // ===== MOBILE NAV =====
  const MobileNav = (() => {
    const hamburger = document.getElementById('hamburger');
    const drawer = document.getElementById('mobile-nav');
    if (!hamburger || !drawer) return;

    function toggle() {
      const isOpen = drawer.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
      drawer.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggle);

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (drawer.classList.contains('open')) toggle();
      });
    });
  })();

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
