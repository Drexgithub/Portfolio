/**
 * Shared Navbar Component
 * Renders the navigation bar dynamically on every page with in-page smooth scrolling
 * and scroll-spy active state tracking.
 */

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

function isHomePage() {
  const path = window.location.pathname;
  return path === '/' || path === '/index.html' || path === '';
}

export function initNavbar() {
  const onHome = isHomePage();

  const navHTML = `
    <nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
      <div class="navbar__inner">
        <a href="${onHome ? '#hero' : '/#hero'}" class="navbar__logo" aria-label="Home">KH.</a>
        <ul class="navbar__links" id="nav-links">
          ${NAV_LINKS.map((link, idx) => {
            const targetHref = onHome ? link.href : `/${link.href}`;
            const isInitialActive = idx === 0;
            return `
              <li>
                <a href="${targetHref}" 
                   class="navbar__link ${isInitialActive ? 'active' : ''}"
                   ${isInitialActive ? 'aria-current="page"' : ''}>
                  ${link.label}
                </a>
              </li>
            `;
          }).join('')}
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

  // Handle link clicks (close menu and smooth scroll if on same page)
  links.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', (e) => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');

      const href = link.getAttribute('href');
      if (onHome && href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          history.pushState(null, '', href);
        }
      }
    });
  });

  // Logo click smooth scroll
  const logo = document.querySelector('.navbar__logo');
  if (logo && onHome) {
    logo.addEventListener('click', (e) => {
      const hero = document.getElementById('hero');
      if (hero) {
        e.preventDefault();
        hero.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, '', '#hero');
      }
    });
  }

  // Scroll-based navbar background and scroll-spy
  const navbar = document.getElementById('navbar');
  const sectionIds = NAV_LINKS.map(l => l.href.replace('#', '')).filter(Boolean);
  const navLinkEls = links.querySelectorAll('.navbar__link');

  function onScroll() {
    const currentScroll = window.scrollY;

    // Navbar background blur/border on scroll
    if (currentScroll > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy (only on home/single page)
    if (!onHome) return;

    const scrollPos = currentScroll + 140;
    let activeId = sectionIds[0];

    for (let i = 0; i < sectionIds.length; i++) {
      const section = document.getElementById(sectionIds[i]);
      if (section) {
        if (scrollPos >= section.offsetTop) {
          activeId = sectionIds[i];
        }
      }
    }

    // Near page bottom, select the last section
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 60) {
      activeId = sectionIds[sectionIds.length - 1];
    }

    navLinkEls.forEach(navLink => {
      const href = navLink.getAttribute('href');
      const targetHash = '#' + activeId;
      if (href === targetHash || href.endsWith(targetHash)) {
        navLink.classList.add('active');
        navLink.setAttribute('aria-current', 'page');
      } else {
        navLink.classList.remove('active');
        navLink.removeAttribute('aria-current');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
