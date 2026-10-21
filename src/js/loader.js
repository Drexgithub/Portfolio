/**
 * Intro Page Loader Animation
 * Creates a minimalist branded preloader on initial page open,
 * animating from 0% to 100% and gracefully curtain-revealing the content.
 */

export function initPageLoader() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const main = document.querySelector('main');

  if (prefersReducedMotion) {
    if (main) main.style.opacity = '1';
    return;
  }

  // Create preloader DOM element
  const loader = document.createElement('aside');
  loader.className = 'app-loader';
  loader.id = 'app-loader';
  loader.setAttribute('role', 'status');
  loader.setAttribute('aria-label', 'Loading portfolio');
  loader.setAttribute('aria-live', 'polite');
  loader.innerHTML = `
    <div class="app-loader__content">
      <div class="app-loader__brand">
        <span class="app-loader__monogram">KH.</span>
        <span class="app-loader__sub">Kiel Hedrix &bull; Web Developer</span>
      </div>
      <div class="app-loader__meter">
        <div class="app-loader__track">
          <div class="app-loader__bar" id="loader-bar"></div>
        </div>
        <div class="app-loader__info">
          <span class="app-loader__label">Portfolio // 2026</span>
          <span class="app-loader__count" id="loader-count">00%</span>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentElement('afterbegin', loader);

  const bar = loader.querySelector('#loader-bar');
  const count = loader.querySelector('#loader-count');

  let progress = 0;
  const duration = 900; // ms total progress duration
  const interval = 18;  // update every 18ms
  const step = 100 / (duration / interval);

  const timer = setInterval(() => {
    progress = Math.min(100, progress + step + (Math.random() * 2));
    const rounded = Math.floor(progress);

    if (bar) bar.style.width = `${rounded}%`;
    if (count) count.textContent = `${String(rounded).padStart(2, '0')}%`;

    if (progress >= 100) {
      clearInterval(timer);
      setTimeout(finishLoader, 140);
    }
  }, interval);

  function finishLoader() {
    if (bar) bar.style.width = '100%';
    if (count) count.textContent = '100%';

    // Reveal main content
    if (main) {
      main.style.opacity = '1';
      main.style.transition = 'opacity 0.6s ease';
    }

    // Curtain reveal loader animation
    loader.classList.add('app-loader--fadeout');

    // Remove from DOM after transition completes
    setTimeout(() => {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }, 750);
  }

  // Fallback failsafe: ensure page is revealed even if assets take longer
  window.addEventListener('load', () => {
    if (progress < 85) progress = 85;
  });
  setTimeout(finishLoader, 2400);
}
