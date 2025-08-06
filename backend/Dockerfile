FROM node:22-alpine

ENV MONGO_DB_HOST=mongo MONGO_DB_USERNAME=admin MONGO_DB_PASSWORD=password MONGO_DB_PORT=27018 

RUN mkdir -p /home/app

WORKDIR /home/app

COPY . /home/app

RUN mkdir -p uploads && chmod -R 755 uploads

CMD ["node", "/home/app/server.js"]

