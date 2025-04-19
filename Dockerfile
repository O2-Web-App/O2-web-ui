# Stage 1: Build the application
FROM node:18-alpine AS builder

# Install necessary dependencies
RUN apk add --no-cache libc6-compat

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps


# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create the production image
FROM node:18-alpine

# Install dumb-init for better process management
RUN apk add --no-cache dumb-init

# Create a non-root user
RUN adduser -D nextuser

# Set the working directory
WORKDIR /app

# Copy the public folder
COPY --chown=nextuser:nextuser --from=builder /app/public ./public

# Copy the standalone output from the build stage
COPY --chown=nextuser:nextuser --from=builder /app/.next/standalone ./

# Copy the static files
COPY --chown=nextuser:nextuser --from=builder /app/.next/static ./.next/static

# Switch to the non-root user
USER nextuser

# Expose the port
EXPOSE 3000

# Set environment variables
ENV HOST=0.0.0.0 PORT=3000 NODE_ENV=production

# Start the application
CMD ["dumb-init", "node", "server.js"]
