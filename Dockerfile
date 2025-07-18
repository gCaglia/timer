# Base Image
FROM alpine:3.22

# System Dependencies
RUN apk update
RUN apk upgrade
RUN apk add npm

# Set up user
RUN adduser -D timer
USER timer

# Set up files
COPY --chown=timer:timer . .

# Prepare Application
RUN npm install
RUN npm run build

CMD ["npm", "run", "serve"]
