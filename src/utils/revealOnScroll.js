// Utility to reveal elements on scroll by adding an 'in-view' class when they enter the viewport.
// Accepts: Element | selector string | NodeList | Array of Elements
export function revealOnScroll(targets, options = {}) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return () => {};

  const { threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true } = options;

  let elements = [];
  if (!targets) return () => {};
  if (typeof targets === 'string') {
    elements = Array.from(document.querySelectorAll(targets));
  } else if (NodeList.prototype.isPrototypeOf(targets) || Array.isArray(targets)) {
    elements = Array.from(targets);
  } else if (targets instanceof Element) {
    elements = [targets];
  }

  if (!elements.length) return () => {};

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Immediately reveal if user prefers reduced motion
    elements.forEach(el => el.classList.add('in-view'));
    return () => {};
  }

  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        if (once) observer.unobserve(entry.target);
      }
    });
  }, { threshold, rootMargin });

  elements.forEach(el => io.observe(el));

  return () => io.disconnect();
}

// Merge-in: auto-init helper (keeps backwards-compatible behavior from previous scrollAnimate.js)
export function initScrollAnimations() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // Respect users who prefer reduced motion
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const selector = [
    'h1', 'h2', 'h3', 'p',
    '.section__header-primary',
    '.section__header-secondary',
    '.hero__title-container h2',
    '.card-title',
    '.container__center'
  ].join(',');

  const els = Array.from(document.querySelectorAll(selector));
  if (!els.length) return;

  // Add initial class and optional variant classes from data-anim
  els.forEach(el => {
    el.classList.add('animate-on-scroll');
    const anim = el.dataset && el.dataset.anim ? el.dataset.anim.trim().toLowerCase() : null;
    const allowed = ['slide-up', 'slide-left', 'slide-right', 'fade', 'scale'];
    const variant = allowed.includes(anim) ? anim : 'slide-up';
    el.classList.add(`anim-${variant}`);
  });

  // Use the generic reveal utility to observe and add 'in-view'
  revealOnScroll(els, { threshold: 0.15, rootMargin: '0px 0px -10% 0px', once: true });
}

// Auto-init on module load (safe): call on next animation frame
try {
  requestAnimationFrame(() => initScrollAnimations());
} catch (e) {
  // ignore in non-browser environments
}
