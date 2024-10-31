# Using an official Node.js runtime as a parent image
FROM node:14

# Seting the working directory in the container
WORKDIR /app

# Coping package.json and package-lock.json
COPY package*.json ./

# Installing dependencies
RUN npm install

# Coping the rest of your application code
COPY . .

# Exposing the port the app runs on
EXPOSE 3000

# Runing the app
CMD [ "node", "index.js" ]