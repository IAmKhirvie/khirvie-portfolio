const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = document.querySelector('[data-nav-links]');
const navItems = [...document.querySelectorAll('.nav-links a')];
const sections = navItems
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);
const revealItems = [...document.querySelectorAll('.reveal')];

const setHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 18);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

const closeNav = () => {
  navLinks?.classList.remove('is-open');
  navToggle?.setAttribute('aria-expanded', 'false');
};

const toggleNav = () => {
  if (!navLinks || !navToggle) return;
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
};

navToggle?.addEventListener('click', toggleNav);

navItems.forEach((link) => {
  link.addEventListener('click', closeNav);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeNav();
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
