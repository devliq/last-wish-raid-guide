/* =============================================
   LAST WISH RAID GUIDE — Interactive JS
   ============================================= */

// ─── Build Configurations (loaded from builds.js) ───
const builds = typeof BUILDS !== 'undefined' ? BUILDS : [];
const guardianClasses = typeof GUARDIAN_CLASSES !== 'undefined' ? GUARDIAN_CLASSES : ['Titan', 'Hunter', 'Warlock'];
const elements = typeof ELEMENTS !== 'undefined' ? ELEMENTS : ['Arc', 'Solar', 'Void', 'Strand', 'Prismatic'];

// ─── State ────────────────────────────────────
const state = {
  clearedEncounters: new Set(),
  checklistState: { 0: new Set(), 1: new Set(), 2: new Set(), 3: new Set(), 4: new Set() },
  completedChallenges: new Set(),
  currentEncounter: 0,
  totalCheckItems: { 0: 6, 1: 6, 2: 5, 3: 5, 4: 6 }
};

// ─── Theme Toggle ────────────────────────────
(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = root.getAttribute('data-theme') || 'dark';
  root.setAttribute('data-theme', theme);
  updateToggleIcon(toggle, theme);

  toggle && toggle.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    updateToggleIcon(toggle, theme);
  });

  function updateToggleIcon(el, t) {
    if (!el) return;
    el.setAttribute('aria-label', 'Switch to ' + (t === 'dark' ? 'light' : 'dark') + ' mode');
    el.innerHTML = t === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
})();

// ─── Encounter Tabs ──────────────────────────
function switchEncounterTab(index) {
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

  // Activate selected
  const panel = document.getElementById('enc-' + index);
  const tab = document.querySelector(`.encounter-tab[data-enc="${index}"]`);

  if (panel) { panel.classList.add('active'); panel.removeAttribute('aria-hidden'); }
  if (tab) { tab.classList.add('active'); tab.setAttribute('aria-selected', 'true'); }

  state.currentEncounter = index;

  // Smooth scroll to encounters on mobile
  if (window.innerWidth < 640) {
    document.getElementById('encounters')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ─── Checklists ──────────────────────────────
function toggleCheck(item, encIndex) {
  const isChecked = item.classList.contains('checked');
  const checkBox = item.querySelector('.check-box');
  const checkIcon = item.querySelector('.check-icon');

  // Get item index within checklist
  const checklist = item.parentElement;
  const items = Array.from(checklist.querySelectorAll('.checklist-item'));
  const itemIndex = items.indexOf(item);

  if (isChecked) {
    item.classList.remove('checked');
    item.setAttribute('aria-checked', 'false');
    if (checkIcon) checkIcon.style.display = 'none';
    state.checklistState[encIndex].delete(itemIndex);
  } else {
    item.classList.add('checked');
    item.setAttribute('aria-checked', 'true');
    if (checkIcon) checkIcon.style.display = 'block';
    state.checklistState[encIndex].add(itemIndex);
  }

  // Check if all items done → auto-suggest clearing
  const total = state.totalCheckItems[encIndex] || 0;
  const done = state.checklistState[encIndex].size;
  if (done === total) {
    const btn = document.getElementById('clear-btn-' + encIndex);
    if (btn && !state.clearedEncounters.has(encIndex)) {
      btn.style.background = 'var(--color-success-highlight)';
      btn.style.borderColor = 'var(--color-success)';
      btn.style.color = 'var(--color-success)';
      btn.textContent = '✓ All Checked — Mark Cleared?';
    }
  }
}

function resetChecklist(encIndex) {
  const checklist = document.getElementById('checklist-' + encIndex);
  if (!checklist) return;

  checklist.querySelectorAll('.checklist-item').forEach(item => {
    item.classList.remove('checked');
    item.setAttribute('aria-checked', 'false');
    const icon = item.querySelector('.check-icon');
    if (icon) icon.style.display = 'none';
  });

  state.checklistState[encIndex] = new Set();

  // Reset clear button styling
  const btn = document.getElementById('clear-btn-' + encIndex);
  if (btn && !state.clearedEncounters.has(encIndex)) {
    btn.removeAttribute('style');
    btn.textContent = 'Mark Encounter Cleared';
  }
}

// ─── Encounter Clear ─────────────────────────
function markEncounterCleared(encIndex) {
  const btn = document.getElementById('clear-btn-' + encIndex);

  if (state.clearedEncounters.has(encIndex)) {
    // Unmark
    state.clearedEncounters.delete(encIndex);
    if (btn) {
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
      btn.textContent = 'Mark Encounter Cleared';
    }
  } else {
    // Mark cleared
    state.clearedEncounters.add(encIndex);
    if (btn) {
      btn.style.background = 'var(--color-success-highlight)';
      btn.style.borderColor = 'var(--color-success)';
      btn.style.color = 'var(--color-success)';
      btn.textContent = '✓ Cleared!';
    }
  }

  updateTabBadge(encIndex);
  updateProgressBar();
}

function updateTabBadge(encIndex) {
  const badge = document.getElementById('tab-badge-' + encIndex);
  const dot = document.querySelector(`.enc-progress-dot[data-enc="${encIndex}"]`);

  if (state.clearedEncounters.has(encIndex)) {
    badge?.classList.add('visible');
    dot?.classList.add('cleared');
  } else {
    badge?.classList.remove('visible');
    dot?.classList.remove('cleared');
  }
}

function updateProgressBar() {
  const count = state.clearedEncounters.size;
  const pct = Math.round((count / 5) * 100);

  document.getElementById('progress-pct').textContent = pct + '%';
  document.getElementById('progress-bar-fill').style.width = pct + '%';

  const barTrack = document.querySelector('.progress-bar-track');
  if (barTrack) {
    barTrack.setAttribute('aria-valuenow', pct);
  }

  // Header count
  document.getElementById('header-progress-count').textContent = count;

  // All done?
  if (count === 5) {
    const pctEl = document.getElementById('progress-pct');
    pctEl.style.color = 'var(--color-success)';
    pctEl.textContent = '100% — Raid Clear!';
  } else {
    const pctEl = document.getElementById('progress-pct');
    pctEl.style.color = '';
  }
}

// ─── Challenges ──────────────────────────────
function toggleChallenge(card) {
  const isCompleted = card.classList.contains('completed');

  if (isCompleted) {
    card.classList.remove('completed');
    card.setAttribute('aria-checked', 'false');
  } else {
    card.classList.add('completed');
    card.setAttribute('aria-checked', 'true');

    // Animate the icon
    const icon = card.querySelector('.challenge-icon');
    if (icon) {
      icon.textContent = '✅';
      icon.style.fontSize = '20px';
    }
  }

  if (isCompleted) {
    const icon = card.querySelector('.challenge-icon');
    // Restore original icon from data or fallback
    const titles = ['⚔️', '🏃', '🦷', '🔒', '👁️'];
    const challengeIndex = Array.from(document.querySelectorAll('.challenge-card')).indexOf(card);
    if (icon && challengeIndex >= 0) {
      icon.textContent = titles[challengeIndex] || '⭐';
    }
  }
}

// Keyboard support for challenge cards
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.challenge-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleChallenge(card);
      }
    });
  });

  document.querySelectorAll('.checklist-item').forEach(item => {
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
});

// ─── Weapon Filter ───────────────────────────
function filterWeapons(element, btn) {
  // Update chip states
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');

  // Show/hide weapon cards
  document.querySelectorAll('.weapon-card').forEach(card => {
    if (element === 'all' || card.dataset.element === element) {
      card.removeAttribute('data-hidden');
      card.style.display = '';
    } else {
      card.setAttribute('data-hidden', 'true');
      card.style.display = 'none';
    }
  });
}

// ─── Loadout Tabs ────────────────────────────
function switchLoadoutTab(tab, btn) {
  document.querySelectorAll('.loadout-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.loadout-panel').forEach(p => p.classList.remove('active'));

  btn.classList.add('active');
  const panel = document.getElementById('loadout-' + tab);
  if (panel) panel.classList.add('active');
}

// ─── Active Nav Link ─────────────────────────
(function () {
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
})();

// ─── Smooth Scroll for Nav ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── Stagger animation on cards ──────────────
(function () {
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
})(); 
