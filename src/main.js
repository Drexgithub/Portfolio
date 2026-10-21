/* Main entry: imports all stylesheets and initializes shared components */

import './styles/variables.css';
import './styles/reset.css';
import './styles/base.css';
import './styles/components.css';
import './styles/utilities.css';
import './styles/animations.css';
import './styles/loader.css';

import { initNavbar } from './js/navbar.js';
import { initFooter } from './js/footer.js';
import { initAnimations } from './js/animations.js';
import { initPageTransitions } from './js/transitions.js';
import { initPageLoader } from './js/loader.js';
import { initContactForm } from './js/contact.js';

// Launch intro page loader animation immediately on initial open
initPageLoader();

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFooter();
  initPageTransitions();
  initContactForm();

  // Small delay to let DOM settle before observing reveal elements
  requestAnimationFrame(() => {
    initAnimations();
  });
});
