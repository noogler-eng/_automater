FROM node:18

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install --production

COPY . .

RUN tsc -b

# Expose the application port (adjust if necessary)
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/index.js"]
