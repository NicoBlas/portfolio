/**
 * Portfolio - Main JS
 * Minimalist vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  highlightActiveNav();
  initHomeCTA();
  initShowMore();
  initDevExpand();
});

/**
 * Highlights the active navigation link
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav__links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.endsWith(href.replace('./', '')) ||
        (currentPath.endsWith('/') && href.includes('index.html'))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Initialize Home CTA buttons (recruiter / agency / dev)
 */
function initHomeCTA() {
  const ctaContainer = document.querySelector('.hero__cta-buttons');
  if (!ctaContainer) return;

  ctaContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-redirect]');
    if (!btn) return;

    const target = btn.dataset.redirect;

    switch (target) {
      case 'freelance':
        window.location.href = './pages/projects.html';
        break;
      case 'recruiter':
        window.location.href = './pages/experience.html';
        break;
      case 'developer':
        window.location.href = './pages/experience.html?dev=1';
        break;
      case 'projects':
        window.location.href = './pages/projects.html';
        break;
      default:
        break;
    }
  });
}

/**
 * Auto-expand Cybele details if user arrived as a developer
 */
function initDevExpand() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('dev') === '1') {
    const cybeleBtn = document.querySelector('[data-toggle-details="cybele-details"]');
    if (cybeleBtn && !document.getElementById('cybele-details').classList.contains('is-open')) {
      cybeleBtn.click();
    }
  }
}

/**
 * Initialize Show More toggle on experience timeline
 */
function initShowMore() {
  const buttons = document.querySelectorAll('[data-toggle-details]');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.toggleDetails;
      const details = document.getElementById(targetId);
      if (!details) return;

      const isOpen = details.classList.contains('is-open');

      if (isOpen) {
        details.classList.remove('is-open');
        btn.innerHTML = 'Show more <span aria-hidden="true">+</span>';
      } else {
        details.classList.add('is-open');
        btn.innerHTML = 'Show less <span aria-hidden="true">-</span>';
      }
    });
  });
}
