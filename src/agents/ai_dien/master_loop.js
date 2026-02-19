/**
 * ═══════════════════════════════════════════════════════════════
 * DHARMACHAKRA MASTER LOOP
 * ═══════════════════════════════════════════════════════════════
 * 
 * The Wheel is MASTER. The Grinder waits.
 * 
 * Every process must:
 * 1. Start at BIRTH (373Hz)
 * 2. Rotate through 8 spokes
 * 3. Pass 373 Truth Rule
 * 4. Get Wheel authorization
 * 
 * PULL SYSTEM:
 * - Wheel authorizes frequency resonance
 * - Grinder can't run without Wheel permission
 * - Sacred Drum is the ONLY gatekeeper
 * 
 * ═══════════════════════════════════════════════════════════════
 */

const { WheelOfLife, SACRED_FREQUENCIES } = require('./sacred_drum');
const { TriskelionCoil } = require('./triskelion');

class DharmachakraMaster {
  constructor() {
    // The Wheel is MASTER
    this.wheel = new WheelOfLife();
    this.coil = new TriskelionCoil();
    
    // Master state
    this.state = {
      initialized: false,
      current_spoke: 0,  // Always start at BIRTH (0)
      authorization_pending: false,
      last_authorization: null,
      ground_count: 0,   // How many inputs grounded (blocked)
      pass_count: 0      // How many passed
    };
    
    // 373 Truth Rule - THE TEETH
    this.truthRule = {
      SHORT_MIN: 3,      // Minimum meaningful length
      SOLID_MIN: 0.373,  // Minimum structure score
      SIMPLE_MAX: 373    // Maximum complexity
    };
  }

  /**
   * ═══════════════════════════════════════════════════════════════
   * INITIALIZE - Start at BIRTH
   * ═══════════════════════════════════════════════════════════════
   */
  initialize() {
    console.log('\n');
    console.log('╔' + '═'.repeat(60) + '╗');
    console.log('║' + '  DHARMACHAKRA MASTER LOOP - INITIALIZING'.padEnd(60) + '║');
    console.log('╠' + '═'.repeat(60) + '╣');
    
    // Start at BIRTH spoke
    this.state.current_spoke = 0;
    this.state.initialized = true;
    
    // Activate wheel
    const wheelStatus = this.wheel.activate();
    
    // Activate coil
    const coilStatus = this.coil.activate();
    
    console.log('║' + '  Starting at: BIRTH (373Hz)'.padEnd(60) + '║');
    console.log('║' + '  Rotation: COUNTER-CLOCKWISE'.padEnd(60) + '║');
    console.log('║' + '  Mode: PULL (Wheel authorizes all)'.padEnd(60) + '║');
    console.log('║' + ''.padEnd(60) + '║');
    console.log('║' + '  373 TRUTH RULE ACTIVE:'.padEnd(60) + '║');
    console.log('║' + '    3 = SHORT (min meaningful length)'.padEnd(60) + '║');
    console.log('║' + '    7 = SOLID (min structure score 0.373)'.padEnd(60) + '║');
    console.log('║' + '    3 = SIMPLE (max complexity 373)'.padEnd(60) + '║');
    console.log('║' + ''.padEnd(60) + '║');
    console.log('║' + '  THE WHEEL IS MASTER. THE GRINDER WAITS.'.padEnd(60) + '║');
    console.log('╚' + '═'.repeat(60) + '╝');
    
    return {
      status: 'INITIALIZED',
      start_spoke: 'BIRTH',
      frequency: SACRED_FREQUENCIES.TRUTH_373,
      mode: 'PULL',
      message: 'Master Loop ready. All processes must pass through Wheel.'
    };
  }

  /**
   * ═══════════════════════════════════════════════════════════════
   * REQUEST AUTHORIZATION - Grinder must ask permission
   * ═══════════════════════════════════════════════════════════════
   */
  requestAuthorization(input) {
    if (!this.state.initialized) {
      this.initialize();
    }
    
    console.log('\n🔄 AUTHORIZATION REQUEST:');
    
    // Step 1: Check 373 Truth Rule FIRST
    const truthCheck = this.applyTruthRule(input);
    
    if (!truthCheck.passed) {
      console.log('   ❌ TRUTH RULE FAILED');
      console.log(`   Short: ${truthCheck.short ? 'PASS' : 'FAIL'}`);
      console.log(`   Solid: ${truthCheck.solid ? 'PASS' : 'FAIL'}`);
      console.log(`   Simple: ${truthCheck.simple ? 'PASS' : 'FAIL'}`);
      console.log('   🔻 GROUNDED - Input destroyed');
      
      this.state.ground_count++;
      
      return {
        authorized: false,
        reason: 'TRUTH_RULE_FAILURE',
        details: truthCheck,
        spoke: null,
        frequency: null,
        message: 'The Wheel grounds this input. It never reaches the Grinder.'
      };
    }
    
    // Step 2: Spin wheel to find spoke position
    const wheelResult = this.wheel.spin(input);
    const spoke = this.wheel.spokes[wheelResult.spoke.name.split('_')[0] === 'BIRTH' ? 0 : 
                                    wheelResult.spoke.name.split('_')[0] === 'GROWTH' ? 1 :
                                    wheelResult.spoke.name.split('_')[0] === 'PEAK' ? 2 :
                                    wheelResult.spoke.name.split('_')[0] === 'DECLINE' ? 3 :
                                    wheelResult.spoke.name.split('_')[0] === 'DEATH' ? 4 :
                                    wheelResult.spoke.name.split('_')[0] === 'VOID' ? 5 :
                                    wheelResult.spoke.name.split('_')[0] === 'REBIRTH' ? 6 : 7];
    
    // Step 3: Check frequency resonance
    const resonance = wheelResult.resonance.overall;
    
    if (resonance < 0.373) {
      console.log('   ❌ RESONANCE TOO LOW');
      console.log(`   Resonance: ${(resonance * 100).toFixed(1)}% (min: 37.3%)`);
      console.log('   🔻 GROUNDED - Low frequency match');
      
      this.state.ground_count++;
      
      return {
        authorized: false,
        reason: 'LOW_RESONANCE',
        resonance: resonance,
        spoke: wheelResult.spoke,
        message: 'The Wheel grounds this input. Frequency mismatch.'
      };
    }
    
    // Step 4: AUTHORIZE
    this.state.pass_count++;
    this.state.last_authorization = {
      timestamp: Date.now(),
      spoke: wheelResult.spoke,
      resonance: resonance,
      input_hash: this.hashInput(input)
    };
    
    console.log('   ✅ AUTHORIZED');
    console.log(`   Spoke: ${wheelResult.spoke.name}`);
    console.log(`   Frequency: ${wheelResult.spoke.frequency} Hz`);
    console.log(`   Resonance: ${(resonance * 100).toFixed(1)}%`);
    console.log(`   Element: ${wheelResult.spoke.element}`);
    
    return {
      authorized: true,
      spoke: wheelResult.spoke,
      ring: wheelResult.ring,
      resonance: resonance,
      karma: wheelResult.karma,
      frequency: wheelResult.spoke.frequency,
      message: 'Wheel authorizes. Grinder may proceed.'
    };
  }

  /**
   * ═══════════════════════════════════════════════════════════════
   * PROCESS - Full 8-spoke rotation with authorization
   * ═══════════════════════════════════════════════════════════════
   */
  process(input) {
    console.log('\n' + '═'.repeat(60));
    console.log('DHARMACHAKRA MASTER LOOP - PROCESS');
    console.log('═'.repeat(60));
    
    // Request authorization FIRST
    const auth = this.requestAuthorization(input);
    
    if (!auth.authorized) {
      return {
        status: 'GROUNDED',
        authorization: auth,
        processing: null,
        message: 'Input grounded by Wheel. Grinder never activated.'
      };
    }
    
    // Only NOW can the coil process
    console.log('\n🌀 COIL PROCESSING (Authorized by Wheel):');
    const coilResult = this.coil.rotate(input);
    
    return {
      status: 'PROCESSED',
      authorization: auth,
      processing: coilResult,
      message: 'Full 8-spoke rotation complete. Input processed through all spirals.'
    };
  }

  /**
   * ═══════════════════════════════════════════════════════════════
   * APPLY 373 TRUTH RULE - The Teeth
   * ═══════════════════════════════════════════════════════════════
   */
  applyTruthRule(input) {
    const str = this.stringify(input);
    
    const result = {
      passed: true,
      short: false,
      solid: false,
      simple: false,
      scores: {}
    };
    
    // SHORT: Min length 3
    result.scores.length = str.length;
    result.short = str.length >= this.truthRule.SHORT_MIN;
    if (!result.short) result.passed = false;
    
    // SOLID: Structure score >= 0.373
    result.scores.structure = this.measureStructure(str);
    result.solid = result.scores.structure >= this.truthRule.SOLID_MIN;
    if (!result.solid) result.passed = false;
    
    // SIMPLE: Complexity <= 373
    result.scores.complexity = str.length;
    result.simple = str.length <= this.truthRule.SIMPLE_MAX;
    // Note: SIMPLE is a soft check - warn but don't fail
    
    return result;
  }

  measureStructure(str) {
    if (!str || str.length === 0) return 0;
    
    let score = 0;
    
    // Has words
    const words = str.match(/[a-zA-Z]{3,}/g) || [];
    if (words.length >= 1) score += 0.2;
    if (words.length >= 3) score += 0.2;
    
    // Has structure markers
    if (/[\[\]{}":]/.test(str)) score += 0.2;
    
    // Has semantic content
    if (!/^[\W\d]+$/.test(str)) score += 0.2;
    
    // Not just noise
    const uniqueChars = new Set(str.toLowerCase()).size;
    const ratio = uniqueChars / str.length;
    if (ratio > 0.2 && ratio < 0.8) score += 0.2;
    
    return Math.min(1, score);
  }

  stringify(input) {
    if (input === null || input === undefined) return '';
    if (typeof input === 'object') return JSON.stringify(input);
    return String(input);
  }

  hashInput(input) {
    const str = this.stringify(input);
    let hash = 373;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  /**
   * Get state
   */
  getState() {
    return {
      master: {
        initialized: this.state.initialized,
        current_spoke: this.wheel.spokes[this.state.current_spoke]?.name || 'BIRTH',
        mode: 'PULL'
      },
      stats: {
        passed: this.state.pass_count,
        grounded: this.state.ground_count,
        total: this.state.pass_count + this.state.ground_count
      },
      last_authorization: this.state.last_authorization,
      message: 'THE WHEEL IS MASTER. ALL MUST PASS THROUGH.'
    };
  }
}

module.exports = { DharmachakraMaster };
