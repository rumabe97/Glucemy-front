# Build the app in image ‘builder’ (multi-stage builds)
FROM node:20 as builder

# Define working directory
WORKDIR /app

# Duplicate the package-lock.json and package.json prior to other files
COPY package*.json ./

# Duplicate all necessary files
COPY . .
# Set up project dependencies
RUN npm install

# Compile the Angular application
RUN npm run build --prod

# Use nginx server to deliver the application
FROM nginx:alpine

# Transfer the output of the build step
COPY --from=builder /app/dist/glucemy-front/ /usr/share/nginx/html

# Replace the default nginx configuration with the one provided by tiangolo/node-frontend
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
