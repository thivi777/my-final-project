FROM node:20-slim

WORKDIR /app

# Install dependencies first (for better caching)
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NODE_ENV=production

# Expose the port (Railway handles this, but good practice)
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
