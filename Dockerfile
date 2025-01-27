# Use Node.js 22 as the base image
FROM node:22-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Build TypeScript
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the application from the compiled JavaScript in dist
CMD [ "node", "dist/server.js", "--env-file=.env" ]