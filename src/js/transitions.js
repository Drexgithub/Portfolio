/**
 * Page Transitions
 * Smooth fade + slide transition between pages.
 * Intercepts internal link clicks, plays an exit animation,
 * then navigates. On page load, plays an entrance animation.
 */

const TRANSITION_DURATION = 400; // ms — matches CSS

/**
 * Creates the transition overlay element
 */
function createOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'page-transition-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);
  return overlay;
}

/**
 * Checks if a link is an internal navigation link
 */
function isInternalLink(anchor) {
  if (!anchor || !anchor.href) return false;
  if (anchor.target === '_blank') return false;
  if (anchor.hasAttribute('download')) return false;

  const url = new URL(anchor.href, window.location.origin);

  // Must be same origin
  if (url.origin !== window.location.origin) return false;

  // Skip hash-only links on the same page
  if (url.pathname === window.location.pathname && url.hash) return false;

  // Skip if already on this page
  if (url.pathname === window.location.pathname) return false;

  return true;
}

/**
 * Play the exit transition, then navigate
 */
function navigateWithTransition(href) {
  const overlay = document.querySelector('.page-transition-overlay');
  const main = document.querySelector('main');

  // Exit animation: fade out content + slide overlay in
  if (main) {
    main.classList.add('page-exit');
  }
  if (overlay) {
    overlay.classList.add('active');
  }

  // Navigate after animation completes
  setTimeout(() => {
    window.location.href = href;
  }, TRANSITION_DURATION);
}

/**
 * Play the entrance transition on page load
 */
function playEntranceAnimation() {
  const overlay = document.querySelector('.page-transition-overlay');
  const main = document.querySelector('main');

  // Start with entrance state
  if (main) {
    main.classList.add('page-enter');

    // Trigger reflow, then remove entrance class to animate in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        main.classList.remove('page-enter');
        main.classList.add('page-enter-active');
      });
    });
  }

  // Fade overlay out
  if (overlay) {
    requestAnimationFrame(() => {
      overlay.classList.add('exit');
      // Clean up after animation
      setTimeout(() => {
        overlay.classList.remove('active', 'exit');
      }, TRANSITION_DURATION);
    });
  }
}

/**
 * Initialize page transitions
 */
export function initPageTransitions() {
  const main = document.querySelector('main');

  // Respect reduced motion — still reveal content since main starts hidden
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (main) main.style.opacity = '1';
    return;
  }

  createOverlay();

  // Intercept all internal link clicks
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (anchor && isInternalLink(anchor)) {
      e.preventDefault();
      navigateWithTransition(anchor.href);
    }
  });

  // Play entrance animation on load
  playEntranceAnimation();
}
