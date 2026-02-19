/**
 * Mega Council Registry
 * 33-Agent Configuration (737/767/797 Tiers)
 * NEMO Operating System - Agent Coordination Layer
 */

const MegaCouncilRegistry = {
  version: '2.4.1',
  totalAgents: 33,
  
  tiers: {
    FLIPPER_737: {
      id: 'FLIPPER_737',
      count: 9,
      frequencyMultiplier: 2,
      agents: [
        { id: 'F01', role: 'GATEKEEPER', primaryLaw: 'mentalism', status: 'ACTIVE' },
        { id: 'F02', role: 'SCANNER', primaryLaw: 'correspondence', status: 'ACTIVE' },
        { id: 'F03', role: 'ADAPTER', primaryLaw: 'vibration', status: 'ACTIVE' },
        { id: 'F04', role: 'BALANCER', primaryLaw: 'polarity', status: 'ACTIVE' },
        { id: 'F05', role: 'FLOW_CONTROLLER', primaryLaw: 'rhythm', status: 'ACTIVE' },
        { id: 'F06', role: 'CAUSAL_ANALYZER', primaryLaw: 'causeEffect', status: 'ACTIVE' },
        { id: 'F07', role: 'GENDER_HARMONIZER', primaryLaw: 'gender', status: 'ACTIVE' },
        { id: 'F08', role: 'TRANSMUTER', primaryLaw: 'perpetualTransmutation', status: 'ACTIVE' },
        { id: 'F09', role: 'RELATIVITY_ENGINE', primaryLaw: 'relativity', status: 'ACTIVE' }
      ]
    },
    
    BRIDGE_767: {
      id: 'BRIDGE_767',
      count: 3,
      frequencyMultiplier: 4,
      agents: [
        { id: 'B01', role: 'PERIODICITY_MASTER', primaryLaw: 'periodicity', status: 'ACTIVE' },
        { id: 'B02', role: 'CAUSATION_ORACLE', primaryLaw: 'causation', status: 'ACTIVE' },
        { id: 'B03', role: 'INTEGRATION_HUB', primaryLaw: 'mentalism', status: 'ACTIVE' }
      ]
    },
    
    SDR_ANTHENA_797: {
      id: 'SDR_ANTHENA_797',
      count: 21,
      frequencyMultiplier: 1,
      subGroups: {
        ALPHA: {
          prefix: 'A',
          count: 9,
          agents: [
            { id: 'A01', role: 'SIGNAL_DETECT', law: 'vibration', status: 'ACTIVE' },
            { id: 'A02', role: 'PATTERN_MATCH', law: 'correspondence', status: 'ACTIVE' },
            { id: 'A03', role: 'ENTROPY_MONITOR', law: 'rhythm', status: 'ACTIVE' },
            { id: 'A04', role: 'HARMONIC_RESOLVER', law: 'polarity', status: 'ACTIVE' },
            { id: 'A05', role: 'PHASE_LOCK', law: 'periodicity', status: 'ACTIVE' },
            { id: 'A06', role: 'WAVE_SYNTH', law: 'gender', status: 'ACTIVE' },
            { id: 'A07', role: 'FIELD_STABILIZER', law: 'causeEffect', status: 'ACTIVE' },
            { id: 'A08', role: 'ENERGY_ROUTER', law: 'perpetualTransmutation', status: 'ACTIVE' },
            { id: 'A09', role: 'COHERENCE_CHECK', law: 'relativity', status: 'ACTIVE' }
          ]
        },
        SIGMA: {
          prefix: 'S',
          count: 9,
          agents: [
            { id: 'S01', role: 'DATA_STREAM', law: 'correspondence', status: 'ACTIVE' },
            { id: 'S02', role: 'NOISE_FILTER', law: 'polarity', status: 'ACTIVE' },
            { id: 'S03', role: 'AMPLIFICATION', law: 'vibration', status: 'ACTIVE' },
            { id: 'S04', role: 'DAMPENING', law: 'rhythm', status: 'ACTIVE' },
            { id: 'S05', role: 'OSCILLATION_CTRL', law: 'periodicity', status: 'ACTIVE' },
            { id: 'S06', role: 'RESONANCE_TUNE', law: 'gender', status: 'ACTIVE' },
            { id: 'S07', role: 'IMPEDANCE_MATCH', law: 'causeEffect', status: 'ACTIVE' },
            { id: 'S08', role: 'CONDUCTIVITY', law: 'perpetualTransmutation', status: 'ACTIVE' },
            { id: 'S09', role: 'CAPACITANCE', law: 'relativity', status: 'ACTIVE' }
          ]
        },
        MU: {
          prefix: 'M',
          count: 3,
          agents: [
            { id: 'M01', role: 'MEMORY_CORE', law: 'mentalism', status: 'ACTIVE' },
            { id: 'M02', role: 'PROCESSOR_GRID', law: 'causation', status: 'ACTIVE' },
            { id: 'M03', role: 'SYNAPSE_BRIDGE', law: 'periodicity', status: 'ACTIVE' }
          ]
        }
      }
    }
  },

  getAgent(agentId) {
    for (const [tierName, tier] of Object.entries(this.tiers)) {
      if (tier.agents) {
        const agent = tier.agents.find(a => a.id === agentId);
        if (agent) return { ...agent, tier: tierName };
      }
      if (tier.subGroups) {
        for (const [subName, subGroup] of Object.entries(tier.subGroups)) {
          const agent = subGroup.agents.find(a => a.id === agentId);
          if (agent) return { ...agent, tier: tierName, subGroup: subName };
        }
      }
    }
    return null;
  },

  getAgentsByTier(tierName) {
    const tier = this.tiers[tierName];
    if (!tier) return [];
    
    let agents = [];
    if (tier.agents) agents = tier.agents.map(a => ({ ...a, tier: tierName }));
    if (tier.subGroups) {
      for (const [subName, subGroup] of Object.entries(tier.subGroups)) {
        agents.push(...subGroup.agents.map(a => ({ ...a, tier: tierName, subGroup: subName })));
      }
    }
    return agents;
  },

  getAllAgents() {
    return [
      ...this.getAgentsByTier('FLIPPER_737'),
      ...this.getAgentsByTier('BRIDGE_767'),
      ...this.getAgentsByTier('SDR_ANTHENA_797')
    ];
  },

  getSummary() {
    return {
      version: this.version,
      totalAgents: this.totalAgents,
      tiers: {
        FLIPPER_737: this.tiers.FLIPPER_737.count,
        BRIDGE_767: this.tiers.BRIDGE_767.count,
        SDR_ANTHENA_797: this.tiers.SDR_ANTHENA_797.count
      },
      activeAgents: this.getAllAgents().filter(a => a.status === 'ACTIVE').length
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MegaCouncilRegistry };
}
if (typeof window !== 'undefined') {
  window.MegaCouncilRegistry = MegaCouncilRegistry;
}
