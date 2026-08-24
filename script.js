const nav = document.querySelector("[data-nav]");
const menu = document.querySelector("[data-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const scrollContent = document.querySelector("[data-scroll-content]");
const cursor = document.querySelector("#pixel-cursor");
const trailLayer = document.querySelector("#trail-layer");
const revealItems = document.querySelectorAll(".reveal");
const magneticItems = document.querySelectorAll(".magnetic");
const marqueeTrack = document.querySelector("[data-marquee-track]");
const marqueeSet = document.querySelector("[data-marquee-set]");

let lastTrailTime = 0;
let lastScrollY = window.scrollY;
let currentSkew = 0;

const updateNav = () => {
  if (!nav) return;
  nav.classList.toggle("is-scrolled", window.scrollY > 24);
};

const closeMenu = () => {
  if (!menu || !menuToggle) return;
  menu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
};

const toggleMenu = () => {
  if (!menu || !menuToggle) return;
  const nextState = menuToggle.getAttribute("aria-expanded") !== "true";
  menu.classList.toggle("is-open", nextState);
  menuToggle.setAttribute("aria-expanded", String(nextState));
  document.body.classList.toggle("menu-open", nextState);
};

const createTrailPixel = (x, y) => {
  if (!trailLayer) return;

  const pixel = document.createElement("span");
  const palette = ["var(--green)", "var(--cyan)", "var(--pink)", "var(--yellow)"];

  pixel.className = "pixel-trail";
  pixel.style.left = `${x}px`;
  pixel.style.top = `${y}px`;
  pixel.style.background = palette[Math.floor(Math.random() * palette.length)];
  pixel.style.width = `${10 + Math.floor(Math.random() * 10)}px`;
  pixel.style.height = pixel.style.width;
  trailLayer.appendChild(pixel);

  pixel.addEventListener("animationend", () => pixel.remove(), { once: true });
};

const moveCursor = (event) => {
  if (!cursor) return;

  const x = Math.round(event.clientX / 4) * 4;
  const y = Math.round(event.clientY / 4) * 4;
  cursor.style.transform = `translate(${x - 9}px, ${y - 9}px)`;

  const now = performance.now();
  if (now - lastTrailTime > 26) {
    createTrailPixel(x, y);
    lastTrailTime = now;
  }
};

const setCursorActive = (isActive) => {
  if (!cursor) return;
  cursor.classList.toggle("cursor-active", isActive);
};

const updateScrollSkew = () => {
  if (!scrollContent) return;

  const scrollDelta = window.scrollY - lastScrollY;
  const targetSkew = Math.max(-6, Math.min(6, scrollDelta * 0.08));
  currentSkew += (targetSkew - currentSkew) * 0.22;

  scrollContent.style.transform = `skewY(${currentSkew}deg)`;
  lastScrollY = window.scrollY;

  if (Math.abs(currentSkew) > 0.01) {
    requestAnimationFrame(updateScrollSkew);
  } else {
    scrollContent.style.transform = "";
  }
};

const handleScroll = () => {
  updateNav();
  requestAnimationFrame(updateScrollSkew);
};

const setupMarquee = () => {
  if (!marqueeTrack || !marqueeSet) return;

  const sourceMarkup = marqueeSet.dataset.sourceMarkup || marqueeSet.innerHTML;
  marqueeSet.dataset.sourceMarkup = sourceMarkup;
  marqueeTrack.innerHTML = "";

  const sourceSet = document.createElement("div");
  sourceSet.className = "ticker-set";
  sourceSet.innerHTML = sourceMarkup;
  marqueeTrack.appendChild(sourceSet);

  const minSetWidth = window.innerWidth + 260;
  while (sourceSet.scrollWidth < minSetWidth) {
    sourceSet.insertAdjacentHTML("beforeend", sourceMarkup);
  }

  const cloneSet = sourceSet.cloneNode(true);
  cloneSet.setAttribute("aria-hidden", "true");
  marqueeTrack.appendChild(cloneSet);

  marqueeTrack.style.setProperty("--ticker-shift", `${sourceSet.scrollWidth}px`);
  marqueeTrack.style.setProperty("--ticker-duration", `${Math.max(18, sourceSet.scrollWidth / 90)}s`);
};

updateNav();
setupMarquee();
window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("mousemove", moveCursor, { passive: true });
window.addEventListener("resize", setupMarquee);

if (menuToggle) {
  menuToggle.addEventListener("click", toggleMenu);
}

if (menu) {
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

document.querySelectorAll("a, button, .quest-card").forEach((item) => {
  item.addEventListener("mouseenter", () => setCursorActive(true));
  item.addEventListener("mouseleave", () => setCursorActive(false));
});

magneticItems.forEach((item) => {
  item.addEventListener("mousemove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    item.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "";
  });
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
