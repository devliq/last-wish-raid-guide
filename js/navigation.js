/* =============================================
   LAST WISH RAID GUIDE — Progress Modal
   ============================================= */

(function() {
  // Handle progress modal trigger
  function initProgressModal() {
    const progressTrigger = document.getElementById('progress-modal-trigger');
    const progressModal = document.getElementById('progress-modal');
    const progressModalClose = document.getElementById('progress-modal-close');
    
    if (progressTrigger && progressModal) {
      progressTrigger.addEventListener('click', () => {
        progressModal.classList.add('active');
        updateModalProgress();
      });
    }
    
    if (progressModalClose && progressModal) {
      progressModalClose.addEventListener('click', () => {
        progressModal.classList.remove('active');
      });
    }
    
    // Close modal on overlay click or ESC key
    if (progressModal) {
      progressModal.addEventListener('click', (e) => {
        if (e.target === progressModal) {
          progressModal.classList.remove('active');
        }
      });
    }
    
    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && progressModal && progressModal.classList.contains('active')) {
        progressModal.classList.remove('active');
        closeMobileMenu();
      }
    });
  }

  // Update modal progress
  function updateModalProgress() {
    const modalPct = document.getElementById('modal-progress-pct');
    const modalBar = document.getElementById('modal-progress-bar');
    const modalDots = document.querySelectorAll('#modal-encounters .enc-progress-dot');
      
    if (modalPct && modalBar) {
      const count = state.clearedEncounters.size;
      const pct = Math.round((count / 5) * 100);
      modalPct.textContent = pct + '%';
      modalBar.style.width = pct + '%';
    }
      
    // Update encounter dots
    modalDots.forEach(dot => {
      const encIdx = parseInt(dot.dataset.enc);
      if (state.clearedEncounters.has(encIdx)) {
        dot.classList.add('completed');
      } else {
        dot.classList.remove('completed');
      }
    });
  }

  // Handle Encounter dropdown nav links (with scroll to encounters section)
  function initNavLinks() {
    document.querySelectorAll('[data-scroll]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const encIndex = parseInt(link.dataset.scroll.replace('enc-', ''));
        if (!isNaN(encIndex)) {
          switchEncounterTab(encIndex);
          // Close mobile menu if open
          closeMobileMenu();
        }
      });
    });
  }

  // Mobile menu handling
  function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    
    function openMobileMenu() {
      if (mobileMenu && mobileMenuToggle) {
        mobileMenu.classList.add('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    }
    
    function closeMobileMenu() {
      if (mobileMenu && mobileMenuToggle) {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }
    
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });
    }
    
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    
    // Close mobile menu on link click
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // Make switchEncounterTab available globally and add scroll behavior
  window.switchEncounterTab = function(index) {
    // Hide all panels
    document.querySelectorAll('.encounter-panel').forEach(p => {
      p.classList.remove('active');
      p.setAttribute('aria-hidden', 'true');
    });
    // Deactivate all tabs
    document.querySelectorAll('.encounter-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    
    const tab = document.querySelector(`.encounter-tab[data-enc="${index}"]`);
    const panel = document.getElementById(`enc-${index}`);
    
    if (tab) { tab.classList.add('active'); tab.setAttribute('aria-selected', 'true'); }
    if (panel) { panel.classList.add('active'); panel.setAttribute('aria-hidden', 'false'); }
    
    state.currentEncounter = index;
  };

  // Initialize when components are loaded
  if (document.readyState === 'loading') {
    document.addEventListener('componentsLoaded', () => {
      initProgressModal();
      initNavLinks();
      initMobileMenu();
      updateModalProgress();
    });
  } else {
    initProgressModal();
    initNavLinks();
    initMobileMenu();
    updateModalProgress();
  }
})();
