# Choose one image to start from, and name it builder
FROM mhart/alpine-node:14 as builder
WORKDIR /app

# Install the angular cli
RUN npm install --global @angular/cli

# Copy the dependency files into the image and run npm install
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the files and build it
COPY . .
RUN ng build

# Start from a new image, this way we can leave stuff we don't need behind (e.g. node_modules)
FROM nginx:alpine

# Copy in our custom config and remove the default website
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*

# From our previous image (builder), copy the compiled output
COPY --from=builder /app/dist/angular-final-project /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
