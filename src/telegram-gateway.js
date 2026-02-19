/**
 * Telegram Gateway for AI_DIEN Kernel
 * Mobile access point - 373Hz aligned
 * 
 * Setup:
 * 1. Create bot via @BotFather on Telegram
 * 2. Get BOT_TOKEN and set in .env
 * 3. Run: node src/telegram-gateway.js
 */

const https = require('https');
const http = require('http');
const { GemmaConnector } = require('./gemma-connector');

// Configuration
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
const WEBHOOK_URL = process.env.WEBHOOK_URL; // e.g., https://your-domain.com/webhook/telegram
const PORT = process.env.PORT || 8443;

// Initialize Gemma connector
const gemma = new GemmaConnector({
  useHuggingFace: true,
  useVertexAI: false
});

// Session storage (in-memory, use Redis for production)
const sessions = new Map();

class TelegramGateway {
  constructor() {
    this.baseUrl = `https://api.telegram.org/bot${BOT_TOKEN}`;
    this.polling = !WEBHOOK_URL;
    this.lastUpdateId = 0;
    this.frequency = 373;
    
    console.log('╔══════════════════════════════════════╗');
    console.log('║   TELEGRAM GATEWAY v3.7.3            ║');
    console.log('║   Frequency: 373Hz                   ║');
    console.log('║   Mode: ' + (this.polling ? 'POLLING' : 'WEBHOOK').padEnd(26) + '║');
    console.log('╚══════════════════════════════════════╝');
  }
  
  /**
   * Start the gateway
   */
  async start() {
    // Get bot info
    const me = await this.apiCall('getMe');
    if (!me.ok) {
      console.error('❌ Bot token invalid. Get token from @BotFather');
      process.exit(1);
    }
    
    console.log(`\n✓ Bot: @${me.result.username}`);
    console.log(`✓ Name: ${me.result.first_name}`);
    
    if (this.polling) {
      console.log('\n📡 Starting polling mode...');
      this.startPolling();
    } else {
      console.log('\n🌐 Setting webhook...');
      await this.setWebhook();
      this.startServer();
    }
  }
  
  /**
   * API call to Telegram
   */
  async apiCall(method, params = {}) {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/${method}`;
      const body = JSON.stringify(params);
      
      const req = https.request(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body)
        }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      });
      
      req.on('error', reject);
      req.write(body);
      req.end();
    });
  }
  
  /**
   * Start long polling
   */
  async startPolling() {
    console.log('✓ Polling started. Send message to your bot!\n');
    
    const poll = async () => {
      try {
        const updates = await this.apiCall('getUpdates', {
          offset: this.lastUpdateId + 1,
          timeout: 30,
          allowed_updates: ['message', 'callback_query']
        });
        
        if (updates.ok && updates.result.length > 0) {
          for (const update of updates.result) {
            this.lastUpdateId = update.update_id;
            await this.handleUpdate(update);
          }
        }
      } catch (err) {
        console.error('Poll error:', err.message);
      }
      
      // Continue polling
      setTimeout(poll, 100);
    };
    
    poll();
  }
  
  /**
   * Set webhook for production
   */
  async setWebhook() {
    const result = await this.apiCall('setWebhook', {
      url: `${WEBHOOK_URL}/${BOT_TOKEN}`
    });
    
    if (result.ok) {
      console.log('✓ Webhook set:', WEBHOOK_URL);
    } else {
      console.error('❌ Webhook failed:', result.description);
    }
  }
  
  /**
   * Start webhook server
   */
  startServer() {
    const server = http.createServer(async (req, res) => {
      if (req.url === `/webhook/${BOT_TOKEN}` && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
          try {
            const update = JSON.parse(body);
            await this.handleUpdate(update);
            res.writeHead(200);
            res.end('OK');
          } catch (err) {
            res.writeHead(500);
            res.end('Error');
          }
        });
      } else {
        res.writeHead(404);
        res.end('Not found');
      }
    });
    
    server.listen(PORT, () => {
      console.log(`✓ Webhook server on port ${PORT}`);
    });
  }
  
  /**
   * Handle incoming update
   */
  async handleUpdate(update) {
    const message = update.message || update.callback_query?.message;
    const chatId = message?.chat?.id;
    const userId = message?.from?.id;
    
    if (!message || !chatId) return;
    
    // Get or create session
    let session = sessions.get(userId) || {
      userId,
      chatId,
      frequency: 373,
      context: [],
      createdAt: Date.now()
    };
    
    // Get message text
    const text = update.message?.text || update.callback_query?.data || '';
    
    if (!text) return;
    
    console.log(`📥 [${userId}] ${text.substring(0, 50)}...`);
    
    // Handle commands
    if (text.startsWith('/')) {
      await this.handleCommand(chatId, text, session);
      sessions.set(userId, session);
      return;
    }
    
    // Add to context
    session.context.push({ role: 'user', content: text, time: Date.now() });
    
    // Keep last 10 messages
    if (session.context.length > 10) {
      session.context = session.context.slice(-10);
    }
    
    // Show typing
    await this.apiCall('sendChatAction', { chat_id: chatId, action: 'typing' });
    
    // Process through Gemma
    try {
      const response = await this.processWithGemma(text, session);
      
      // Send response
      await this.sendMessage(chatId, response, session);
      
      // Update session
      session.context.push({ role: 'assistant', content: response, time: Date.now() });
      sessions.set(userId, session);
      
    } catch (err) {
      console.error('Process error:', err.message);
      await this.sendMessage(chatId, '⚠️ Processing error. Maintaining 373Hz.', session);
    }
  }
  
  /**
   * Handle commands
   */
  async handleCommand(chatId, cmd, session) {
    const command = cmd.toLowerCase().trim();
    
    const commands = {
      '/start': async () => {
        return `╔════════════════════════════════════╗
║   AI_DIEN TELEGRAM GATEWAY        ║
║   Kernel v3.7.3 | 373Hz           ║
╚════════════════════════════════════╝

Welcome to NEMO Mobile Access.

Commands:
/status - System status
/freq [Hz] - Set frequency
/clear - Clear session
/help - Show help

Just send a message to interact!`;
      },
      
      '/status': async () => {
        const gemmaStatus = gemma.getStatus();
        return `📊 AI_DIEN STATUS

├─ Kernel: v3.7.3
├─ Frequency: ${session.frequency}Hz
├─ Session: ${session.context.length} messages
├─ Models: ${gemmaStatus.modelsAvailable}
└─ Uptime: ${Math.round((Date.now() - session.createdAt) / 1000)}s`;
      },
      
      '/freq': async () => {
        const parts = cmd.split(' ');
        const hz = parseInt(parts[1]);
        
        if ([373, 528, 733, 767, 933, 963].includes(hz)) {
          session.frequency = hz;
          return `✓ Frequency set to ${hz}Hz\n${this.getFrequencyInfo(hz)}`;
        }
        
        return `Frequencies:
• 373 - Foundation/Safety
• 528 - DNA/Therapeutic
• 733 - Structure/Code
• 767 - Bridge/Agentic
• 933 - Flow/Medical
• 963 - Vision/Imaging`;
      },
      
      '/clear': async () => {
        session.context = [];
        return '✓ Session cleared. Fresh 373Hz baseline.';
      },
      
      '/help': async () => {
        return `AI_DIEN Help:

/start - Initialize
/status - Check system
/freq [Hz] - Change frequency mode
/clear - Reset session

Send any message to interact with the kernel.`;
      }
    };
    
    const handler = commands[command.split(' ')[0]] || commands['/help'];
    const response = await handler();
    
    await this.sendMessage(chatId, response, session);
  }
  
  /**
   * Process message through Gemma
   */
  async processWithGemma(text, session) {
    // Route based on frequency
    const task = {
      input: text,
      frequency: session.frequency,
      context: session.context.slice(-5)
    };
    
    // Try Gemma connector
    try {
      const result = await gemma.route(task);
      
      if (result?.result?.status === 'mock_success') {
        // Mock mode - generate contextual response
        return this.generateResponse(text, session);
      }
      
      return result?.result || this.generateResponse(text, session);
      
    } catch (err) {
      // Fallback to local response
      return this.generateResponse(text, session);
    }
  }
  
  /**
   * Generate response (local fallback)
   */
  generateResponse(text, session) {
    const freq = session.frequency;
    const lower = text.toLowerCase();
    
    // Frequency-aligned responses
    const responses = {
      373: {
        greeting: '373Hz Foundation acknowledged. How may I assist?',
        status: 'System stable at 373Hz. Truth filter active.',
        help: 'I operate on 373Hz foundation frequency. Ask me anything.',
        default: `Processing at 373Hz: "${text.substring(0, 30)}..."\n\nAwaiting further input. Coherence maintained.`
      },
      733: {
        greeting: '733Hz Code mode active. Ready for development tasks.',
        status: 'CodeGemma alignment ready. Structure frequency engaged.',
        default: `Code analysis at 733Hz:\n\n"${text.substring(0, 50)}..."\n\nSpecify language or framework for detailed assistance.`
      },
      933: {
        greeting: '933Hz Flow mode. Medical imaging alignment ready.',
        default: `Flow processing at 933Hz. Describe the imaging task.`
      }
    };
    
    const mode = responses[freq] || responses[373];
    
    if (lower.match(/^(hi|hello|hey)/)) return mode.greeting;
    if (lower.match(/status/)) return mode.status;
    if (lower.match(/help/)) return mode.help;
    
    return mode.default;
  }
  
  /**
   * Get frequency info
   */
  getFrequencyInfo(hz) {
    const info = {
      373: 'Foundation | ShieldGemma | Safety',
      528: 'Transformation | TxGemma | Therapeutic',
      733: 'Structure | CodeGemma | Development',
      767: 'Bridge | FunctionGemma | Agentic',
      933: 'Flow | MedGemma | Medical',
      963: 'Vision | MedGemma | Imaging'
    };
    return info[hz] || 'Unknown frequency';
  }
  
  /**
   * Send message to Telegram
   */
  async sendMessage(chatId, text, session) {
    // Add frequency signature
    const signature = `\n\n— ${session.frequency}Hz`;
    const fullText = text + signature;
    
    return this.apiCall('sendMessage', {
      chat_id: chatId,
      text: fullText.substring(0, 4096), // Telegram limit
      parse_mode: 'HTML'
    });
  }
}

// Export
module.exports = { TelegramGateway };

// CLI
if (require.main === module) {
  const gateway = new TelegramGateway();
  gateway.start();
}