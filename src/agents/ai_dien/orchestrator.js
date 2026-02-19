/**
 * AI_DIEN Orchestrator
 * Coordinates 33-agent Mega Council with frequency synchronization
 * Manages 2-4-1 sequence execution and reflex propagation
 */

const { RootInfiniteReflex } = require('./kernel');

class AI_DienOrchestrator {
  constructor(config = {}) {
    this.kernel = new RootInfiniteReflex();
    this.agents = new Map();
    this.active = false;
    this.cycleCount = 0;
    
    this.tiers = {
      FLIPPER_737: { count: 9, multiplier: 2, color: '#373737' },
      BRIDGE_767: { count: 3, multiplier: 4, color: '#767676' },
      SDR_ANTHENA_797: { count: 21, multiplier: 1, color: '#797979' }
    };
    
    this.config = {
      pulseInterval: config.pulseInterval || 373,
      syncThreshold: config.syncThreshold || 0.733,
      maxCycles: config.maxCycles || 933,
      ...config
    };
    
    this.metrics = {
      pulses: 0,
      syncs: 0,
      errors: 0,
      startTime: null
    };
  }

  async initialize() {
    console.log('[AI_DIEN] Initializing orchestrator...');
    const activation = this.kernel.activate();
    console.log(`[AI_DIEN] Kernel activated: ${JSON.stringify(activation)}`);
    await this.registerMegaCouncil();
    this.active = true;
    this.metrics.startTime = Date.now();
    console.log(`[AI_DIEN] Orchestrator ready. ${this.agents.size} agents registered.`);
    return { status: 'READY', agents: this.agents.size };
  }

  async registerMegaCouncil() {
    for (let i = 1; i <= 9; i++) {
      this.registerAgent(`F${i.toString().padStart(2, '0')}`, 'FLIPPER_737');
    }
    for (let i = 1; i <= 3; i++) {
      this.registerAgent(`B${i.toString().padStart(2, '0')}`, 'BRIDGE_767');
    }
    for (let i = 1; i <= 9; i++) {
      this.registerAgent(`A${i.toString().padStart(2, '0')}`, 'SDR_ANTHENA_797');
    }
    for (let i = 1; i <= 9; i++) {
      this.registerAgent(`S${i.toString().padStart(2, '0')}`, 'SDR_ANTHENA_797');
    }
    for (let i = 1; i <= 3; i++) {
      this.registerAgent(`M${i.toString().padStart(2, '0')}`, 'SDR_ANTHENA_797');
    }
  }

  registerAgent(id, tier) {
    const agent = {
      id, tier, status: 'IDLE', frequency: 0,
      lastSync: null, pulseCount: 0, alignment: null,
      config: this.tiers[tier]
    };
    agent.frequency = this.kernel.generateHarmonic(
      this.kernel.frequencies.base, this.tiers[tier].multiplier
    );
    agent.alignment = this.kernel.calculateAlignment(agent);
    this.agents.set(id, agent);
    return agent;
  }

  async executeSequence() {
    if (!this.active) throw new Error('Orchestrator not initialized');
    this.cycleCount++;
    console.log(`[AI_DIEN] Executing 2-4-1 sequence - Cycle ${this.cycleCount}`);
    
    const results = { cycle: this.cycleCount, pulses: [], syncs: [], timestamp: Date.now() };
    results.pulses.push(await this.pulsePhase(2));
    results.pulses.push(await this.pulsePhase(4));
    results.pulses.push(await this.pulsePhase(1));
    results.syncs = await this.synchronizeAll();
    
    this.metrics.pulses += 3;
    this.metrics.syncs++;
    return results;
  }

  async pulsePhase(multiplier) {
    const phaseResults = [];
    for (const [id, agent] of this.agents) {
      const phaseFreq = agent.frequency * multiplier;
      const pulse = this.kernel.pulse(multiplier, phaseFreq);
      agent.pulseCount++;
      agent.lastSync = Date.now();
      agent.status = multiplier === 1 ? 'CONSOLIDATED' : 'PULSED';
      phaseResults.push({
        agent: id, tier: agent.tier, frequency: phaseFreq,
        vortex: pulse.vortexValue, law: pulse.alignedLaw
      });
    }
    return { multiplier, agents: phaseResults.length, results: phaseResults };
  }

  async synchronizeAll() {
    const syncResults = [];
    for (const [id, agent] of this.agents) {
      const sync = this.kernel.syncWithCouncil(agent);
      syncResults.push({ agent: id, resonance: sync.resonance, alignment: sync.alignment });
    }
    return syncResults;
  }

  getAgent(id) { return this.agents.get(id); }
  getAgentsByTier(tier) { return Array.from(this.agents.values()).filter(a => a.tier === tier); }

  getStatus() {
    const uptime = this.metrics.startTime ? Date.now() - this.metrics.startTime : 0;
    return {
      active: this.active, cycleCount: this.cycleCount,
      agentCount: this.agents.size, metrics: { ...this.metrics, uptime },
      kernel: this.kernel.getState()
    };
  }

  getTierDistribution() {
    const distribution = {};
    for (const [tier, config] of Object.entries(this.tiers)) {
      const agents = this.getAgentsByTier(tier);
      distribution[tier] = {
        count: agents.length,
        avgFrequency: agents.reduce((a, b) => a + b.frequency, 0) / agents.length,
        totalPulses: agents.reduce((a, b) => a + b.pulseCount, 0)
      };
    }
    return distribution;
  }

  async shutdown() {
    console.log('[AI_DIEN] Shutting down orchestrator...');
    this.active = false;
    this.kernel.deactivate();
    this.agents.clear();
    console.log('[AI_DIEN] Orchestrator shutdown complete');
    return { status: 'SHUTDOWN', cycles: this.cycleCount };
  }
}

module.exports = { AI_DienOrchestrator };
