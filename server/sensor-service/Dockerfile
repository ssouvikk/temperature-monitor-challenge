# Use Node.js LTS version as base image
FROM node:20.11.1

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port (if needed)
EXPOSE 5001

# Start the sensor service
CMD ["node", "index.js"]
