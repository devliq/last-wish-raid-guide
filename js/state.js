/* =============================================
   LAST WISH RAID GUIDE — State & Config
   ============================================= */

// Build Configurations (loaded from builds.js)
const builds = typeof BUILDS !== 'undefined' ? BUILDS : [];
const guardianClasses = typeof GUARDIAN_CLASSES !== 'undefined' ? GUARDIAN_CLASSES : ['Titan', 'Hunter', 'Warlock'];
const elements = typeof ELEMENTS !== 'undefined' ? ELEMENTS : ['Arc', 'Solar', 'Void', 'Strand', 'Prismatic'];

// State
const state = {
  clearedEncounters: new Set(),
  checklistState: { 0: new Set(), 1: new Set(), 2: new Set(), 3: new Set(), 4: new Set() },
  completedChallenges: new Set(),
  currentEncounter: 0,
  totalCheckItems: { 0: 6, 1: 6, 2: 5, 3: 5, 4: 6 }
};
