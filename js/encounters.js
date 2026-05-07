/* =============================================
   LAST WISH RAID GUIDE — Encounter Tabs & Checklists
   ============================================= */

// Encounter Tabs
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
}

// Checklist toggle
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

// Reset checklist
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

// Encounter Clear
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
  updateModalProgress();
}

// Update tab badge
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

// Update progress bar
function updateProgressBar() {
  const count = state.clearedEncounters.size;
  const pct = Math.round((count / 5) * 100);

  // Header count
  const headerCount = document.getElementById('header-progress-count');
  if (headerCount) {
    headerCount.textContent = count;
  }

  // All done?
  if (count === 5) {
    headerCount?.parentElement?.setAttribute('title', 'Raid completed!');
  }

  const progressPct = document.getElementById('progress-pct');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const progressBarTrack = document.querySelector('.progress-bar-track');
  
  if (progressPct) {
    progressPct.textContent = pct + '%';
    if (count === 5) {
      progressPct.style.color = 'var(--color-success)';
      progressPct.textContent = '100% — Raid Clear!';
    } else {
      progressPct.style.color = '';
    }
  }
  
  if (progressBarFill) {
    progressBarFill.style.width = pct + '%';
  }
  
  if (progressBarTrack) {
    progressBarTrack.setAttribute('aria-valuenow', pct);
  }

  // Update Run Progress panel
  const runPct = document.getElementById('run-pct');
  const runBar = document.getElementById('run-bar');
  const runCleared = document.getElementById('run-cleared');
  if (runPct && runBar && runCleared) {
    runPct.textContent = pct + '%';
    runBar.style.width = pct + '%';
    runCleared.textContent = count + '/5';
  }
}
