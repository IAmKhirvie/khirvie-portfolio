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

    function update() {
      let current = '';

      // If scrolled to bottom, highlight the last section
      const atBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50);
      if (atBottom) {
        current = sections[sections.length - 1].id;
      } else {
        sections.forEach(section => {
          if (section.getBoundingClientRect().top <= 150) {
            current = section.id;
          }
        });
      }

      navLinks.forEach(link => {
        link.removeAttribute('aria-current');
        if (link.getAttribute('href') === `#${current}`) {
          link.setAttribute('aria-current', 'page');
        }
      });
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
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

  // ===== HEX HONEYCOMB GRID =====
  const HexGrid = (() => {
    const grid = document.querySelector('.hex-grid');
    if (!grid) return;

    // Hex sizes per skill level
    const dims = {
      '5': { w: 130, h: 150 },
      '4': { w: 92,  h: 106 },
      '3': { w: 72,  h: 83 },
      '2': { w: 56,  h: 64 }
    };

    // Grid spacing — based on L4 (most common size)
    const COL = 94;
    const ROW = 82;

    // 4 rows × 6 hexes = 24 skills — rectangular honeycomb
    // Odd rows offset by COL/2 for alternating pattern:
    //   - - - - - -
    //    - - - - - -
    //   - - - - - -
    //    - - - - - -
    const rows = [
      [
        ['Vue','3','cyan','Vue.js / Vite','Reactive frontends and SPAs with Vue.js and Vite bundler.',['EPAS-E']],
        ['Git','4','cyan','Git / GitHub','Version control on every project — branching, PRs, and collaboration.',['All Projects']],
        ['PHP','4','purple','PHP / Laravel','My primary backend. Production Laravel apps with Eloquent, Livewire, and queues.',['EPAS-E','BITSI Dispatch']],
        ['JS','4','cyan','JavaScript','Core to every project — DOM manipulation, async patterns, and interactive features.',['EPAS-E','BBC Wallet','ICAN']],
        ['TS','4','purple','TypeScript','Type-safe React and Next.js apps for larger, maintainable codebases.',['ICAN Knowledge','Payroll']],
        ['React','3','cyan','React / Next.js','React 18/19 with hooks and component architecture for dynamic UIs.',['BBC Wallet','Payroll']]
      ],
      [
        ['Py','3','cyan','Python / Flask','Flask APIs, AI/ML pipelines, data processing, and automation scripts.',['YouTube Uploader','Quiz Platform','Classroom AI']],
        ['Net','4','green','Networking','CCNA-certified network config — routers, switches, VLANs, and ACLs.',['CCNA Certified']],
        ['CSS','5','purple','CSS / Tailwind','My strongest skill — every project I build gets polished with Tailwind CSS or Bootstrap.',['All Projects']],
        ['SQL','4','purple','MySQL / PostgreSQL','Database design, query optimization, and migrations across all projects.',['EPAS-E','BITSI','Payroll']],
        ['API','4','cyan','REST APIs','API design and integrations — YouTube, Notion, Semaphore SMS, and more.',['YouTube Uploader','Quiz Platform']],
        ['Sol','3','amber','Solidity','ERC-20 token smart contracts, Hardhat testing, and Ethereum deployment.',['BBC Wallet']]
      ],
      [
        ['Rust','2','amber','Rust','Exploring systems programming — memory safety and high-performance code.',['Learning']],
        ['C++','3','purple','C++ / C#','Systems programming, memory management, and Arduino embedded development.',['Academic','Arduino']],
        ['AI','3','purple','AI / ML','Computer vision with MediaPipe/OpenCV and LLM integration with Ollama.',['Classroom AI','Quiz Platform']],
        ['YOLO','3','cyan','YOLOv8','Real-time object detection — 77% accuracy in classroom behavior monitoring.',['Classroom AI']],
        ['Java','3','amber','Java','OOP design patterns, data structures, and application development.',['Academic Projects']],
        ['Docker','2','cyan','Docker','Containerized dev environments and deployment with docker-compose.',['Dev Environments']]
      ],
      [
        ['UE5','2','green','Unreal Engine 5','3D environments and game prototyping with Blueprints and C++.',['Game Prototypes']],
        ['HW','4','green','PC Assembly','Hardware builds, component diagnostics, upgrades, and hands-on repair.',['IT Support']],
        ['OS','4','green','OS Installation','Windows and Linux installation, dual-boot, imaging, and recovery.',['IT Support']],
        ['Cable','4','green','Structured Cabling','RJ45 crimping, patch panels, and network infrastructure setup.',['Network Setup']],
        ['Trbl','4','green','Troubleshooting','Systematic hardware and software troubleshooting and diagnostics.',['IT Support']],
        ['Linux','3','green','Linux / Server','Server setup, shell scripting, and deployment on Ubuntu/Debian.',['Server Deployments']]
      ]
    ];

    // Compute grid positions — absolute honeycomb (no per-row centering)
    // Even rows: x = ci * COL
    // Odd rows:  x = ci * COL + COL/2 (half-column offset)
    // Bounding box centers the whole grid
    const items = [];
    rows.forEach((row, ri) => {
      const offset = (ri % 2 === 1) ? COL / 2 : 0;
      row.forEach((cell, ci) => {
        const [label, level, color, name, desc, projects] = cell;
        const d = dims[level];
        const x = ci * COL + offset;
        const y = ri * ROW;
        items.push({ label, level, color, name, desc, projects, w: d.w, h: d.h, x, y });
      });
    });

    // Bounding box — use actual hex sizes
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    items.forEach(p => {
      minX = Math.min(minX, p.x - p.w / 2);
      maxX = Math.max(maxX, p.x + p.w / 2);
      minY = Math.min(minY, p.y - p.h / 2);
      maxY = Math.max(maxY, p.y + p.h / 2);
    });

    grid.style.width  = (maxX - minX) + 'px';
    grid.style.height = (maxY - minY) + 'px';

    // Tooltip
    const tip = document.createElement('div');
    tip.className = 'hex-tooltip';
    document.body.appendChild(tip);

    // Create hex elements — each centered at its grid point with its actual size
    items.forEach(p => {
      const el = document.createElement('div');
      el.className = 'hex';
      el.dataset.level = p.level;
      el.dataset.color = p.color;
      el.innerHTML = `<span>${p.label}</span>`;
      el.style.width  = p.w + 'px';
      el.style.height = p.h + 'px';
      el.style.left   = (p.x - minX - p.w / 2) + 'px';
      el.style.top    = (p.y - minY - p.h / 2) + 'px';
      grid.appendChild(el);

      el.addEventListener('mouseenter', () => {
        tip.innerHTML =
          `<h4>${p.name}</h4>` +
          `<p>${p.desc}</p>` +
          `<div class="tooltip-projects">${p.projects.map(t => `<span class="tooltip-tag">${t}</span>`).join('')}</div>`;
        const rect = el.getBoundingClientRect();
        let top = rect.top + window.scrollY - 160;
        let left = rect.left + window.scrollX + rect.width / 2 - 140;
        if (top < window.scrollY + 10) top = rect.bottom + window.scrollY + 12;
        left = Math.max(10, Math.min(left, window.innerWidth - 290));
        tip.style.top  = top + 'px';
        tip.style.left = left + 'px';
        tip.classList.add('visible');
      });

      el.addEventListener('mouseleave', () => {
        tip.classList.remove('visible');
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
