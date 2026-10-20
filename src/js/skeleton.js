/**
 * Global Skeleton Preloader
 * Renders a full-page layout skeleton with smooth shimmer animation
 * during initial page load, and gracefully transitions to the live page.
 */

const MIN_DISPLAY_TIME_MS = 500; // Ensures smooth, perceptible transition
const FADE_OUT_DURATION_MS = 400;

function getPageType() {
  const path = window.location.pathname.toLowerCase();
  if (path.includes('projects')) return 'projects';
  if (path.includes('about')) return 'about';
  if (path.includes('skills')) return 'skills';
  if (path.includes('experience')) return 'experience';
  if (path.includes('contact')) return 'contact';
  return 'home';
}

function renderNavbarSkeleton() {
  return `
    <header class="skeleton-nav" aria-hidden="true">
      <div class="skeleton-nav__inner">
        <span class="skeleton-bone skeleton-nav__logo"></span>
        <div class="skeleton-nav__links">
          <span class="skeleton-bone skeleton-nav__pill" style="width: 48px;"></span>
          <span class="skeleton-bone skeleton-nav__pill" style="width: 52px;"></span>
          <span class="skeleton-bone skeleton-nav__pill" style="width: 46px;"></span>
          <span class="skeleton-bone skeleton-nav__pill" style="width: 64px;"></span>
          <span class="skeleton-bone skeleton-nav__pill" style="width: 74px;"></span>
          <span class="skeleton-bone skeleton-nav__pill" style="width: 60px;"></span>
        </div>
      </div>
    </header>
  `;
}

function renderHomeSkeleton() {
  return `
    <div class="skeleton-container">
      <div class="skeleton-hero">
        <div class="skeleton-hero__content">
          <span class="skeleton-bone skeleton-hero__label"></span>
          <span class="skeleton-bone skeleton-hero__title"></span>
          <span class="skeleton-bone skeleton-hero__text-1"></span>
          <span class="skeleton-bone skeleton-hero__text-2"></span>
          <div class="skeleton-hero__actions">
            <span class="skeleton-bone skeleton-hero__btn-1"></span>
            <span class="skeleton-bone skeleton-hero__btn-2"></span>
          </div>
        </div>
        <div class="skeleton-bone skeleton-hero__visual"></div>
      </div>

      <div class="skeleton-section-header">
        <span class="skeleton-bone skeleton-section-header__label"></span>
        <span class="skeleton-bone skeleton-section-header__title"></span>
        <span class="skeleton-bone skeleton-section-header__line"></span>
      </div>

      <div class="skeleton-grid-cards">
        <div class="skeleton-card">
          <span class="skeleton-bone skeleton-card__title"></span>
          <span class="skeleton-bone skeleton-card__line-1"></span>
          <span class="skeleton-bone skeleton-card__line-2"></span>
        </div>
        <div class="skeleton-card">
          <span class="skeleton-bone skeleton-card__title"></span>
          <span class="skeleton-bone skeleton-card__line-1"></span>
          <span class="skeleton-bone skeleton-card__line-2"></span>
        </div>
        <div class="skeleton-card">
          <span class="skeleton-bone skeleton-card__title"></span>
          <span class="skeleton-bone skeleton-card__line-1"></span>
          <span class="skeleton-bone skeleton-card__line-2"></span>
        </div>
      </div>
    </div>
  `;
}

function renderProjectsSkeleton() {
  return `
    <div class="skeleton-container skeleton-page-header">
      <div class="skeleton-section-header">
        <span class="skeleton-bone skeleton-section-header__label"></span>
        <span class="skeleton-bone skeleton-section-header__title"></span>
        <span class="skeleton-bone skeleton-section-header__line"></span>
      </div>

      <div class="skeleton-grid-cards" style="grid-template-columns: repeat(2, 1fr);">
        <div class="skeleton-card">
          <span class="skeleton-bone skeleton-card__img" style="aspect-ratio: 16/9; height: auto;"></span>
          <span class="skeleton-bone skeleton-card__title"></span>
          <span class="skeleton-bone skeleton-card__line-1"></span>
          <span class="skeleton-bone skeleton-card__line-2"></span>
          <div class="skeleton-card__tags">
            <span class="skeleton-bone skeleton-card__tag"></span>
            <span class="skeleton-bone skeleton-card__tag"></span>
            <span class="skeleton-bone skeleton-card__tag"></span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderInnerPageSkeleton(titleWidth = 240) {
  return `
    <div class="skeleton-container skeleton-page-header skeleton-container--narrow">
      <div class="skeleton-section-header">
        <span class="skeleton-bone skeleton-section-header__label"></span>
        <span class="skeleton-bone skeleton-section-header__title" style="width: ${titleWidth}px;"></span>
        <span class="skeleton-bone skeleton-section-header__line"></span>
      </div>

      <div style="display: flex; flex-direction: column; gap: var(--space-lg); margin-top: var(--space-2xl);">
        <span class="skeleton-bone" style="width: 100%; height: 20px;"></span>
        <span class="skeleton-bone" style="width: 90%; height: 20px;"></span>
        <span class="skeleton-bone" style="width: 80%; height: 20px;"></span>
        <span class="skeleton-bone" style="width: 95%; height: 20px;"></span>
      </div>

      <div class="skeleton-grid-cards" style="margin-top: var(--space-3xl); grid-template-columns: 1fr 1fr;">
        <div class="skeleton-card" style="height: 140px;"></div>
        <div class="skeleton-card" style="height: 140px;"></div>
      </div>
    </div>
  `;
}

export function initSkeletonPreloader() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const startTime = Date.now();
  const pageType = getPageType();

  let bodyContent = '';
  if (pageType === 'home') {
    bodyContent = renderHomeSkeleton();
  } else if (pageType === 'projects') {
    bodyContent = renderProjectsSkeleton();
  } else {
    bodyContent = renderInnerPageSkeleton();
  }

  const preloader = document.createElement('div');
  preloader.id = 'skeleton-preloader';
  preloader.className = 'skeleton-preloader';
  preloader.setAttribute('role', 'status');
  preloader.setAttribute('aria-label', 'Loading page content');
  preloader.setAttribute('aria-live', 'polite');
  preloader.innerHTML = `
    ${renderNavbarSkeleton()}
    ${bodyContent}
  `;

  function mountAndDismiss() {
    if (document.body) {
      document.body.insertAdjacentElement('afterbegin', preloader);
    }

    function dismiss() {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_DISPLAY_TIME_MS - elapsed);

      setTimeout(() => {
        preloader.classList.add('skeleton-preloader--hide');
        setTimeout(() => {
          if (preloader.parentNode) {
            preloader.parentNode.removeChild(preloader);
          }
        }, FADE_OUT_DURATION_MS);
      }, remainingTime);
    }

    if (document.readyState === 'complete') {
      dismiss();
    } else {
      window.addEventListener('load', dismiss, { once: true });
      setTimeout(dismiss, 1200);
    }
  }

  if (document.body) {
    mountAndDismiss();
  } else {
    document.addEventListener('DOMContentLoaded', mountAndDismiss);
  }
}
