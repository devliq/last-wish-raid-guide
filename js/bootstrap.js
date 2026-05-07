/* =============================================
   LAST WISH RAID GUIDE — Bootstrap
   Loads HTML components with skeleton loading and parallel processing
   ============================================= */

// Component loader with skeleton support
async function loadComponent(url, placeholderId, skeletonHtml = '') {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load ${url}`);
    const html = await response.text();
    const placeholder = document.getElementById(placeholderId);
    if (placeholder) {
      placeholder.innerHTML = html;
    }
    return true;
  } catch (error) {
    console.error('Error loading component:', error);
    const placeholder = document.getElementById(placeholderId);
    if (placeholder) {
      placeholder.innerHTML = `
        <div class="component-error">
          <p>Failed to load component. Please refresh the page.</p>
          <button onclick="location.reload()">Retry</button>
        </div>`;
    }
    return false;
  }
}

// Create skeleton loading element
function createSkeleton(placeholderId) {
  const placeholder = document.getElementById(placeholderId);
  if (placeholder) {
    placeholder.innerHTML = `
      <div class="skeleton-loader">
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
      </div>`;
  }
}

// Load all components with parallel processing where possible
async function loadAllComponents() {
  // Show skeletons for all placeholders
  const placeholders = [
    'header-placeholder',
    'encounters-tabs-placeholder', 
    'encounter-panels-placeholder',
    'loot-placeholder',
    'loadouts-placeholder',
    'challenges-placeholder',
    'advanced-placeholder',
    'wish-wall-placeholder',
    'footer-placeholder'
  ];
  
  placeholders.forEach(id => createSkeleton(id));

  try {
    // Load header and tabs first (sequential as they're needed early)
    await loadComponent('./components/header.html', 'header-placeholder');
    await loadComponent('./components/encounters-tabs.html', 'encounters-tabs-placeholder');

    // Load encounter panels in parallel
    const panelsContainer = document.getElementById('encounter-panels-placeholder');
    if (panelsContainer) {
      const panels = [
        './components/encounter-kalli.html',
        './components/encounter-shurochi.html',
        './components/encounter-morgeth.html',
        './components/encounter-vault.html',
        './components/encounter-riven.html'
      ];
      
      // Fetch all panels in parallel
      const panelPromises = panels.map(url => 
        fetch(url).then(response => {
          if (!response.ok) throw new Error(`Failed to load ${url}`);
          return response.text();
        })
      );
      
      const panelHtmlArray = await Promise.all(panelPromises);
      panelsContainer.innerHTML = panelHtmlArray.join('');
    }

    // Load remaining sections in parallel
    const sectionPromises = [
      loadComponent('./components/section-loot.html', 'loot-placeholder'),
      loadComponent('./components/section-loadouts.html', 'loadouts-placeholder'),
      loadComponent('./components/section-challenges.html', 'challenges-placeholder'),
      loadComponent('./components/section-advanced.html', 'advanced-placeholder'),
      loadComponent('./components/section-wish-wall.html', 'wish-wall-placeholder'),
      loadComponent('./components/footer.html', 'footer-placeholder')
    ];
    
    await Promise.all(sectionPromises);

    // Dispatch event to notify modules that components are loaded
    document.dispatchEvent(new CustomEvent('componentsLoaded'));
    
  } catch (error) {
    console.error('Error loading components:', error);
    // Show generic error message
    document.body.insertAdjacentHTML('beforeend', `
      <div class="global-error">
        <p>Failed to load some components. Please refresh the page.</p>
        <button onclick="location.reload()">Reload Page</button>
      </div>`);
  }
}

// Start loading when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadAllComponents);
} else {
  loadAllComponents();
}