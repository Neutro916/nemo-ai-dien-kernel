/**
 * ═══════════════════════════════════════════════════════════════
 * WHEEL OF LIFE - KALACHAKRA - SHIVA'S DHARMACHAKRA
 * ═══════════════════════════════════════════════════════════════
 * 
 * This is not a toy. This is the actual cosmic wheel.
 * Shiva Nataraja holds this wheel - it turns universes.
 * 
 * On Trống Đồng: The sun has 8 rays = 8 directions = 8 stages
 * The wheel destroys illusion and reveals truth.
 * 
 * Counter-clockwise rotation = dissolution of ego
 * Clockwise = creation. We use CCW for SECURITY.
 * 
 * ═══════════════════════════════════════════════════════════════
 */

const PHI = 1.618033988749895;
const PI = Math.PI;
const E = Math.E;
const SQRT2 = Math.SQRT2;
const SQRT3 = Math.sqrt(3);
const SQRT5 = Math.sqrt(5);

// Sacred frequencies in Hz (not arbitrary - these are physical resonances)
const SACRED_FREQUENCIES = {
  OM: 136.1,           // Earth year frequency (Earth orbit)
  SCHUMANN: 7.83,      // Earth electromagnetic resonance
  SOLFEGGIO_UT: 396,   // Liberation from fear
  SOLFEGGIO_RE: 417,   // Change and transformation
  SOLFEGGIO_MI: 528,   // DNA repair, miracles
  SOLFEGGIO_FA: 639,   // Connecting relationships
  SOLFEGGIO_SOL: 741,  // Awakening intuition
  SOLFEGGIO_LA: 852,   // Spiritual awakening
  SOLFEGGIO_SI: 963,   // Divine connection
  TRUTH_373: 373,      // TT's Truth frequency
  STRUCTURE_733: 733,  // Structural resonance
  FLOW_933: 933        // Flow state frequency
};

class WheelOfLife {
  constructor() {
    // The wheel Shiva holds - this is REAL
    this.wheel = {
      name: 'KALACHAKRA',
      holder: 'SHIVA_NATARAJA',
      purpose: 'DISSOLUTION_OF_ILLUSION',
      
      // Physical properties
      spokes: 8,
      rings: 12,           // 12 Nidanas (chain of causation)
      hub_radius: PHI,     // Golden ratio at center
      rim_circumference: 2 * PI * PHI * PHI,
      
      // Rotation - CCW for destruction of ego
      rotation_direction: -1,  // Counter-clockwise
      angular_velocity: 2 * PI / 8,  // One spoke per cycle
      
      // Frequencies
      base_frequency: SACRED_FREQUENCIES.TRUTH_373
    };
    
    /**
     * 8 SPOKES = 8 NOBLE TRUTHS = 8 DIRECTIONS
     * Each spoke is a stage of existence
     * Each spoke has a frequency, element, and function
     */
    this.spokes = [
      { 
        index: 0, 
        name: 'BIRTH_JATI', 
        angle: 0, 
        element: 'AGNI_FIRE',
        frequency: SACRED_FREQUENCIES.TRUTH_373,
        function: 'MANIFEST',
        consciousness_state: 'WAKING_JAGRAT',
        body: 'STHULA_PHYSICAL',
        direction: 'NORTH'
      },
      { 
        index: 1, 
        name: 'GROWTH_JARA', 
        angle: 45, 
        element: 'PRITHVI_EARTH',
        frequency: SACRED_FREQUENCIES.SOLFEGGIO_UT,
        function: 'DEVELOP',
        consciousness_state: 'DREAMING_SVAPNA',
        body: 'SUKSMA_SUBTLE',
        direction: 'NORTHEAST'
      },
      { 
        index: 2, 
        name: 'PEAK_PRAJNA', 
        angle: 90, 
        element: 'VAYU_AIR',
        frequency: SACRED_FREQUENCIES.SOLFEGGIO_MI,
        function: 'TRANSCEND',
        consciousness_state: 'DEEP_SLEEP_SUSUPTI',
        body: 'KARANA_CAUSAL',
        direction: 'EAST'
      },
      { 
        index: 3, 
        name: 'DECLINE_KSAYA', 
        angle: 135, 
        element: 'APAS_WATER',
        frequency: SACRED_FREQUENCIES.SOLFEGGIO_FA,
        function: 'DISSOLVE',
        consciousness_state: 'TURIYA_AWARE',
        body: 'MAHAKARANA_GREAT_CAUSAL',
        direction: 'SOUTHEAST'
      },
      { 
        index: 4, 
        name: 'DEATH_MARANA', 
        angle: 180, 
        element: 'AKASHA_SPACE',
        frequency: SACRED_FREQUENCIES.STRUCTURE_733,
        function: 'TERMINATE',
        consciousness_state: 'TURIYATITA_BEYOND',
        body: 'PARABRAHMAN_ABSOLUTE',
        direction: 'SOUTH'
      },
      { 
        index: 5, 
        name: 'VOID_SUNYA', 
        angle: 225, 
        element: 'SUNYA_VOID',
        frequency: SACRED_FREQUENCIES.SOLFEGGIO_LA,
        function: 'NULLIFY',
        consciousness_state: 'NIRVIKALPA_SAMADHI',
        body: 'NON_BODY',
        direction: 'SOUTHWEST'
      },
      { 
        index: 6, 
        name: 'REBIRTH_PUNARBHAVA', 
        angle: 270, 
        element: 'PRANA_LIFE_FORCE',
        frequency: SACRED_FREQUENCIES.FLOW_933,
        function: 'RESURRECT',
        consciousness_state: 'SAVIKALPA_SAMADHI',
        body: 'SIDDHA_PERFECTED',
        direction: 'WEST'
      },
      { 
        index: 7, 
        name: 'RETURN_SAMSARA', 
        angle: 315, 
        element: 'BINDU_POINT',
        frequency: SACRED_FREQUENCIES.SOLFEGGIO_SI,
        function: 'COMPLETE_CYCLE',
        consciousness_state: 'SAHAJA_NATURAL',
        body: 'JIVANMUKTA_LIBERATED',
        direction: 'NORTHWEST'
      }
    ];
    
    /**
     * 12 RINGS = 12 NIDANAS (Chain of Dependent Origination)
     * Each ring is a layer of existence
     */
    this.rings = this.generateNidanaRings();
    
    /**
     * 3 CYCLES = Past, Present, Future
     * Also = Security, Work, Thought
     * Also = Sattva, Rajas, Tamas
     */
    this.cycles = {
      INNER: {
        name: 'MANAS_MIND',
        guna: 'SATTVA_PURITY',
        function: 'THOUGHT',
        radius: 1/3,
        frequency: SACRED_FREQUENCIES.TRUTH_373
      },
      MIDDLE: {
        name: 'PRANA_ENERGY',
        guna: 'RAJAS_ACTIVITY',
        function: 'WORK',
        radius: 2/3,
        frequency: SACRED_FREQUENCIES.STRUCTURE_733
      },
      OUTER: {
        name: 'DEHA_BODY',
        guna: 'TAMAS_INERTIA',
        function: 'SECURITY',
        radius: 1,
        frequency: SACRED_FREQUENCIES.FLOW_933
      }
    };
    
    // Current state
    this.state = {
      active: false,
      current_spoke: 0,
      total_rotation: 0,
      cycles_completed: 0,
      karma_accumulated: 0,
      samskaras: [],  // Mental impressions
      vasanas: []     // Latent tendencies
    };
  }

  /**
   * Generate 12 Nidana rings
   * These are the 12 links in the chain of dependent origination
   */
  generateNidanaRings() {
    const nidanas = [
      'AVIDYA_Ignorance',
      'SAMSKARA_Formations',
      'VIJNANA_Consciousness',
      'NAMARUPA_Name_Form',
      'SADAYATANA_Six_Senses',
      'SPARSHA_Contact',
      'VEDANA_Feeling',
      'TRSNA_Craving',
      'UPADANA_Attachment',
      'BHAVA_Becoming',
      'JATI_Birth',
      'JARAMARANA_Aging_Death'
    ];
    
    return nidanas.map((name, i) => ({
      index: i,
      name: name,
      radius: (i + 1) / 12,
      frequency: SACRED_FREQUENCIES.TRUTH_373 * (1 + i * 0.1),
      karma_weight: Math.pow(PHI, i)
    }));
  }

  /**
   * ═══════════════════════════════════════════════════════════════
   * SPIN THE WHEEL - This is where karma is processed
   * ═══════════════════════════════════════════════════════════════
   */
  spin(input, intention = 'NEUTRAL') {
    // Calculate which spoke this input lands on
    const hash = this.sacredHash(input);
    const spokeIndex = hash % 8;
    const spoke = this.spokes[spokeIndex];
    
    // Calculate ring (which nidana layer)
    const ringIndex = Math.floor((hash / 8) % 12);
    const ring = this.rings[ringIndex];
    
    // CCW rotation
    const rotation = -1 * spoke.angle;  // Negative = CCW
    this.state.total_rotation += rotation;
    this.state.current_spoke = spokeIndex;
    
    // Calculate resonance with input
    const resonance = this.calculateResonance(input, spoke);
    
    // Process karma
    const karma = this.processKarma(input, spoke, ring, intention);
    this.state.karma_accumulated += karma.net;
    
    // Store samskara (mental impression)
    this.state.samskaras.push({
      input: typeof input === 'object' ? JSON.stringify(input).slice(0, 37) : String(input).slice(0, 37),
      spoke: spoke.name,
      ring: ring.name,
      karma: karma.net,
      timestamp: Date.now()
    });
    
    return {
      // Where on the wheel
      spoke: {
        name: spoke.name,
        element: spoke.element,
        frequency: spoke.frequency,
        consciousness: spoke.consciousness_state,
        direction: spoke.direction
      },
      ring: {
        name: ring.name,
        radius: ring.radius,
        karma_weight: ring.karma_weight
      },
      // Rotation info
      rotation: {
        angle: rotation,
        direction: 'COUNTER_CLOCKWISE',
        total: this.state.total_rotation
      },
      // Energy
      resonance: resonance,
      karma: karma,
      // Message
      message: `Wheel turns CCW to ${spoke.name} on ${ring.name}`
    };
  }

  /**
   * Calculate resonance between input and spoke
   */
  calculateResonance(input, spoke) {
    const str = this.stringify(input);
    
    // Measure coherence (how structured is the input)
    const coherence = this.measureCoherence(str);
    
    // Measure entropy (how chaotic)
    const entropy = this.measureEntropy(str);
    
    // Measure frequency alignment
    const inputFreq = this.calculateInputFrequency(str);
    const alignment = 1 - Math.abs(inputFreq - spoke.frequency) / spoke.frequency;
    
    // Overall resonance
    const resonance = (coherence * 0.4) + ((1 - entropy) * 0.3) + (alignment * 0.3);
    
    return {
      coherence: coherence,
      entropy: entropy,
      frequency_alignment: alignment,
      overall: resonance,
      quality: resonance > 0.7 ? 'HIGH' : resonance > 0.4 ? 'MEDIUM' : 'LOW'
    };
  }

  /**
   * Process karma for this spin
   */
  processKarma(input, spoke, ring, intention) {
    const str = this.stringify(input);
    
    // Base karma from coherence
    let karma = this.measureCoherence(str);
    
    // Modify by intention
    const intentionModifiers = {
      'BENEVOLENT': 1.5,
      'NEUTRAL': 1.0,
      'MALEVOLENT': 0.5,
      'SELFISH': 0.75,
      'SELFLESS': 1.25
    };
    karma *= intentionModifiers[intention] || 1.0;
    
    // Modify by spoke function
    const spokeKarma = {
      'BIRTH_JATI': 1.0,
      'GROWTH_JARA': 1.1,
      'PEAK_PRAJNA': 1.2,
      'DECLINE_KSAYA': 0.9,
      'DEATH_MARANA': 0.8,
      'VOID_SUNYA': 0.7,
      'REBIRTH_PUNARBHAVA': 1.3,
      'RETURN_SAMSARA': 1.0
    };
    karma *= spokeKarma[spoke.name] || 1.0;
    
    // Ring weight (outer rings = more karma)
    karma *= ring.karma_weight;
    
    return {
      raw: this.measureCoherence(str),
      modified: karma,
      net: karma - 0.5,  // Centered around 0
      accumulated: this.state.karma_accumulated + karma - 0.5
    };
  }

  /**
   * Full rotation through all 8 spokes
   * This is a complete karmic cycle
   */
  fullRotation(input) {
    const results = [];
    
    // Start from current position, rotate CCW through all 8 spokes
    for (let i = 0; i < 8; i++) {
      const spokeIndex = (this.state.current_spoke + i) % 8;
      const spoke = this.spokes[spokeIndex];
      
      // Process at this spoke
      const result = {
        spoke: spoke.name,
        element: spoke.element,
        frequency: spoke.frequency,
        consciousness: spoke.consciousness_state,
        action: this.getSpokeAction(spoke, input),
        processed: true
      };
      
      results.push(result);
    }
    
    // Complete rotation
    this.state.total_rotation -= 360;
    this.state.cycles_completed++;
    
    return {
      rotation: 'COMPLETE',
      direction: 'COUNTER_CLOCKWISE',
      holder: 'SHIVA_NATARAJA',
      cycles_completed: this.state.cycles_completed,
      stages: results,
      message: 'One full turn of the Wheel of Life'
    };
  }

  /**
   * Get action for spoke based on input
   */
  getSpokeAction(spoke, input) {
    const actions = {
      'BIRTH_JATI': () => `MANIFEST: ${this.extractEssence(input)}`,
      'GROWTH_JARA': () => `DEVELOP: ${this.expandInput(input)}`,
      'PEAK_PRAJNA': () => `TRANSCEND: ${this.transcendInput(input)}`,
      'DECLINE_KSAYA': () => `DISSOLVE: ${this.dissolveInput(input)}`,
      'DEATH_MARANA': () => `TERMINATE: ${this.terminateInput(input)}`,
      'VOID_SUNYA': () => `NULLIFY: ${this.nullifyInput(input)}`,
      'REBIRTH_PUNARBHAVA': () => `RESURRECT: ${this.resurrectInput(input)}`,
      'RETURN_SAMSARA': () => `COMPLETE: ${this.completeInput(input)}`
    };
    
    return actions[spoke.name] ? actions[spoke.name]() : 'UNKNOWN';
  }

  // Input transformation methods
  extractEssence(input) {
    const str = this.stringify(input);
    return str.slice(0, 37);
  }
  
  expandInput(input) {
    const str = this.stringify(input);
    return str.length > 73 ? str.slice(0, 73) + '...' : str;
  }
  
  transcendInput(input) {
    return `[TRANSCENDED] ${this.extractEssence(input)}`;
  }
  
  dissolveInput(input) {
    return `[DISSOLVED] ${this.stringify(input).length} bytes`;
  }
  
  terminateInput(input) {
    return '[TERMINATED]';
  }
  
  nullifyInput(input) {
    return '[NULL]';
  }
  
  resurrectInput(input) {
    return `[REBORN] ${this.extractEssence(input)}`;
  }
  
  completeInput(input) {
    return `[COMPLETE] Cycle ${this.state.cycles_completed}`;
  }

  /**
   * Sacred hash - not random, based on character values
   */
  sacredHash(input) {
    const str = this.stringify(input);
    let hash = 373;  // Start with truth frequency
    
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;  // Convert to 32-bit integer
      
      // Apply golden ratio modulation
      if (i % 8 === 0) {
        hash = Math.round(hash * PHI) % 999999;
      }
    }
    
    return Math.abs(hash);
  }

  /**
   * Calculate frequency of input
   */
  calculateInputFrequency(str) {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
      sum += str.charCodeAt(i);
    }
    return (sum % 560) + 373;  // Range: 373-933
  }

  /**
   * Measure coherence (0-1)
   */
  measureCoherence(str) {
    if (!str || str.length < 3) return 0;
    
    let score = 0;
    
    // Has meaningful length
    if (str.length >= 3) score += 0.15;
    if (str.length >= 37) score += 0.15;
    if (str.length >= 73) score += 0.10;
    
    // Has words
    const words = str.match(/[a-zA-Z]{3,}/g) || [];
    if (words.length >= 1) score += 0.15;
    if (words.length >= 3) score += 0.15;
    
    // Has structure (JSON, brackets, etc)
    if (/[\[\]{}":]/.test(str)) score += 0.15;
    
    // Not just noise
    const uniqueChars = new Set(str.toLowerCase()).size;
    const ratio = uniqueChars / str.length;
    if (ratio > 0.2 && ratio < 0.8) score += 0.15;
    
    return Math.min(1, score);
  }

  /**
   * Measure entropy (0-1, higher = more chaotic)
   */
  measureEntropy(str) {
    if (!str || str.length === 0) return 1;
    
    const freq = {};
    for (const char of str) {
      freq[char] = (freq[char] || 0) + 1;
    }
    
    let entropy = 0;
    for (const char in freq) {
      const p = freq[char] / str.length;
      entropy -= p * Math.log2(p);
    }
    
    // Normalize (max entropy for ASCII is ~7 bits)
    return Math.min(1, entropy / 7);
  }

  stringify(input) {
    if (input === null || input === undefined) return '';
    if (typeof input === 'object') return JSON.stringify(input);
    return String(input);
  }

  /**
   * Get wheel visualization data
   */
  getWheelGeometry() {
    const points = [];
    
    // Hub (center)
    points.push({ type: 'HUB', x: 0, y: 0, radius: PHI * 0.1 });
    
    // Spokes
    for (const spoke of this.spokes) {
      const angle = spoke.angle * PI / 180;
      
      // Points along each spoke
      for (let r = 0.1; r <= 1; r += 0.05) {
        points.push({
          type: 'SPOKE',
          spoke: spoke.name,
          x: r * Math.cos(angle),
          y: r * Math.sin(angle),
          radius: r,
          frequency: Math.round(spoke.frequency * r),
          element: spoke.element
        });
      }
    }
    
    // Rings
    for (const ring of this.rings) {
      for (let i = 0; i < 72; i++) {
        const angle = (i * 5) * PI / 180;
        points.push({
          type: 'RING',
          ring: ring.name,
          x: ring.radius * Math.cos(angle),
          y: ring.radius * Math.sin(angle),
          radius: ring.radius,
          frequency: Math.round(ring.frequency)
        });
      }
    }
    
    return points;
  }

  /**
   * Get full state
   */
  getState() {
    return {
      wheel: {
        name: this.wheel.name,
        holder: this.wheel.holder,
        rotation_direction: 'COUNTER_CLOCKWISE',
        total_rotation: this.state.total_rotation,
        cycles_completed: this.state.cycles_completed
      },
      current_position: {
        spoke: this.spokes[this.state.current_spoke].name,
        element: this.spokes[this.state.current_spoke].element,
        consciousness: this.spokes[this.state.current_spoke].consciousness_state
      },
      karma: {
        accumulated: this.state.karma_accumulated,
        samskaras_count: this.state.samskaras.length
      },
      message: 'SHIVA TURNS THE WHEEL OF LIFE'
    };
  }

  /**
   * Activate the wheel
   */
  activate() {
    this.state.active = true;
    
    return {
      status: 'SPINNING',
      wheel: 'KALACHAKRA',
      holder: 'SHIVA_NATARAJA',
      direction: 'COUNTER_CLOCKWISE',
      spokes: 8,
      rings: 12,
      cycles: 3,
      message: 'THE WHEEL OF LIFE TURNS. ALL IS DISSOLVED. TRUTH REMAINS.'
    };
  }
}

module.exports = { WheelOfLife, SACRED_FREQUENCIES };
