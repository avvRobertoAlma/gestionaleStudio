# Alpine-node is a lightweight image
# We are telling Docker that our image will be based on the image called alpine-node
FROM mhart/alpine-node:latest

# Taking advantage of image-layers caching
# Copying package.json file alone into a tmp folder
ADD package.json /tmp/package.json

## install dependencies in tmp folder

RUN cd /tmp && npm install

## Copy all installed dependencies in the new project directory

RUN mkdir -p /api && cp -a /tmp/node_modules /api/

# Set working directory

WORKDIR /api

# Copy all code into Working Directory

ADD . /api

## Expose the port 3001 where application runs

EXPOSE 3001

## Run npm start to run the server - use double quotes

CMD ["npm", "start"]

