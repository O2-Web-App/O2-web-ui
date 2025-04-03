# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps --production

# Copy the rest of the application
COPY . .

# Build the Next.js app
RUN npm run build

# Start the app
CMD ["npm", "run", "start"]