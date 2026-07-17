const header = document.querySelector('[data-header]');
const themeColor = document.querySelector('meta[name="theme-color"]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = document.querySelector('[data-nav-links]');
const navItems = [...document.querySelectorAll('.nav-links a')];
const themeOptions = [...document.querySelectorAll('[data-theme-option]')];
const themeGlitch = document.querySelector('[data-theme-glitch]');
const glitchLabel = document.querySelector('[data-glitch-label]');
const sections = navItems
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);
const revealItems = [...document.querySelectorAll('.reveal')];
const themeColors = {
  neubrutalist: '#090807',
  graffiti: '#060506'
};
let themeGlitchTimer;

const setTheme = (theme, { animate = false } = {}) => {
  const nextTheme = theme === 'graffiti' ? 'graffiti' : 'neubrutalist';
  const currentTheme = document.documentElement.dataset.theme === 'graffiti' ? 'graffiti' : 'neubrutalist';

  if (animate && nextTheme !== currentTheme && themeGlitch) {
    window.clearTimeout(themeGlitchTimer);
    glitchLabel.textContent = `${currentTheme === 'graffiti' ? 'PUNK' : 'NEO'} -> ${nextTheme === 'graffiti' ? 'PUNK' : 'NEO'}`;
    glitchLabel.dataset.text = glitchLabel.textContent;
    themeGlitch.classList.remove('is-active');
    void themeGlitch.offsetWidth;
    themeGlitch.classList.add('is-active');
    themeGlitchTimer = window.setTimeout(() => {
      themeGlitch.classList.remove('is-active');
    }, 720);
  }

  document.documentElement.dataset.theme = nextTheme;
  themeColor?.setAttribute('content', themeColors[nextTheme]);

  themeOptions.forEach((option) => {
    option.setAttribute('aria-pressed', String(option.dataset.themeOption === nextTheme));
  });

  try {
    localStorage.setItem('portfolio-theme', nextTheme);
  } catch {
  }
};

setTheme(document.documentElement.dataset.theme);

themeOptions.forEach((option) => {
  option.addEventListener('click', () => {
    setTheme(option.dataset.themeOption, { animate: true });
  });
});

const setHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 18);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

const closeNav = ({ restoreFocus = false } = {}) => {
  const focusWasInNav = navLinks?.contains(document.activeElement);
  navLinks?.classList.remove('is-open');
  navToggle?.setAttribute('aria-expanded', 'false');

  if (restoreFocus || focusWasInNav) {
    navToggle?.focus({ preventScroll: true });
  }
};

const toggleNav = () => {
  if (!navLinks || !navToggle) return;
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));

  if (isOpen) {
    navItems[0]?.focus({ preventScroll: true });
  } else {
    navToggle.focus({ preventScroll: true });
  }
};

navToggle?.addEventListener('click', toggleNav);

navItems.forEach((link) => {
  link.addEventListener('click', () => closeNav({ restoreFocus: true }));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navLinks?.classList.contains('is-open')) {
    event.preventDefault();
    closeNav({ restoreFocus: true });
  }
});

const desktopQuery = window.matchMedia('(min-width: 981px)');
const syncNavForViewport = (query) => {
  if (query.matches) closeNav();
};

if (desktopQuery.addEventListener) {
  desktopQuery.addEventListener('change', syncNavForViewport);
} else {
  desktopQuery.addListener(syncNavForViewport);
}
syncNavForViewport(desktopQuery);

const supportsIntersectionObserver = typeof window.IntersectionObserver === 'function';

if (supportsIntersectionObserver) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navItems.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));

  const updateActiveLink = () => {
    const activeSection = sections.reduce((current, section) => {
      const sectionTop = section.getBoundingClientRect().top;
      return sectionTop <= 140 ? section : current;
    }, sections[0]);

    navItems.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${activeSection?.id}`);
    });
  };

  updateActiveLink();
  window.addEventListener('scroll', updateActiveLink, { passive: true });
}

const contactForm = document.querySelector('[data-contact-form]');
const formNote = document.querySelector('[data-form-note]');
const mailtoLink = document.querySelector('[data-mailto-link]');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const message = String(formData.get('message') || '').trim();
  const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'visitor'}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

  if (mailtoLink) {
    mailtoLink.href = `mailto:khirviecliffordbautista@gmail.com?subject=${subject}&body=${body}`;
    mailtoLink.classList.remove('is-hidden');
  }

  if (formNote) {
    formNote.textContent = 'Email draft prepared. Open the draft link or copy the message before leaving the page.';
  }
});

const yearTarget = document.querySelector('[data-year]');
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}
