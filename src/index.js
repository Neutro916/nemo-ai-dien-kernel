/**
 * NEMO Operating System - Main Entry Point
 * AI_DIEN Kernel + Mega Council Orchestration
 */

const { AI_DienOrchestrator } = require('./agents/ai_dien/orchestrator');
const { MegaCouncilRegistry } = require('./agents/mega_council/mega_council');

class NEMO_OS {
  constructor() {
    this.orchestrator = new AI_DienOrchestrator();
    this.registry = MegaCouncilRegistry;
    this.initialized = false;
  }

  async boot() {
    console.log('\n========================================');
    console.log('  NEMO OS v2.4.1 - BOOT SEQUENCE');
    console.log('  Frequency: 373-733-933 (2-4-1)');
    console.log('========================================\n');
    
    // Initialize orchestrator
    const status = await this.orchestrator.initialize();
    
    // Display Mega Council summary
    const summary = this.registry.getSummary();
    console.log('\n[Mega Council Registry]');
    console.log(`  Version: ${summary.version}`);
    console.log(`  Total Agents: ${summary.totalAgents}`);
    console.log(`  Active: ${summary.activeAgents}`);
    console.log(`  Tiers: FLIPPER_737(${summary.tiers.FLIPPER_737}), BRIDGE_767(${summary.tiers.BRIDGE_767}), SDR_ANTHENA_797(${summary.tiers.SDR_ANTHENA_797})`);
    
    this.initialized = true;
    console.log('\n========================================');
    console.log('  NEMO OS - OPERATIONAL');
    console.log('========================================\n');
    
    return status;
  }

  async executeCycle() {
    if (!this.initialized) {
      throw new Error('NEMO OS not initialized. Call boot() first.');
    }
    return await this.orchestrator.executeSequence();
  }

  getStatus() {
    return {
      os: { initialized: this.initialized, version: '2.4.1' },
      orchestrator: this.orchestrator.getStatus(),
      council: this.registry.getSummary()
    };
  }

  async shutdown() {
    console.log('\n[NEMO OS] Initiating shutdown...');
    await this.orchestrator.shutdown();
    this.initialized = false;
    console.log('[NEMO OS] Shutdown complete.\n');
  }
}

// HTTP Server for GCP/App Engine
const http = require('http');
const url = require('url');

const nemo = new NEMO_OS();
const PORT = process.env.PORT || 8080;

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-NEMO-Version', '2.4.1');
  
  try {
    switch (parsedUrl.pathname) {
      case '/health/live':
        res.writeHead(200);
        res.end(JSON.stringify({ status: 'ALIVE', pulse: Date.now() % 933 }));
        break;
        
      case '/health/ready':
        res.writeHead(nemo.initialized ? 200 : 503);
        res.end(JSON.stringify({ 
          status: nemo.initialized ? 'READY' : 'NOT_READY',
          agents: nemo.initialized ? nemo.orchestrator.agents.size : 0
        }));
        break;
        
      case '/status':
        res.writeHead(200);
        res.end(JSON.stringify(nemo.getStatus(), null, 2));
        break;
        
      case '/council':
        res.writeHead(200);
        res.end(JSON.stringify(nemo.registry.getAllAgents(), null, 2));
        break;
        
      case '/cycle':
        if (req.method === 'POST') {
          const result = await nemo.executeCycle();
          res.writeHead(200);
          res.end(JSON.stringify(result, null, 2));
        } else {
          res.writeHead(405);
          res.end(JSON.stringify({ error: 'Method not allowed' }));
        }
        break;
        
      default:
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
    }
  } catch (err) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: err.message }));
  }
});

// Boot and start server
(async () => {
  try {
    await nemo.boot();
    server.listen(PORT, () => {
      console.log(`[NEMO OS] Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('[NEMO OS] Boot failed:', err);
    process.exit(1);
  }
})();

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('[NEMO OS] SIGTERM received');
  server.close(async () => {
    await nemo.shutdown();
    process.exit(0);
  });
});

module.exports = { NEMO_OS };
