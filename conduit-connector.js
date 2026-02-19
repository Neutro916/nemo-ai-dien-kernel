/**
 * Conduit-UI Connector
 * Bridges AI_DIEN kernel to Conduit-UI frontend
 */

const { AIDienAgent } = require('./src/agents/ai_dien/kernel');
const { MegaCouncil } = require('./src/agents/mega_council');

class ConduitConnector {
  constructor(io) {
    this.io = io;
    this.agent = new AIDienAgent({ tier: 737 });
    this.council = new MegaCouncil();
    this.setupHandlers();
  }

  setupHandlers() {
    this.io.on('connection', (socket) => {
      console.log('Conduit-UI connected:', socket.id);
      
      socket.emit('ai_dien:status', this.agent.status());
      socket.emit('council:status', this.council.getStatus());

      socket.on('ai_dien:process', (task) => {
        const result = this.agent.process(task);
        socket.emit('ai_dien:result', result);
      });

      socket.on('council:activate', (data) => {
        this.council.activateAgent(data.agentId, data.task);
        socket.emit('council:updated', this.council.getStatus());
      });

      socket.on('gordon:execute', async (data) => {
        const result = await this.council.executeGordon(
          data.capture, data.analysis, data.action
        );
        socket.emit('gordon:result', result);
      });
    });
  }
}

module.exports = { ConduitConnector };