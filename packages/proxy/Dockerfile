# Use an official Node.js runtime as the base image
FROM node:16.14.2

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json from the root folder to the working directory
COPY ../../package*.json .

# COPY ../../pnpm-lock*.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code from the microservice's folder into the container
COPY . .

# Compile TypeScript code
RUN pnpm run build

# Expose the port on which the Express app will run
EXPOSE 3001

# Define the command to start the Node.js application
CMD ["node", "dist/proxy/index.js"]
