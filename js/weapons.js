/* =============================================
   LAST WISH RAID GUIDE — Weapon Filter
   ============================================= */

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
