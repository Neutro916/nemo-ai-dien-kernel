# Deployment Guide

## 1. Deploy to GCP

### Prerequisites
```bash
gcloud auth login
gcloud config set project wide-maxim-487506-u1
gcloud app create --region=us-central1
```

### Deploy
```bash
gcloud app deploy app.yaml --quiet
```

### Verify
```bash
gcloud app browse
curl https://wide-maxim-487506-u1.uc.r.appspot.com/health
```

## 2. Connect to Conduit-UI

### Local Connection
```bash
node conduit-connector.js
```

### Environment Variables
```bash
set CONDUIT_URL=http://localhost:3000
set GCP_PROJECT_ID=wide-maxim-487506-u1
set VERCEL_GATEWAY_KEY=ai_dark916
```

## 3. API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | System health |
| `/api/council/status` | GET | 33-agent status |
| `/api/ai_dien/process` | POST | Process task |
| `/api/gordon/execute` | POST | UI automation |

## 4. GCP Services

Enable these APIs:
- App Engine Admin
- Cloud Build
- Cloud Logging
- Secret Manager

## 5. Troubleshooting

**Error: "Cannot connect to Conduit-UI"**
- Check Conduit-UI is running on port 3000
- Verify firewall allows port 3000

**Error: "gcloud app deploy failed"**
- Check app.yaml syntax
- Verify project ID
- Enable App Engine API