/* =============================================
   LAST WISH RAID GUIDE — Build Configurations
   15 builds: 3 classes × 5 elements
   ============================================= */

// Guardian Classes
const GUARDIAN_CLASSES = ['Titan', 'Hunter', 'Warlock'];

// Subclass Elements
const ELEMENTS = ['Arc', 'Solar', 'Void', 'Strand', 'Prismatic'];

// All 15 Build Configurations
const BUILDS = [
  // ==================== TITAN BUILDS ====================
  {
    buildId: 'titan-arc',
    class: 'Titan',
    element: 'Arc',
    role: 'DPS',
    name: 'Thundercrash Demolisher',
    weapons: {
      kinetic: {
        name: 'Code Duello',
        reason: 'Explosive payload for add clear, pairs well with Thundercrash'
      },
      energy: {
        name: 'Hollow Denial',
        reason: 'Arc rockets for boss DPS and stunning champions'
      },
      heavy: {
        name: 'Gjallarhorn',
        reason: 'Wolfpack rounds for massive boss damage'
      }
    },
    mods: [
      'Arc Siphon',
      'Heavy Ammo Finder',
      'Lucent Blade',
      'Overload Grenades',
      'Unstoppable Hand Cannon'
    ],
    notes: 'Use Thundercrash for initial damage burst. Keep Jolt uptime with your hammer.'
  },
  {
    buildId: 'titan-solar',
    class: 'Titan',
    element: 'Solar',
    role: 'DPS',
    name: 'Pyre Bomber',
    weapons: {
      kinetic: {
        name: 'Imperril',
        reason: 'Solar weapon for synergizing with Solar 3.0 fragments'
      },
      energy: {
        name: 'Calus Mini-Tool',
        reason: 'Solar SMG for sustain damage and ignition procs'
      },
      heavy: {
        name: 'Two-Tailed Fox',
        reason: 'Solar and void rockets for debuff stacking'
      }
    },
    mods: [
      'Solar Siphon',
      'Ember of Searing',
      'Hands-On',
      'Rekindled',
      'Solar Fulminator'
    ],
    notes: 'Use Hammer of Sol for add clear. Scorch enemies for ignition chains.'
  },
  {
    buildId: 'titan-void',
    class: 'Titan',
    element: 'Void',
    role: 'Support',
    name: 'Bulwark Anchor',
    weapons: {
      kinetic: {
        name: 'Kindled Orchid',
        reason: 'Explosive payload + rampage for boss damage'
      },
      energy: {
        name: 'Orewing\'s Maul',
        reason: 'Void GL with auto-loading for burst damage'
      },
      heavy: {
        name: 'Hezen Vengeance',
        reason: 'Void rocket for boss DPS and anti-Barrier'
      }
    },
    mods: [
      'Void Siphon',
      'Shield Bash',
      'Iron Skin',
      'Font of Might',
      'Protective Light'
    ],
    notes: 'Use Banner of War for survivability. Bubble provides party damage buff.'
  },
  {
    buildId: 'titan-strand',
    class: 'Titan',
    element: 'Strand',
    role: 'DPS',
    name: 'Threaded Colossus',
    weapons: {
      kinetic: {
        name: 'Neomuna',
        reason: 'Strand SMG for suspend and unraveling'
      },
      energy: {
        name: 'Unforgiven',
        reason: 'Strand shotgun for close-range damage'
      },
      heavy: {
        name: 'Terror Alpha',
        reason: 'Strand LMG for sustained DPS and suspend'
      }
    },
    mods: [
      'Strand Siphon',
      'Weavewalk',
      'Thread of Generation',
      'Drenewal',
      'Shock and Awe'
    ],
    notes: 'Frenzied Blade generates heavy attacks. Use suspend to control adds.'
  },
  {
    buildId: 'titan-prismatic',
    class: 'Titan',
    element: 'Prismatic',
    role: 'DPS',
    name: 'Chromatic Fortress',
    weapons: {
      kinetic: {
        name: 'Vex Cadence',
        reason: 'Stasis/Solar for versatile damage types'
      },
      energy: {
        name: 'Rufus\'s Fury',
        reason: 'Solar/Arc for ad clear and boss damage'
      },
      heavy: {
        name: 'Apostate',
        reason: 'Void/Strand for debuff and suspend'
      }
    },
    mods: [
      'Prismatic Siphon',
      'Harmonic Shell',
      'Absolution',
      'Font of Might',
      'Supreme Wellmaker'
    ],
    notes: 'Use Consecration for Solar damage. Combine with Strand for crowd control.'
  },

  // ==================== HUNTER BUILDS ====================
  {
    buildId: 'hunter-arc',
    class: 'Hunter',
    element: 'Arc',
    role: 'DPS',
    name: 'Storm\'s Edge',
    weapons: {
      kinetic: {
        name: 'Enyo A',
        reason: 'Arc SMG for ad clear and jolt builds'
      },
      energy: {
        name: 'The Call',
        reason: 'Arc bow for precision damage and overload'
      },
      heavy: {
        name: 'Arrowhead',
        reason: 'Arc LMG for sustained damage'
      }
    },
    mods: [
      'Arc Siphon',
      'Lightning Strikes Twice',
      'Knife Trick',
      'High-Output Crown',
      'Overload Bow'
    ],
    notes: 'Use Gathering Storm for boss damage. Jolt everything with Assassins Rumble.'
  },
  {
    buildId: 'hunter-solar',
    class: 'Hunter',
    element: 'Solar',
    role: 'DPS',
    name: 'Golden Gunner',
    weapons: {
      kinetic: {
        name: 'Aisha\'s Compass',
        reason: 'Solar scout for precision damage'
      },
      energy: {
        name: 'Duty Bound',
        reason: 'Solar shotgun for boss damage'
      },
      heavy: {
        name: 'Sleepless',
        reason: 'Solar sword for burst damage'
      }
    },
    mods: [
      'Solar Siphon',
      'Ember of Singeing',
      'Knife Trick',
      'Goldie\'s Touch',
      'Healing Nade'
    ],
    notes: 'Six-shot Golden Gun for massive boss damage. Use Knife Trick for ad clear.'
  },
  {
    buildId: 'hunter-void',
    class: 'Hunter',
    element: 'Void',
    role: 'DPS',
    name: 'Shadow Stalker',
    weapons: {
      kinetic: {
        name: 'Austringer',
        reason: 'Void hand cannon for precision damage'
      },
      energy: {
        name: 'Friction Fire',
        reason: 'Void SMG for weaken and ad clear'
      },
      heavy: {
        name: 'Braytech Osprey',
        reason: 'Void rocket for boss DPS'
      }
    },
    mods: [
      'Void Siphon',
      'Vanishing Step',
      'Stylish Executioner',
      'Orpheus Rig',
      'Unmarked'
    ],
    notes: 'Use Nightstalker for invisibility and debuffs. Trappers Ambush for weaken.'
  },
  {
    buildId: 'hunter-strand',
    class: 'Hunter',
    element: 'Strand',
    role: 'Runner',
    name: 'Silk Runner',
    weapons: {
      kinetic: {
        name: 'Passat',
        reason: 'Strand SMG for suspend and mobility'
      },
      energy: {
        name: 'Coriolis Force',
        reason: 'Strand sword for quick kills'
      },
      heavy: {
        name: 'Recursive',
        reason: 'Strand GL for area denial'
      }
    },
    mods: [
      'Strand Siphon',
      'Thread of Mind',
      'Grappling Hook',
      'Shuriken',
      'Tangles'
    ],
    notes: 'Use Bladefury for suspend. Grapple for mobility in jumping puzzles.'
  },
  {
    buildId: 'hunter-prismatic',
    class: 'Hunter',
    element: 'Prismatic',
    role: 'DPS',
    name: 'Prismatic Blade',
    weapons: {
      kinetic: {
        name: 'Igneous Hammer',
        reason: 'Solar hand cannon for precision and scorch'
      },
      energy: {
        name: 'Multimach CCX',
        reason: 'Arc SMG for jolt and ad clear'
      },
      heavy: {
        name: 'Chrysura Melo',
        reason: 'Void/Arc GL for burst damage'
      }
    },
    mods: [
      'Prismatic Siphon',
      'Thread of Mind',
      'Knife Trick',
      'Spirit of the Star-Eater',
      'Ruinous Effigy'
    ],
    notes: 'Combine Golden Gun precision with Arc mobility. Flexible damage types.'
  },

  // ==================== WARLOCK BUILDS ====================
  {
    buildId: 'warlock-arc',
    class: 'Warlock',
    element: 'Arc',
    role: 'DPS',
    name: 'Stormcaller',
    weapons: {
      kinetic: {
        name: 'MIDA Mini-Tool',
        reason: 'Arc SMG for ad clear and mobility'
      },
      energy: {
        name: 'Nezarec\'s Whisper',
        reason: 'Arc GL for burst damage'
      },
      heavy: {
        name: 'Stormchaser',
        reason: 'Arc sword for massive DPS'
      }
    },
    mods: [
      'Arc Siphon',
      'Electrostatic Mind',
      'Ionic Traces',
      'Arc Soul',
      'Lightning Surge'
    ],
    notes: 'Chaos Reach for boss damage. Keep Ionic Traces flowing for the team.'
  },
  {
    buildId: 'warlock-solar',
    class: 'Warlock',
    element: 'Solar',
    role: 'Support',
    name: 'Radiant Healer',
    weapons: {
      kinetic: {
        name: 'Sunset',
        reason: 'Solar weapon for healing and scorch'
      },
      energy: {
        name: 'Omolon Test',
        reason: 'Solar fusion for precision and ignition'
      },
      heavy: {
        name: 'Circular Burnout',
        reason: 'Solar sword for healing on kills'
      }
    },
    mods: [
      'Solar Siphon',
      'Ember of Benevolence',
      'Ember of Searing',
      'Well of Radiance',
      'Healing Rift'
    ],
    notes: 'Well of Radiance is essential for raid survivability. Keep rifts active.'
  },
  {
    buildId: 'warlock-void',
    class: 'Warlock',
    element: 'Void',
    role: 'DPS',
    name: 'Nova Bomber',
    weapons: {
      kinetic: {
        name: 'Pulsar C',
        reason: 'Void SMG for ad clear'
      },
      energy: {
        name: 'The Vision',
        reason: 'Void sidearm for precision'
      },
      heavy: {
        name: 'Bottled Revelation',
        reason: 'Void GL for Nova Bomb damage'
      }
    },
    mods: [
      'Void Siphon',
      'Nezarec\'s Sin',
      'Child of the Old Gods',
      'Feed the Void',
      'Profane'
    ],
    notes: 'Nova Bomb for massive damage. Use Void soul for healing and debuffs.'
  },
  {
    buildId: 'warlock-strand',
    class: 'Warlock',
    element: 'Strand',
    role: 'DPS',
    name: 'Weaver\'s Flow',
    weapons: {
      kinetic: {
        name: 'Extremophile 011',
        reason: 'Strand SMG for suspend'
      },
      energy: {
        name: 'Full Auto Model 8',
        reason: 'Strand SMG for ad clear'
      },
      heavy: {
        name: 'Brigand\'s Law',
        reason: 'Strand LMG for sustained damage'
      }
    },
    mods: [
      'Strand Siphon',
      'Weaver\'s Call',
      'Thread of Evolution',
      'Mindspun Invocation',
      'Woven Mail'
    ],
    notes: 'Use Shadowshot for suspend. Broodweaver generates lots of threadlings.'
  },
  {
    buildId: 'warlock-prismatic',
    class: 'Warlock',
    element: 'Prismatic',
    role: 'Support',
    name: 'Prismatic Luminary',
    weapons: {
      kinetic: {
        name: 'Ammit AR2',
        reason: 'Solar/Arc for versatile damage'
      },
      energy: {
        name: 'Calus Mini-Tool',
        reason: 'Solar/Arc for ad clear'
      },
      heavy: {
        name: 'Glaive',
        reason: 'Void/Strand for healing and suspend'
      }
    },
    mods: [
      'Prismatic Siphon',
      'Ember of Benevolence',
      'Thread of Evolution',
      'Weavewalk',
      'Harmonic Shell'
    ],
    notes: 'Use Phoenix Dive for emergency heals. Mix Strand and Solar for best results.'
  }
];

// Build selection functions
function getBuildsByClass(guardianClass) {
  return BUILDS.filter(build => build.class === guardianClass);
}

function getBuildsByElement(element) {
  return BUILDS.filter(build => build.element === element);
}

function getBuildsByRole(role) {
  return BUILDS.filter(build => build.role === role);
}

function getBuildById(buildId) {
  return BUILDS.find(build => build.buildId === buildId);
}

function getAllBuilds() {
  return BUILDS;
}
