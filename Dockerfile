# Simple and stable Dockerfile for Next.js
FROM node:18-alpine
# Install system dependencies
RUN apk add --no-cache libc6-compat wget
# Set working directory
WORKDIR /app
# Copy package files first (for better caching)
COPY package*.json ./
# Install dependencies (npm install is more forgiving than npm ci)
RUN npm install
# Copy all source files
COPY . .
# Build arguments for environment variables
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_SITE_NAME
ARG GHOST_URL
ARG GHOST_CONTENT_API_KEY
# Set environment variables
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL:-https://finarena.pl}
ENV NEXT_PUBLIC_SITE_NAME=${NEXT_PUBLIC_SITE_NAME:-Finarena}
ENV GHOST_URL=${GHOST_URL}
ENV GHOST_CONTENT_API_KEY=${GHOST_CONTENT_API_KEY}
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Build the application
RUN npm run build
# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# Change ownership of the app directory
RUN chown -R nextjs:nodejs /app
# Switch to non-root user
USER nextjs
# Expose port
EXPOSE 3000
# Set environment variables for runtime
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/api/health || exit 1
# Start the application (production mode)
CMD ["npm", "start"]