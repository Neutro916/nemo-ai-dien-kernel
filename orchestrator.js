/**
 * MEGA COUNCIL ORCHESTRATOR
 * GCP-Ready Express + Socket.io
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { MegaCouncil } = require('./src/agents/mega_council');

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

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', project: CONFIG.PROJECT_ID, council: council.getStatus() });
});

app.get('/api/council/status', (req, res) => {
  res.json(council.getStatus());
});

app.post('/api/ai_dien/process', async (req, res) => {
  const result = await council.ai_dien.process(req.body);
  res.json({ success: true, result });
});

const council = new MegaCouncil({
  projectId: CONFIG.PROJECT_ID,
  vercelGateway: CONFIG.VERCEL_GATEWAY
});

server.listen(CONFIG.PORT, () => {
  console.log(`Mega Council Orchestrator v3.7.3 on port ${CONFIG.PORT}`);
  console.log(`Project: ${CONFIG.PROJECT_ID}`);
});