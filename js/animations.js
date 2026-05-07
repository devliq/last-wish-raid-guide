/* =============================================
   LAST WISH RAID GUIDE — Animations
   ============================================= */

(function () {
  // Only run after components are loaded
  function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 50);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.weapon-card, .challenge-card, .loadout-card, .wish-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(10px)';
      card.style.transition = 'opacity 250ms ease, transform 250ms ease';
      observer.observe(card);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('componentsLoaded', initAnimations);
  } else {
    // If components already loaded (e.g., scripts loaded after components)
    initAnimations();
  }
})();
