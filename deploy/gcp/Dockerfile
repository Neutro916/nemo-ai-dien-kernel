# NEMO AI_DIEN Kernel Container
# Frequency Foundation: 373-733-933

FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY src/ ./src/

# Environment
ENV NODE_ENV=production
ENV PORT=8080
ENV AI_DIEN_BASE_FREQ=373
ENV AI_DIEN_HARM_FREQ=733
ENV AI_DIEN_CARR_FREQ=933

# Non-root user
RUN addgroup -g 1001 -S nemo && \
    adduser -S ai_dien -u 1001
USER ai_dien

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "console.log('2-4-1 pulse check')" || exit 1

CMD ["node", "src/agents/ai_dien/orchestrator.js"]
