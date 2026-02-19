# Telegram Gateway Setup

## Quick Start

### 1. Create Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Send `/newbot`
3. Follow prompts to name your bot
4. **Save the BOT_TOKEN** (looks like: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 2. Set Environment Variable

```bash
# Linux/Mac
export TELEGRAM_BOT_TOKEN="your_token_here"

# Windows
set TELEGRAM_BOT_TOKEN=your_token_here

# Or create .env file
echo "TELEGRAM_BOT_TOKEN=your_token_here" > .env
```

### 3. Run Gateway

```bash
# Polling mode (development)
npm run telegram

# Or directly
node src/telegram-gateway.js
```

### 4. Test

Open Telegram, find your bot, send `/start`

---

## Production Setup (Webhook)

For Vercel/GCP deployment:

```bash
# Set webhook URL
export WEBHOOK_URL="https://your-domain.com/webhook"
export PORT=8443

node src/telegram-gateway.js
```

---

## Commands

| Command | Description |
|---------|-------------|
| `/start` | Initialize bot |
| `/status` | System status |
| `/freq [Hz]` | Set frequency (373, 528, 733, 767, 933, 963) |
| `/clear` | Clear session |
| `/help` | Show help |

---

## Frequencies

| Hz | Mode | Model |
|----|------|-------|
| 373 | Foundation/Safety | ShieldGemma |
| 528 | Therapeutic | TxGemma |
| 733 | Code/Structure | CodeGemma |
| 767 | Agentic/Bridge | FunctionGemma |
| 933 | Medical/Flow | MedGemma |
| 963 | Vision/Imaging | MedGemma |

---

## Architecture

```
Telegram App
     │
     ▼
Bot API (Polling/Webhook)
     │
     ▼
telegram-gateway.js
     │
     ▼
GemmaConnector
     │
     ▼
AI_DIEN Kernel (373Hz)
```

---

## Troubleshooting

**Bot not responding?**
- Check token is correct
- Verify network connectivity
- Check console for errors

**Polling issues?**
- Bot may have multiple instances running
- Kill all node processes and restart

**Need API key?**
- Get from @BotFather on Telegram

---

#NoGatekeeping