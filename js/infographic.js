/* =============================================
   LAST WISH RAID GUIDE — Infographic Tabs
   ============================================= */

(function () {
  function initInfographicTabs() {
    document.querySelectorAll('.infographic-toggle').forEach(button => {
      button.addEventListener('click', function() {
        const tabId = this.dataset.tab;
        const parent = this.closest('.encounter-header-visual');
        
        // Toggle active state on buttons
        parent.querySelectorAll('.infographic-toggle').forEach(btn => {
          btn.classList.remove('active');
        });
        this.classList.add('active');
        
        // Hide all visual content and flow diagrams in this section
        parent.querySelectorAll('.encounter-visual-content, .encounter-flow-diagram').forEach(content => {
          content.classList.remove('active');
        });
        
        // Show the selected content (either visual or flow diagram)
        const targetContent = parent.querySelector('#' + tabId);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('componentsLoaded', initInfographicTabs);
  } else {
    initInfographicTabs();
  }
})();
