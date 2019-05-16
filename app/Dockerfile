FROM node:8-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

CMD [ "yarn", "dev" ]