/**
 * Shared Navbar Component
 * Renders the navigation bar dynamically on every page.
 */

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about.html', label: 'About' },
  { href: '/skills.html', label: 'Skills' },
  { href: '/projects.html', label: 'Projects' },
  { href: '/experience.html', label: 'Experience' },
  { href: '/contact.html', label: 'Contact' },
];

function getActivePath() {
  const path = window.location.pathname;
  if (path === '/' || path === '/index.html') return '/';
  return path;
}

export function initNavbar() {
  const activePath = getActivePath();

  const navHTML = `
    <nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
      <div class="navbar__inner">
        <a href="/" class="navbar__logo" aria-label="Home">KH.</a>
        <ul class="navbar__links" id="nav-links">
          ${NAV_LINKS.map(link => `
            <li>
              <a href="${link.href}" 
                 class="navbar__link ${activePath === link.href ? 'active' : ''}"
                 ${activePath === link.href ? 'aria-current="page"' : ''}>
                ${link.label}
              </a>
            </li>
          `).join('')}
        </ul>
        <button class="navbar__toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  `;

  document.body.insertAdjacentHTML('afterbegin', navHTML);

  // Mobile menu toggle
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking a link
  links.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll-based navbar background
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });
}
