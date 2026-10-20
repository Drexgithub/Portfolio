/* Main entry — imports all stylesheets and initializes shared components */

import './styles/variables.css';
import './styles/reset.css';
import './styles/base.css';
import './styles/components.css';
import './styles/utilities.css';
import './styles/animations.css';
import './styles/skeleton.css';

import { initNavbar } from './js/navbar.js';
import { initFooter } from './js/footer.js';
import { initAnimations } from './js/animations.js';
import { initPageTransitions } from './js/transitions.js';
import { initSkeletonPreloader } from './js/skeleton.js';

// Initialize shared components when DOM is ready
// Launch skeleton preloader immediately to capture initial load
initSkeletonPreloader();

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFooter();
  initPageTransitions();

  // Small delay to let DOM settle before observing reveal elements
  requestAnimationFrame(() => {
    initAnimations();
  });
});
