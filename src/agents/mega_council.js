/**
 * MEGA COUNCIL - 33 Agent Registration System
 * Paldintmore Tier Architecture: 737/767/797
 */

const { EventEmitter } = require('events');
const { AIDienAgent } = require('./ai_dien/kernel');

const AGENT_REGISTRY = {
  tier_737: {
    architects: [
      { id: 'arch_737_1', name: 'Foundation Architect', role: 'lead', api: 'google' },
      { id: 'arch_737_2', name: 'Flipper Architect', role: 'hardware', api: 'anthropic' },
      { id: 'arch_737_3', name: 'Ghost Architect', role: 'predictive', api: 'openai' }
    ],
    specialists: [
      { id: 'spec_737_1', name: 'RF Specialist', domain: 'radio_frequency', api: 'openrouter' },
      { id: 'spec_737_2', name: 'GPIO Specialist', domain: 'hardware_io', api: 'openrouter' },
      { id: 'spec_737_3', name: 'SubGHz Specialist', domain: 'sub_ghz', api: 'openrouter' }
    ],
    monks: [
      { id: 'monk_737_1', name: 'Scan Monk', function: 'spectrum_analysis' },
      { id: 'monk_737_2', name: 'Capture Monk', function: 'signal_capture' },
      { id: 'monk_737_3', name: 'Decode Monk', function: 'protocol_decode' },
      { id: 'monk_737_4', name: 'Replay Monk', function: 'signal_replay' },
      { id: 'monk_737_5', name: 'Badge Monk', function: 'badge_emulation' },
      { id: 'monk_737_6', name: 'NFC Monk', function: 'nfc_operations' },
      { id: 'monk_737_7', name: 'IR Monk', function: 'infrared_control' }
    ]
  },
  tier_767: {
    architects: [
      { id: 'arch_767_1', name: 'Bridge Architect', role: 'integration', api: 'google' },
      { id: 'arch_767_2', name: 'Protocol Architect', role: 'standards', api: 'anthropic' },
      { id: 'arch_767_3', name: 'Shadow Architect', role: 'ui_ux', api: 'openai' }
    ],
    specialists: [
      { id: 'spec_767_1', name: 'WebSerial Specialist', domain: 'browser_hardware', api: 'openrouter' },
      { id: 'spec_767_2', name: 'USB Specialist', domain: 'usb_protocols', api: 'openrouter' },
      { id: 'spec_767_3', name: 'BTLE Specialist', domain: 'bluetooth_le', api: 'openrouter' }
    ],
    monks: [
      { id: 'monk_767_1', name: 'Serial Monk', function: 'serial_bridge' },
      { id: 'monk_767_2', name: 'HID Monk', function: 'human_interface' },
      { id: 'monk_767_3', name: 'Storage Monk', function: 'mass_storage' },
      { id: 'monk_767_4', name: 'Network Monk', function: 'ethernet_bridge' },
      { id: 'monk_767_5', name: 'CAN Monk', function: 'can_bus' },
      { id: 'monk_767_6', name: 'Modbus Monk', function: 'industrial_io' },
      { id: 'monk_767_7', name: 'I2C Monk', function: 'i2c_operations' }
    ]
  },
  tier_797: {
    architects: [
      { id: 'arch_797_1', name: 'Signal Architect', role: 'sdr', api: 'google' },
      { id: 'arch_797_2', name: 'Wave Architect', role: 'em_spectrum', api: 'anthropic' },
      { id: 'arch_797_3', name: 'Monk Architect', role: 'deep_reasoning', api: 'openai' }
    ],
    specialists: [
      { id: 'spec_797_1', name: 'SDR Specialist', domain: 'software_defined_radio', api: 'openrouter' },
      { id: 'spec_797_2', name: 'DSP Specialist', domain: 'digital_signal_proc', api: 'openrouter' },
      { id: 'spec_797_3', name: 'Anthena Specialist', domain: 'anthena_sdk', api: 'openrouter' }
    ],
    monks: [
      { id: 'monk_797_1', name: 'Demod Monk', function: 'demodulation' },
      { id: 'monk_797_2', name: 'Mod Monk', function: 'modulation' },
      { id: 'monk_797_3', name: 'Filter Monk', function: 'filter_design' },
      { id: 'monk_797_4', name: 'FFT Monk', function: 'fourier_transform' },
      { id: 'monk_797_5', name: 'GPS Monk', function: 'gnss_operations' },
      { id: 'monk_797_6', name: 'Jam Monk', function: 'signal_jamming' },
      { id: 'monk_797_7', name: 'Ghost Monk', function: 'stealth_operations' }
    ]
  }
};

class MegaCouncil extends EventEmitter {
  constructor(config = {}) {
    super();
    this.config = {
      projectId: config.projectId || 'wide-maxim-487506-u1',
      vercelGateway: config.vercelGateway || 'ai_dark916',
      enableGCP: config.enableGCP !== false,
      ...config
    };
    this.agents = new Map();
    this.activeAgents = new Set();
    this.ai_dien = new AIDienAgent({ name: 'ai_dien', tier: 737 });
    this.registerAllAgents();
  }

  registerAllAgents() {
    Object.keys(AGENT_REGISTRY).forEach(tierKey => {
      const tier = AGENT_REGISTRY[tierKey];
      const tierNum = parseInt(tierKey.split('_')[1]);
      tier.architects.forEach(a => this.registerAgent({ ...a, tier: tierNum, class: 'architect' }));
      tier.specialists.forEach(a => this.registerAgent({ ...a, tier: tierNum, class: 'specialist' }));
      tier.monks.forEach(a => this.registerAgent({ ...a, tier: tierNum, class: 'monk' }));
    });
  }

  registerAgent(cfg) {
    const agent = { ...cfg, status: 'idle', registeredAt: Date.now(), taskCount: 0 };
    this.agents.set(cfg.id, agent);
    this.emit('agent:registered', { id: cfg.id, name: cfg.name });
  }

  getStatus() {
    return {
      total: this.agents.size,
      active: this.activeAgents.size,
      ai_dien: this.ai_dien.status()
    };
  }
}

module.exports = { MegaCouncil, AGENT_REGISTRY };