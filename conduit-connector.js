/**
 * CONDUIT-UI CONNECTOR
 * Bridges AI_DIEN kernel to Conduit-UI frontend
 */

const io = require('socket.io-client');
const { AIDienAgent } = require('./src/agents/ai_dien/kernel');

class ConduitConnector {
  constructor(config = {}) {
    this.conduitUrl = config.conduitUrl || 'http://localhost:3000';
    this.agent = new AIDienAgent({ tier: 737 });
    this.socket = null;
  }

  connect() {
    this.socket = io(this.conduitUrl);
    
    this.socket.on('connect', () => {
      console.log('✓ Connected to Conduit-UI');
      this.socket.emit('ai_dien:register', { tier: 737, status: 'active' });
    });

    this.socket.on('conduit:command', async (cmd) => {
      console.log('Command received:', cmd);
      const result = await this.agent.process(cmd);
      this.socket.emit('ai_dien:response', result);
    });

    this.socket.on('disconnect', () => {
      console.log('✗ Disconnected from Conduit-UI');
    });
  }

  disconnect() {
    if (this.socket) this.socket.disconnect();
  }
}

module.exports = { ConduitConnector };

// CLI
if (require.main === module) {
  const connector = new ConduitConnector();
  connector.connect();
}