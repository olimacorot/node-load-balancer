FROM node:21.0-alpine3.18


RUN mkdir -p /usr/app/node_modules && chown -R node:node /usr/app

WORKDIR /usr/app/

COPY ./package.json ./

USER node

RUN npm install

COPY --chown=node:node . .
