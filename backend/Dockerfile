FROM node:22-alpine

ENV MONGO_DB_HOST=mongo MONGO_DB_USERNAME=admin MONGO_DB_PASSWORD=password MONGO_DB_PORT=27018 

RUN mkdir -p /home/app

COPY . /home/app

CMD ["node", "/home/app/server.js"]

