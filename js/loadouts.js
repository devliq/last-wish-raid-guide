/* =============================================
   LAST WISH RAID GUIDE — Loadout Tabs
   ============================================= */

function switchLoadoutTab(tab, btn) {
  document.querySelectorAll('.loadout-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.loadout-panel').forEach(p => p.classList.remove('active'));

  btn.classList.add('active');
  const panel = document.getElementById('loadout-' + tab);
  if (panel) panel.classList.add('active');
}
