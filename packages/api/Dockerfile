FROM node:boron

# build file with PROD settings
ENV ENV "PROD"

# Create app directory
RUN mkdir -p /api
WORKDIR /api

# Install app dependencies
RUN npm install gulp -g
COPY package.json .
RUN npm install

# Bundle app source
COPY . .

RUN gulp compile
