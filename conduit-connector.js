/**
 * Conduit-UI Connector for AI_DIEN Kernel
 * Bridges NEMO Conduit to AI_DIEN Mega Council
 */

const { AIDienAgent, MegaCouncil } = require('./src/agents/mega_council');

class ConduitConnector {
  constructor(config = {}) {
    this.config = {
      conduitUrl: config.conduitUrl || 'http://localhost:3000',
      apiKey: config.apiKey || process.env.CONDUIT_API_KEY,
      enableHeartbeat: config.enableHeartbeat !== false,
      heartbeatInterval: config.heartbeatInterval || 30000,
      ...config
    };
    
    this.agent = new AIDienAgent({ tier: 737 });
    this.council = new MegaCouncil();
    this.connected = false;
    this.socket = null;
  }

  async connect() {
    console.log('═══ Connecting to Conduit-UI ═══');
    console.log(`Conduit URL: ${this.config.conduitUrl}`);
    
    try {
      // Test connection
      const response = await fetch(`${this.config.conduitUrl}/api/health`);
      if (response.ok) {
        this.connected = true;
        console.log('✓ Connected to Conduit-UI');
        
        // Register with Conduit
        await this.registerWithConduit();
        
        // Start heartbeat
        if (this.config.enableHeartbeat) {
          this.startHeartbeat();
        }
        
        return true;
      }
    } catch (err) {
      console.log('⚠ Conduit-UI not available, running standalone');
      return false;
    }
  }

  async registerWithConduit() {
    const registration = {
      name: 'ai_dien',
      version: '3.7.3',
      capabilities: ['docker_mayhem', 'frequency_analysis', 'root_reflex'],
      endpoints: {
        health: '/health',
        process: '/api/ai_dien/process',
        status: '/api/council/status'
      }
    };
    
    try {
      await fetch(`${this.config.conduitUrl}/api/agents/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registration)
      });
      console.log('✓ Registered with Conduit-UI');
    } catch (err) {
      console.log('⚠ Registration failed:', err.message);
    }
  }

  startHeartbeat() {
    setInterval(async () => {
      if (!this.connected) return;
      
      try {
        const status = this.agent.status();
        await fetch(`${this.config.conduitUrl}/api/agents/ai_dien/heartbeat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp: Date.now(),
            status: status,
            coherence: status.kernel.coherence
          })
        });
      } catch (err) {
        this.connected = false;
        console.log('⚠ Heartbeat failed, reconnecting...');
        this.connect();
      }
    }, this.config.heartbeatInterval);
  }

  async processConduitTask(task) {
    console.log(`📥 Task from Conduit: ${task.type}`);
    
    // Process through AI_DIEN
    const result = await this.agent.process({
      type: task.type,
      data: task.data,
      priority: task.priority || 5
    });
    
    console.log(`📤 Result: coherence=${result.coherence.toFixed(4)}`);
    
    return result;
  }

  getStatus() {
    return {
      connected: this.connected,
      agent: this.agent.status(),
      council: this.council.getStatus()
    };
  }
}

module.exports = { ConduitConnector };

// CLI
if (require.main === module) {
  const connector = new ConduitConnector();
  connector.connect().then(() => {
    console.log('\n═══ AI_DIEN Conduit Connector Ready ═══');
    console.log('Status:', JSON.stringify(connector.getStatus(), null, 2));
  });
}