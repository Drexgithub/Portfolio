/**
 * Scroll Reveal Animations
 * Uses Intersection Observer to trigger fade-in animations on scroll.
 */

export function initAnimations() {
  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Make everything visible immediately
    document.querySelectorAll('.reveal, .reveal--fade, .reveal--left').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  // Observe all elements with reveal classes
  document.querySelectorAll('.reveal, .reveal--fade, .reveal--left').forEach(el => {
    observer.observe(el);
  });
}
