FROM node:boron

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
RUN npm install gulp -g
COPY package.json .
RUN npm install

# Bundle app source
COPY . .

