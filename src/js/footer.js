/**
 * Shared Footer Component
 * Renders the footer dynamically on every page.
 */

export function initFooter() {
  const year = new Date().getFullYear();

  const footerHTML = `
    <footer class="footer" role="contentinfo">
      <div class="footer__inner">
        <p class="footer__text">&copy; ${year} Kiel Hedrix. All rights reserved.</p>
        <div class="footer__social">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="GitHub">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="LinkedIn">
            LinkedIn
          </a>
          <a href="mailto:reloskielhedrix@gmail.com" class="footer__social-link" aria-label="Email">
            Email
          </a>
        </div>
      </div>
    </footer>
  `;

  document.body.insertAdjacentHTML('beforeend', footerHTML);
}
