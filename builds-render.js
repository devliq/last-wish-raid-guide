/* =============================================
   LAST WISH RAID GUIDE — Build Rendering
   ============================================= */

function getClassBadgeClass(guardianClass) {
  var classMap = {
    "Titan": "class--titan",
    "Hunter": "class--hunter",
    "Warlock": "class--warlock",
    "All": "class--all"
  };
  return classMap[guardianClass] || "class--all";
}

function getElementBadgeClass(element) {
  return "element--" + element.toLowerCase();
}

function renderBuildCard(build) {
  var classBadgeClass = getClassBadgeClass(build.class);
  var elementBadgeClass = getElementBadgeClass(build.element);
  
  // Safely create mod tags to prevent XSS
  var modTags = build.mods.map(function(mod) { 
    var span = document.createElement('span');
    span.className = 'mod-tag';
    span.textContent = mod;
    return span.outerHTML;
  }).join("");
  
   return "<div class=\"loadout-card\" data-class=\"" + build.class.toLowerCase() + "\" data-element=\"" + build.element.toLowerCase() + "\" data-role=\"" + build.role.toLowerCase() + "\">" +
     "<div class=\"loadout-header\">" +
       "<div class=\"loadout-title\">" + build.name + "</div>" +
       "<div class=\"loadout-class\">" +
         "<span class=\"class-badge " + classBadgeClass + "\">" + build.class + "</span>" +
         "<span class=\"element-badge " + elementBadgeClass + "\">" + build.element + "</span>" +
         "<span class=\"role-badge\">" + build.role + "</span>" +
       "</div>" +
     "</div>" +
     "<div class=\"loadout-body\">" +
       "<div class=\"loadout-slots\">" +
         "<div class=\"loadout-slot\">" +
           "<div class=\"slot-icon\">🔫</div>" +
           "<div class=\"slot-info\">" +
             "<div class=\"slot-type\">Kinetic</div>" +
             "<div class=\"slot-weapon\">" + build.weapons.kinetic.name + "</div>" +
             "<div class=\"slot-reason\">" + build.weapons.kinetic.reason + "</div>" +
           "</div>" +
         "</div>" +
         "<div class=\"loadout-slot\">" +
           "<div class=\"slot-icon\">⚡</div>" +
           "<div class=\"slot-info\">" +
             "<div class=\"slot-type\">Energy</div>" +
             "<div class=\"slot-weapon\">" + build.weapons.energy.name + "</div>" +
             "<div class=\"slot-reason\">" + build.weapons.energy.reason + "</div>" +
           "</div>" +
         "</div>" +
         "<div class=\"loadout-slot\">" +
           "<div class=\"slot-icon\">💣</div>" +
           "<div class=\"slot-info\">" +
             "<div class=\"slot-type\">Heavy</div>" +
             "<div class=\"slot-weapon\">" + build.weapons.heavy.name + "</div>" +
             "<div class=\"slot-reason\">" + build.weapons.heavy.reason + "</div>" +
           "</div>" +
         "</div>" +
       "</div>" +
       "<div class=\"loadout-mods\">" +
         "<div class=\"mods-label\">Recommended Mods</div>" +
         "<div class=\"mod-tags\">" + modTags + "</div>" +
       "</div>" +
       "<div class=\"loadout-notes\">" +
         "<div class=\"notes-label\">Notes</div>" +
         "<div class=\"notes-text\">" + build.notes + "</div>" +
       "</div>" +
     "</div>" +
   "</div>";
}

function renderBuilds() {
   var dpsContainer = document.getElementById("loadout-dps");
   var supportContainer = document.getElementById("loadout-support");
   var runnerContainer = document.getElementById("loadout-runner");
   
   if (!dpsContainer && !supportContainer && !runnerContainer) return;
   
   var dpsBuilds = builds.filter(function(b) { return b.role === "DPS"; });
   var supportBuilds = builds.filter(function(b) { return b.role === "Support"; });
   var runnerBuilds = builds.filter(function(b) { return b.role === "Runner"; });
   
   var dpsGrid = dpsContainer ? dpsContainer.querySelector(".loadout-grid") : null;
   var supportGrid = supportContainer ? supportContainer.querySelector(".loadout-grid") : null;
   var runnerGrid = runnerContainer ? runnerContainer.querySelector(".loadout-grid") : null;
   
   if (dpsGrid) {
     dpsBuilds.forEach(function(build) {
       dpsGrid.insertAdjacentHTML("beforeend", renderBuildCard(build));
     });
   }
   
   if (supportGrid) {
     supportBuilds.forEach(function(build) {
       supportGrid.insertAdjacentHTML("beforeend", renderBuildCard(build));
     });
   }
   
   if (runnerGrid) {
     runnerBuilds.forEach(function(build) {
       runnerGrid.insertAdjacentHTML("beforeend", renderBuildCard(build));
     });
   }
 }

// Initialize builds on DOM ready and after components are loaded
function initBuilds() {
  if (typeof builds !== 'undefined' && builds.length > 0) {
    renderBuilds();
  }
}

document.addEventListener("DOMContentLoaded", initBuilds);
document.addEventListener("componentsLoaded", initBuilds);

// Filter builds by class and element
function filterBuilds(classFilter, elementFilter) {
  var allCards = document.querySelectorAll(".loadout-card[data-class]");

  allCards.forEach(function(card) {
    var cardClass = card.dataset.class;
    var cardElement = card.dataset.element;

    var matchesClass = classFilter === "all" || cardClass === classFilter.toLowerCase();
    var matchesElement = elementFilter === "all" || cardElement === elementFilter.toLowerCase();

    if (matchesClass && matchesElement) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

// Make filterBuilds available globally
window.filterBuilds = filterBuilds;
