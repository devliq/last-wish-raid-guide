/* =============================================
   LAST WISH RAID GUIDE — Navigation & Scroll
   ============================================= */

(function () {
  // Active Nav Link
  function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
      let current = '';
      sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) current = section.id;
      });
      navLinks.forEach(link => {
        const href = link.getAttribute('href')?.replace('#', '');
        if (href === current) link.classList.add('active');
        else link.classList.remove('active');
      });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
  }

  // Smooth Scroll for Nav (excluding encounter dropdowns)
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      // Skip if this is an encounter dropdown link with data-scroll
      if (link.hasAttribute('data-scroll')) return;
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const yOffset = -80;
          const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    });
  }

  function init() {
    initActiveNavLink();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('componentsLoaded', init);
  } else {
    init();
  }
})();
