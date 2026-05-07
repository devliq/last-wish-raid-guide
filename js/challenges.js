/* =============================================
   LAST WISH RAID GUIDE — Challenges
   ============================================= */

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
document.addEventListener('componentsLoaded', function() {
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
