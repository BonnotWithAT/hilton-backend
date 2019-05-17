FROM node:8-alpine

RUN mkdir -p /api
WORKDIR /api

COPY ./package.json ./yarn.lock ./
RUN yarn install

COPY . .

RUN yarn global add nodemon

CMD [ "nodemon", "index.js" ]