/**
 * MEGA COUNCIL ORCHESTRATOR
 * GCP-Ready with Conduit-UI Integration
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { ConduitConnector } = require('./conduit-connector');

const CONFIG = {
  PORT: process.env.PORT || 8080,
  PROJECT_ID: process.env.GCP_PROJECT_ID || 'wide-maxim-487506-u1',
  VERCEL_GATEWAY: process.env.VERCEL_GATEWAY_KEY || 'ai_dark916'
};

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: Date.now(),
    project: CONFIG.PROJECT_ID
  });
});

// Conduit-UI WebSocket connector
const connector = new ConduitConnector(io);

server.listen(CONFIG.PORT, () => {
  console.log(`\n╔════════════════════════════════════════╗`);
  console.log(`║   AI_DIEN Orchestrator v3.7.3          ║`);
  console.log(`╠════════════════════════════════════════╣`);
  console.log(`║   Port: ${CONFIG.PORT.toString().padEnd(28)} ║`);
  console.log(`║   Project: ${CONFIG.PROJECT_ID.padEnd(25)} ║`);
  console.log(`║   Status: ${'ACTIVE'.padEnd(27)} ║`);
  console.log(`╚════════════════════════════════════════╝\n`);
});