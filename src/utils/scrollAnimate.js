// Lightweight scroll animation initializer using IntersectionObserver
export function initScrollAnimations() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // Respect users who prefer reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
    // supported variants: slide-up, slide-left, slide-right, fade, scale
    const allowed = ['slide-up', 'slide-left', 'slide-right', 'fade', 'scale'];
    const variant = allowed.includes(anim) ? anim : 'slide-up';
    el.classList.add(`anim-${variant}`);
  });

  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Optionally unobserve to keep it simple and performant
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.15
  });

  els.forEach(el => io.observe(el));
}

// Auto-init on module load (safe): call on next animation frame
try {
  // Delay until after paint to avoid jank during initial load
  requestAnimationFrame(() => initScrollAnimations());
} catch (e) {
  // ignore in non-browser environments
}
