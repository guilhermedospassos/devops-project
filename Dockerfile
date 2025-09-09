# ---- Estágio de Build ----
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# ---- Estágio Final ----
FROM node:18-alpine
WORKDIR /app
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
COPY package*.json ./
RUN npm ci --only=production --prefer-offline && npm cache clean --force
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public
RUN chown -R nodejs:nodejs /app
USER nodejs
EXPOSE 10000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 10000) + '/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"
CMD ["npm", "start"]