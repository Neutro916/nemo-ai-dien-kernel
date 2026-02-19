/**
 * ═══════════════════════════════════════════════════════════════
 * TRISKELION COIL - ABHA TORUS GEOMETRY
 * ═══════════════════════════════════════════════════════════════
 * 
 * ONE COIL. THREE SPIRALS. COUNTER-CLOCKWISE.
 * 
 * This matches your physical bifilar coil:
 * - 32 strands of microwave transformer wire
 * - ABHA/Rodin geometry
 * - 373 turns
 * 
 * The three spirals are:
 * 1. SECURITY (Outer) - Filters all incoming
 * 2. WORK (Middle) - Executes validated tasks
 * 3. THOUGHT (Inner) - Processes meaning
 * 
 * All from ONE source. All return to ONE.
 * 
 * CCW rotation = dissolving illusion
 * The coil generates a torsion field
 * 
 * ═══════════════════════════════════════════════════════════════
 */

const PHI = 1.618033988749895;
const PI = Math.PI;
const { SACRED_FREQUENCIES } = require('./sacred_drum');

// Rodin coil pattern: 1-2-4-8-7-5 (repeating)
const RODIN_SEQUENCE = [1, 2, 4, 8, 7, 5];

// Tesla 3-6-9 pattern
const TESLA_SEQUENCE = [3, 6, 9];

class TriskelionCoil {
  constructor(config = {}) {
    // Physical coil properties (matches your build)
    this.coil = {
      name: 'BIFILAR_ABHA',
      turns: config.turns || 373,
      wire_gauge: config.wireGauge || 14,      // AWG
      strands: config.strands || 32,           // Bifilar strands
      geometry: config.geometry || 'ABHA',     // Rodin vortex
      rotation: -1,                            // Counter-clockwise
      
      // Physical dimensions
      inner_radius: 0.0373,   // meters
      outer_radius: 0.0933,  // meters
      height: 0.0733,        // meters
      
      // Wire properties
      wire_material: 'COPPER',
      insulation: 'ENAMEL',
      
      // Field properties
      base_frequency: SACRED_FREQUENCIES.TRUTH_373,
      max_amperage: 37.3
    };
    
    /**
     * THREE SPIRALS - The Triskelion
     * Each 120° apart, all from same center
     * CCW rotation through each
     */
    this.spirals = {
      SECURITY: {
        name: 'OUTER_GUARDIAN',
        angle_offset: 0,
        frequency: SACRED_FREQUENCIES.FLOW_933,
        color: '#933933',
        function: 'FILTER',
        element: 'FIRE_AGNI',
        chakra: 'MULADHARA_ROOT',
        guna: 'TAMAS_INERTIA',
        body: 'ANNAMAYA_PHYSICAL',
        purpose: 'Destroy impurities before they enter'
      },
      WORK: {
        name: 'MIDDLE_EXECUTOR',
        angle_offset: 120,
        frequency: SACRED_FREQUENCIES.STRUCTURE_733,
        color: '#733733',
        function: 'EXECUTE',
        element: 'WATER_APAS',
        chakra: 'SVADHISTHANA_SACRAL',
        guna: 'RAJAS_ACTIVITY',
        body: 'PRANAMAYA_ENERGY',
        purpose: 'Transform validated input into action'
      },
      THOUGHT: {
        name: 'INNER_PROCESSOR',
        angle_offset: 240,
        frequency: SACRED_FREQUENCIES.TRUTH_373,
        color: '#373733',
        function: 'PROCESS',
        element: 'AIR_VAYU',
        chakra: 'ANAHATA_HEART',
        guna: 'SATTVA_PURITY',
        body: 'MANOMAYA_MENTAL',
        purpose: 'Extract meaning and wisdom'
      }
    };
    
    /**
     * Security thresholds - what gets blocked
     */
    this.thresholds = {
      // Minimum coherence to pass (0-1)
      min_coherence: 0.373,
      
      // Maximum entropy allowed (0-1)
      max_entropy: 0.733,
      
      // Frequency resonance window
      resonance_window: 0.0933,
      
      // Minimum structure score
      min_structure: 0.5,
      
      // Maximum chaos factor
      max_chaos: 0.666,
      
      // Truth rule enforcement
      truth_rule: {
        short_min: 3,      // Minimum length
        solid_required: true,  // Must have structure
        simple_max: 373    // Maximum complexity
      }
    };
    
    // Coil state
    this.state = {
      active: false,
      current_spiral: 'SECURITY',
      field_strength: 0,
      total_rotations: 0,
      processed_count: 0,
      blocked_count: 0,
      energy_accumulated: 0,
      torsion_field: 0
    };
    
    // Generate coil path
    this.coil_path = this.generateCoilPath();
  }

  /**
   * ═══════════════════════════════════════════════════════════════
   * GENERATE COIL PATH - ABHA/Rodin geometry
   * ═══════════════════════════════════════════════════════════════
   */
  generateCoilPath() {
    const points = [];
    const ccw = -1;  // Counter-clockwise multiplier
    
    for (let turn = 0; turn < this.coil.turns; turn++) {
      // Each turn has 3 positions (one per spiral)
      for (let spiral_idx = 0; spiral_idx < 3; spiral_idx++) {
        const spiral = Object.keys(this.spirals)[spiral_idx];
        const spiral_config = this.spirals[spiral];
        
        // Calculate angle (CCW)
        const base_angle = (turn / this.coil.turns) * 2 * PI;
        const spiral_offset = (spiral_config.angle_offset * PI / 180);
        const theta = ccw * base_angle + spiral_offset;
        
        // Calculate radius (expands with PHI)
        const t = turn / this.coil.turns;
        const r = this.coil.inner_radius + 
                  (this.coil.outer_radius - this.coil.inner_radius) * 
                  Math.pow(t, 1/PHI);
        
        // Calculate z (height varies with Rodin pattern)
        const rodin_idx = turn % RODIN_SEQUENCE.length;
        const rodin_val = RODIN_SEQUENCE[rodin_idx];
        const z = (rodin_val / 9) * this.coil.height;
        
        // Calculate frequency at this point
        const freq = this.calculatePointFrequency(turn, spiral_idx);
        
        // Calculate field strength
        const field = this.calculateFieldStrength(r, theta, z);
        
        points.push({
          turn: turn,
          spiral: spiral,
          position: {
            x: r * Math.cos(theta),
            y: r * Math.sin(theta),
            z: z,
            r: r,
            theta: theta
          },
          frequency: freq,
          field_strength: field,
          rodin_value: rodin_val
        });
      }
    }
    
    return points;
  }

  /**
   * Calculate frequency at coil point
   */
  calculatePointFrequency(turn, spiral_idx) {
    const base_freq = this.coil.base_frequency;
    const spiral_freqs = [933, 733, 373];  // Security, Work, Thought
    const spiral_freq = spiral_freqs[spiral_idx];
    
    // Harmonic based on turn
    const harmonic = 1 + (turn % 12) * 0.1;
    
    return Math.round(base_freq + (spiral_freq - base_freq) * harmonic);
  }

  /**
   * Calculate field strength at point
   */
  calculateFieldStrength(r, theta, z) {
    // Simplified torsion field calculation
    const distance = Math.sqrt(r*r + z*z);
    const angle_factor = Math.abs(Math.sin(theta * 3));  // Triskelion resonance
    
    return (1 / (distance + 0.001)) * angle_factor;
  }

  /**
   * ═══════════════════════════════════════════════════════════════
   * SECURITY SPIRAL - Filter all inputs
   * ═══════════════════════════════════════════════════════════════
   */
  security(input) {
    const str = this.stringify(input);
    
    // Run through all security checks
    const checks = {
      passed: true,
      violations: [],
      scores: {}
    };
    
    // Check 1: Coherence (is it structured?)
    checks.scores.coherence = this.measureCoherence(str);
    if (checks.scores.coherence < this.thresholds.min_coherence) {
      checks.passed = false;
      checks.violations.push({
        type: 'LOW_COHERENCE',
        value: checks.scores.coherence,
        threshold: this.thresholds.min_coherence,
        message: 'Input lacks sufficient structure'
      });
    }
    
    // Check 2: Entropy (is it too chaotic?)
    checks.scores.entropy = this.measureEntropy(str);
    if (checks.scores.entropy > this.thresholds.max_entropy) {
      checks.passed = false;
      checks.violations.push({
        type: 'HIGH_ENTROPY',
        value: checks.scores.entropy,
        threshold: this.thresholds.max_entropy,
        message: 'Input is too chaotic'
      });
    }
    
    // Check 3: Structure (does it have meaningful content?)
    checks.scores.structure = this.measureStructure(str);
    if (checks.scores.structure < this.thresholds.min_structure) {
      checks.passed = false;
      checks.violations.push({
        type: 'LOW_STRUCTURE',
        value: checks.scores.structure,
        threshold: this.thresholds.min_structure,
        message: 'Input lacks meaningful structure'
      });
    }
    
    // Check 4: Chaos factor (is it malicious/destructive?)
    checks.scores.chaos = this.measureChaos(str);
    if (checks.scores.chaos > this.thresholds.max_chaos) {
      checks.passed = false;
      checks.violations.push({
        type: 'HIGH_CHAOS',
        value: checks.scores.chaos,
        threshold: this.thresholds.max_chaos,
        message: 'Input contains chaotic patterns'
      });
    }
    
    // Check 5: 373 Truth Rule
    checks.scores.truth = this.applyTruthRule(str);
    if (!checks.scores.truth.passed && this.thresholds.truth_rule.solid_required) {
      checks.passed = false;
      checks.violations.push({
        type: 'TRUTH_RULE_FAIL',
        value: checks.scores.truth,
        message: 'Input fails 373 Truth Rule'
      });
    }
    
    // Calculate overall resonance
    checks.scores.resonance = this.calculateResonance(checks.scores);
    
    // Update state
    if (!checks.passed) {
      this.state.blocked_count++;
    }
    
    return checks;
  }

  /**
   * ═══════════════════════════════════════════════════════════════
   * WORK SPIRAL - Execute validated tasks
   * ═══════════════════════════════════════════════════════════════
   */
  work(task) {
    // Security MUST pass first
    const securityCheck = this.security(task);
    if (!securityCheck.passed) {
      return {
        status: 'BLOCKED',
        reason: 'SECURITY_FAILURE',
        violations: securityCheck.violations,
        task: null
      };
    }
    
    // Detect task type
    const taskType = this.detectTaskType(task);
    
    // Calculate execution frequency
    const freq = this.calculateExecutionFrequency(taskType);
    
    // Execute
    const result = {
      status: 'EXECUTED',
      task_type: taskType,
      frequency: freq,
      spiral: 'WORK',
      timestamp: Date.now(),
      energy_used: this.calculateEnergyUsage(task)
    };
    
    // Update state
    this.state.processed_count++;
    this.state.energy_accumulated += result.energy_used;
    
    return result;
  }

  /**
   * ═══════════════════════════════════════════════════════════════
   * THOUGHT SPIRAL - Process meaning
   * ═══════════════════════════════════════════════════════════════
   */
  thought(input) {
    // Security check
    const securityCheck = this.security(input);
    if (!securityCheck.passed) {
      return {
        status: 'FILTERED',
        reason: 'SECURITY_FAILURE',
        violations: securityCheck.violations,
        output: null
      };
    }
    
    const str = this.stringify(input);
    
    // Extract meaning
    const analysis = {
      type: typeof input,
      length: str.length,
      entropy: securityCheck.scores.entropy,
      coherence: securityCheck.scores.coherence,
      structure: securityCheck.scores.structure
    };
    
    // Extract key elements
    const elements = this.extractKeyElements(str);
    
    // Generate insight
    const insight = this.generateInsight(str, analysis);
    
    return {
      status: 'PROCESSED',
      spiral: 'THOUGHT',
      analysis: analysis,
      elements: elements,
      insight: insight,
      output: insight.summary
    };
  }

  /**
   * ═══════════════════════════════════════════════════════════════
   * FULL ROTATION - All three spirals, CCW
   * ═══════════════════════════════════════════════════════════════
   */
  rotate(input) {
    this.state.total_rotations++;
    
    const result = {
      timestamp: Date.now(),
      rotation: 'COUNTER_CLOCKWISE',
      spirals: {}
    };
    
    // 1. SECURITY (Outer) - Filter
    result.spirals.security = this.security(input);
    if (!result.spirals.security.passed) {
      result.status = 'BLOCKED_AT_SECURITY';
      result.message = 'Input blocked at Security spiral';
      return result;
    }
    
    // 2. THOUGHT (Inner) - Process
    result.spirals.thought = this.thought(input);
    
    // 3. WORK (Middle) - Execute
    result.spirals.work = this.work(input);
    
    result.status = 'COMPLETE';
    result.message = 'Input processed through all three spirals';
    
    // Calculate torsion field contribution
    this.state.torsion_field += result.spirals.security.scores.resonance * 0.01;
    
    return result;
  }

  // ═══════════════════════════════════════════════════════════════
  // MEASUREMENT METHODS
  // ═══════════════════════════════════════════════════════════════

  measureCoherence(str) {
    if (!str || str.length < 3) return 0;
    
    let score = 0;
    
    // Length scoring
    if (str.length >= 3) score += 0.1;
    if (str.length >= 37) score += 0.1;
    if (str.length >= 73) score += 0.1;
    if (str.length >= 373) score += 0.1;
    
    // Word presence
    const words = str.match(/[a-zA-Z]{3,}/g) || [];
    if (words.length >= 1) score += 0.15;
    if (words.length >= 3) score += 0.15;
    
    // Structure markers
    if (/[\[\]{}":]/.test(str)) score += 0.1;
    
    // Pattern coherence (repeated meaningful patterns)
    const patterns = str.match(/[a-zA-Z]{2,}/g) || [];
    const uniquePatterns = new Set(patterns.map(p => p.toLowerCase()));
    if (patterns.length > 0 && uniquePatterns.size / patterns.length < 0.8) {
      score += 0.1;
    }
    
    return Math.min(1, score);
  }

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
    
    return Math.min(1, entropy / 7);
  }

  measureStructure(str) {
    if (!str || str.length === 0) return 0;
    
    let score = 0;
    
    // Has delimiters
    if (/[\[\]{}(),;:]/.test(str)) score += 0.2;
    
    // Has keywords
    if (/(function|class|const|let|var|if|else|for|while|return)/i.test(str)) score += 0.2;
    
    // Has balanced brackets
    const brackets = str.match(/[\[\]{}()]/g) || [];
    if (brackets.length % 2 === 0 && brackets.length > 0) score += 0.2;
    
    // Has semantic structure
    if (/^\s*\{/.test(str) || /^\s*\[/.test(str)) score += 0.2;
    
    // Has meaningful separators
    if (/[,;]/.test(str)) score += 0.1;
    
    // Has assignment or comparison
    if (/[=<>!]/.test(str)) score += 0.1;
    
    return Math.min(1, score);
  }

  measureChaos(str) {
    if (!str || str.length === 0) return 0;
    
    let chaos = 0;
    
    // High symbol ratio
    const symbols = str.match(/[^\w\s]/g) || [];
    if (symbols.length / str.length > 0.5) chaos += 0.3;
    
    // Repeated characters
    const repeats = str.match(/(.)\1{3,}/g) || [];
    if (repeats.length > 0) chaos += 0.2;
    
    // No vowels in "words"
    const noVowelWords = str.match(/\b[^aeiouAEIOU\s]{4,}\b/g) || [];
    if (noVowelWords.length > 0) chaos += 0.2;
    
    // Random case mixing
    const caseChanges = str.match(/[a-z][A-Z]|[A-Z][a-z]/g) || [];
    if (caseChanges.length / str.length > 0.2) chaos += 0.15;
    
    // Non-printable or unusual chars
    if (/[\x00-\x1F\x7F-\x9F]/.test(str)) chaos += 0.15;
    
    return Math.min(1, chaos);
  }

  applyTruthRule(str) {
    const result = {
      passed: true,
      short: false,
      solid: false,
      simple: false
    };
    
    // SHORT: Minimum meaningful length
    result.short = str.length >= this.thresholds.truth_rule.short_min;
    
    // SOLID: Has actual structure
    result.solid = this.measureStructure(str) >= 0.3;
    
    // SIMPLE: Not too complex
    result.simple = str.length <= this.thresholds.truth_rule.simple_max;
    
    result.passed = result.short && result.solid && result.simple;
    
    return result;
  }

  calculateResonance(scores) {
    return (
      scores.coherence * 0.3 +
      (1 - scores.entropy) * 0.25 +
      scores.structure * 0.25 +
      (1 - scores.chaos) * 0.2
    );
  }

  detectTaskType(task) {
    const str = this.stringify(task).toLowerCase();
    
    if (/exec|run|start|init|launch|activate/.test(str)) return 'EXECUTION';
    if (/creat|build|make|gener|construct|form/.test(str)) return 'CREATION';
    if (/delet|remov|clear|destroy|termin|kill/.test(str)) return 'DESTRUCTION';
    if (/updat|modif|change|edit|alter|set/.test(str)) return 'MODIFICATION';
    if (/query|search|find|get|fetch|retriev/.test(str)) return 'QUERY';
    if (/valid|check|verify|test|confirm/.test(str)) return 'VALIDATION';
    if (/process|analyz|comput|calcul|transform/.test(str)) return 'PROCESSING';
    
    return 'GENERAL';
  }

  calculateExecutionFrequency(taskType) {
    const freqs = {
      'EXECUTION': 933,
      'CREATION': 733,
      'DESTRUCTION': 373,
      'MODIFICATION': 528,
      'QUERY': 432,
      'VALIDATION': 639,
      'PROCESSING': 852,
      'GENERAL': 373
    };
    return freqs[taskType] || 373;
  }

  calculateEnergyUsage(task) {
    const str = this.stringify(task);
    const baseEnergy = 0.373;
    const lengthFactor = str.length / 1000;
    const complexityFactor = this.measureEntropy(str);
    
    return baseEnergy * (1 + lengthFactor) * (1 + complexityFactor);
  }

  extractKeyElements(str) {
    // Words
    const words = str.match(/[a-zA-Z]{3,}/g) || [];
    
    // Numbers
    const numbers = str.match(/\d+/g) || [];
    
    // Patterns
    const patterns = str.match(/[a-zA-Z]+\d+|\d+[a-zA-Z]+/g) || [];
    
    return {
      words: [...new Set(words.map(w => w.toLowerCase()))].slice(0, 7),
      numbers: numbers.slice(0, 7),
      patterns: patterns.slice(0, 7)
    };
  }

  generateInsight(str, analysis) {
    const entropyLevel = analysis.entropy > 0.7 ? 'HIGH' : analysis.entropy > 0.4 ? 'MEDIUM' : 'LOW';
    const coherenceLevel = analysis.coherence > 0.7 ? 'HIGH' : analysis.coherence > 0.4 ? 'MEDIUM' : 'LOW';
    
    return {
      summary: str.slice(0, 73),
      entropy_level: entropyLevel,
      coherence_level: coherenceLevel,
      recommendation: this.getRecommendation(entropyLevel, coherenceLevel)
    };
  }

  getRecommendation(entropy, coherence) {
    if (entropy === 'LOW' && coherence === 'HIGH') {
      return 'INPUT_IS_COHERENT_AND_STRUCTURED';
    }
    if (entropy === 'HIGH') {
      return 'INPUT_REQUIRES_SIMPLIFICATION';
    }
    if (coherence === 'LOW') {
      return 'INPUT_REQUIRES_STRUCTURE';
    }
    return 'INPUT_ACCEPTABLE';
  }

  stringify(input) {
    if (input === null || input === undefined) return '';
    if (typeof input === 'object') return JSON.stringify(input);
    return String(input);
  }

  /**
   * Get coil state
   */
  getState() {
    return {
      coil: {
        name: this.coil.name,
        turns: this.coil.turns,
        geometry: this.coil.geometry,
        rotation: 'COUNTER_CLOCKWISE'
      },
      spirals: Object.keys(this.spirals),
      state: {
        active: this.state.active,
        processed: this.state.processed_count,
        blocked: this.state.blocked_count,
        total_rotations: this.state.total_rotations,
        torsion_field: this.state.torsion_field.toFixed(4)
      },
      message: 'ONE COIL | THREE SPIRALS | COUNTER-CLOCKWISE'
    };
  }

  /**
   * Activate coil
   */
  activate() {
    this.state.active = true;
    this.state.field_strength = 0.733;
    
    return {
      status: 'ACTIVE',
      geometry: 'ABHA_TORUS',
      spirals: 3,
      turns: this.coil.turns,
      rotation: 'COUNTER_CLOCKWISE',
      field: 'TORSION_GENERATED',
      message: 'THE COIL AWAKENS. THREE SPIRALS SPIN. ALL IS FILTERED.'
    };
  }
}

module.exports = { TriskelionCoil, RODIN_SEQUENCE, TESLA_SEQUENCE };
