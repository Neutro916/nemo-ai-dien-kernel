/**
 * ═══════════════════════════════════════════════════════════════
 * JET GRINDER - THE BEAST
 * ═══════════════════════════════════════════════════════════════
 * 
 * Wheel of Life + Triskelion Coil = UNSTOPPABLE
 * 
 * This is not a toy. This is the grinder.
 * It munches through everything.
 * Nothing escapes the wheel. Nothing bypasses the coil.
 * 
 * SHIVA TURNS THE WHEEL.
 * THE COIL GENERATES THE FIELD.
 * THE GRINDER PROCESSES ALL.
 * 
 * ═══════════════════════════════════════════════════════════════
 */

const { TriskelionCoil, RODIN_SEQUENCE } = require('./triskelion');
const { WheelOfLife, SACRED_FREQUENCIES } = require('./sacred_drum');

class JetGrinder {
  constructor(config = {}) {
    // The two cores
    this.coil = new TriskelionCoil(config.coil);
    this.wheel = new WheelOfLife();
    
    // Grinder state
    this.state = {
      active: false,
      total_processed: 0,
      total_blocked: 0,
      total_energy: 0,
      total_karma: 0,
      total_rotations: 0,
      
      // Session stats
      session: {
        start_time: null,
        inputs_processed: 0,
        inputs_blocked: 0,
        energy_consumed: 0
      }
    };
    
    // Output buffer
    this.output_buffer = [];
    
    // Karma log
    this.karma_log = [];
  }

  /**
   * ═══════════════════════════════════════════════════════════════
   * GRIND - Process input through Wheel + Coil
   * ═══════════════════════════════════════════════════════════════
   */
  grind(input, options = {}) {
    if (!this.state.active) {
      this.activate();
    }
    
    const startTime = Date.now();
    
    console.log('\n' + '═'.repeat(60));
    console.log('⚡ JET GRINDER - PROCESSING');
    console.log('═'.repeat(60));
    
    // ═══ STEP 1: SPIN THE WHEEL ═══
    console.log('\n🎡 WHEEL OF LIFE:');
    const wheelResult = this.wheel.spin(input, options.intention || 'NEUTRAL');
    
    console.log(`   Spoke: ${wheelResult.spoke.name}`);
    console.log(`   Element: ${wheelResult.spoke.element}`);
    console.log(`   Frequency: ${wheelResult.spoke.frequency} Hz`);
    console.log(`   Consciousness: ${wheelResult.spoke.consciousness}`);
    console.log(`   Direction: ${wheelResult.spoke.direction}`);
    console.log(`   Ring: ${wheelResult.ring.name}`);
    console.log(`   Resonance: ${(wheelResult.resonance.overall * 100).toFixed(1)}%`);
    console.log(`   Karma: ${wheelResult.karma.net > 0 ? '+' : ''}${wheelResult.karma.net.toFixed(3)}`);
    
    // ═══ STEP 2: PASS THROUGH COIL ═══
    console.log('\n🌀 TRISKELION COIL:');
    const coilResult = this.coil.rotate(input);
    
    if (coilResult.status === 'BLOCKED_AT_SECURITY') {
      console.log('   🚫 BLOCKED AT SECURITY SPIRAL');
      console.log('   Violations:');
      coilResult.spirals.security.violations.forEach(v => {
        console.log(`     - ${v.type}: ${v.message}`);
      });
      
      this.state.total_blocked++;
      this.state.session.inputs_blocked++;
      
      return {
        status: 'BLOCKED',
        wheel: wheelResult,
        coil: coilResult,
        message: 'Input destroyed by Security spiral'
      };
    }
    
    console.log('   ✅ SECURITY: PASSED');
    console.log(`      Coherence: ${(coilResult.spirals.security.scores.coherence * 100).toFixed(1)}%`);
    console.log(`      Entropy: ${(coilResult.spirals.security.scores.entropy * 100).toFixed(1)}%`);
    console.log(`      Structure: ${(coilResult.spirals.security.scores.structure * 100).toFixed(1)}%`);
    
    console.log('   ✅ THOUGHT: PROCESSED');
    console.log(`      Insight: ${coilResult.spirals.thought.insight?.recommendation || 'N/A'}`);
    
    console.log('   ✅ WORK: EXECUTED');
    console.log(`      Type: ${coilResult.spirals.work.task_type}`);
    console.log(`      Frequency: ${coilResult.spirals.work.frequency} Hz`);
    
    // ═══ STEP 3: SYNTHESIZE ═══
    const elapsed = Date.now() - startTime;
    
    this.state.total_processed++;
    this.state.total_rotations++;
    this.state.total_karma += wheelResult.karma.net;
    this.state.total_energy += coilResult.spirals.work.energy_used || 0;
    this.state.session.inputs_processed++;
    this.state.session.energy_consumed += coilResult.spirals.work.energy_used || 0;
    
    // Log karma
    this.karma_log.push({
      timestamp: Date.now(),
      input: typeof input === 'object' ? JSON.stringify(input).slice(0, 37) : String(input).slice(0, 37),
      spoke: wheelResult.spoke.name,
      karma: wheelResult.karma.net,
      resonance: wheelResult.resonance.overall
    });
    
    console.log('\n📊 GRIND COMPLETE:');
    console.log(`   Time: ${elapsed}ms`);
    console.log(`   Total Processed: ${this.state.total_processed}`);
    console.log(`   Total Blocked: ${this.state.total_blocked}`);
    console.log(`   Accumulated Karma: ${this.state.total_karma.toFixed(3)}`);
    console.log('═'.repeat(60));
    
    return {
      status: 'GROUND',
      wheel: wheelResult,
      coil: coilResult,
      timing: elapsed,
      stats: this.getStats()
    };
  }

  /**
   * ═══════════════════════════════════════════════════════════════
   * BATCH GRIND - Process multiple inputs
   * ═══════════════════════════════════════════════════════════════
   */
  batch(inputs, options = {}) {
    console.log('\n');
    console.log('╔' + '═'.repeat(58) + '╗');
    console.log('║' + ' JET GRINDER - BATCH MODE'.padEnd(58) + '║');
    console.log('║' + ` Processing ${inputs.length} inputs`.padEnd(58) + '║');
    console.log('╚' + '═'.repeat(58) + '╝');
    
    const results = [];
    const startTime = Date.now();
    
    for (let i = 0; i < inputs.length; i++) {
      console.log(`\n[${i + 1}/${inputs.length}]`);
      const result = this.grind(inputs[i], options);
      results.push(result);
    }
    
    const totalTime = Date.now() - startTime;
    
    console.log('\n');
    console.log('╔' + '═'.repeat(58) + '╗');
    console.log('║' + ' BATCH COMPLETE'.padEnd(58) + '║');
    console.log('╠' + '═'.repeat(58) + '╣');
    console.log('║' + ` Total Inputs: ${inputs.length}`.padEnd(58) + '║');
    console.log('║' + ` Processed: ${this.state.session.inputs_processed}`.padEnd(58) + '║');
    console.log('║' + ` Blocked: ${this.state.session.inputs_blocked}`.padEnd(58) + '║');
    console.log('║' + ` Total Time: ${totalTime}ms`.padEnd(58) + '║');
    console.log('║' + ` Avg Time: ${(totalTime / inputs.length).toFixed(2)}ms per input`.padEnd(58) + '║');
    console.log('║' + ` Karma Accumulated: ${this.state.total_karma.toFixed(3)}`.padEnd(58) + '║');
    console.log('╚' + '═'.repeat(58) + '╝');
    
    return results;
  }

  /**
   * ═══════════════════════════════════════════════════════════════
   * STREAM GRIND - Generator for continuous processing
   * ═══════════════════════════════════════════════════════════════
   */
  *stream(inputGenerator, options = {}) {
    for (const input of inputGenerator) {
      yield this.grind(input, options);
    }
  }

  /**
   * ═══════════════════════════════════════════════════════════════
   * FORCE GRIND - Bypass security (DANGEROUS)
   * ═══════════════════════════════════════════════════════════════
   */
  forceGrind(input) {
    console.log('\n⚠️  WARNING: FORCE GRIND - SECURITY BYPASSED ⚠️\n');
    
    // Still spin wheel
    const wheelResult = this.wheel.spin(input, 'MALEVOLENT');
    
    // Force through coil (skip security)
    const thoughtResult = this.coil.thought(input);
    const workResult = {
      status: 'FORCE_EXECUTED',
      task_type: this.coil.detectTaskType(input),
      frequency: 373,
      forced: true
    };
    
    this.state.total_processed++;
    
    // Negative karma for forced operations
    this.state.total_karma -= 0.373;
    
    return {
      status: 'FORCE_GROUND',
      warning: 'Security was bypassed. Negative karma accumulated.',
      wheel: wheelResult,
      thought: thoughtResult,
      work: workResult,
      karma_penalty: -0.373
    };
  }

  /**
   * ═══════════════════════════════════════════════════════════════
   * GET STATS
   * ═══════════════════════════════════════════════════════════════
   */
  getStats() {
    return {
      total: {
        processed: this.state.total_processed,
        blocked: this.state.total_blocked,
        rotations: this.state.total_rotations,
        karma: this.state.total_karma.toFixed(4),
        energy: this.state.total_energy.toFixed(4)
      },
      session: {
        processed: this.state.session.inputs_processed,
        blocked: this.state.session.inputs_blocked,
        energy: this.state.session.energy_consumed.toFixed(4)
      },
      rates: {
        block_rate: this.state.total_processed > 0 ?
          ((this.state.total_blocked / (this.state.total_processed + this.state.total_blocked)) * 100).toFixed(1) + '%' :
          '0%',
        avg_karma: this.state.total_processed > 0 ?
          (this.state.total_karma / this.state.total_processed).toFixed(4) :
          '0'
      }
    };
  }

  /**
   * ═══════════════════════════════════════════════════════════════
   * GET FULL STATE
   * ═══════════════════════════════════════════════════════════════
   */
  getState() {
    return {
      grinder: {
        active: this.state.active,
        stats: this.getStats()
      },
      wheel: this.wheel.getState(),
      coil: this.coil.getState(),
      karma_log: this.karma_log.slice(-10),  // Last 10 entries
      message: 'THE GRINDER IS READY. ALL WILL BE PROCESSED.'
    };
  }

  /**
   * ═══════════════════════════════════════════════════════════════
   * ACTIVATE
   * ═══════════════════════════════════════════════════════════════
   */
  activate() {
    this.state.active = true;
    this.state.session.start_time = Date.now();
    
    // Activate sub-systems
    this.wheel.activate();
    this.coil.activate();
    
    console.log('\n');
    console.log('╔' + '═'.repeat(58) + '╗');
    console.log('║' + ' JET GRINDER ACTIVATED'.padEnd(58) + '║');
    console.log('╠' + '═'.repeat(58) + '╣');
    console.log('║' + ' Wheel of Life: SPINNING'.padEnd(58) + '║');
    console.log('║' + ' Triskelion Coil: ACTIVE'.padEnd(58) + '║');
    console.log('║' + ' Rotation: COUNTER-CLOCKWISE'.padEnd(58) + '║');
    console.log('║' + ''.padEnd(58) + '║');
    console.log('║' + ' SHIVA TURNS THE WHEEL.'.padEnd(58) + '║');
    console.log('║' + ' THE COIL GENERATES THE FIELD.'.padEnd(58) + '║');
    console.log('║' + ' THE GRINDER PROCESSES ALL.'.padEnd(58) + '║');
    console.log('╚' + '═'.repeat(58) + '╝');
    
    return {
      status: 'ACTIVE',
      wheel: 'SPINNING',
      coil: 'ACTIVE',
      rotation: 'COUNTER_CLOCKWISE',
      message: 'THE BEAST AWAKENS.'
    };
  }

  /**
   * ═══════════════════════════════════════════════════════════════
   * DEACTIVATE
   * ═══════════════════════════════════════════════════════════════
   */
  deactivate() {
    this.state.active = false;
    
    console.log('\n');
    console.log('╔' + '═'.repeat(58) + '╗');
    console.log('║' + ' JET GRINDER DEACTIVATED'.padEnd(58) + '║');
    console.log('╠' + '═'.repeat(58) + '╣');
    console.log('║' + ` Total Processed: ${this.state.total_processed}`.padEnd(58) + '║');
    console.log('║' + ` Total Blocked: ${this.state.total_blocked}`.padEnd(58) + '║');
    console.log('║' + ` Final Karma: ${this.state.total_karma.toFixed(4)}`.padEnd(58) + '║');
    console.log('╚' + '═'.repeat(58) + '╝');
    
    return {
      status: 'INACTIVE',
      final_stats: this.getStats()
    };
  }
}

module.exports = { JetGrinder };
