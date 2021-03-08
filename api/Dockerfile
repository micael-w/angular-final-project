# Starting point for our docker image
FROM mhart/alpine-node:14
WORKDIR /app

# Copy the dependency files into the image and run npm install
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the files
COPY . .

# Start the Express server
CMD ["npm", "start"]