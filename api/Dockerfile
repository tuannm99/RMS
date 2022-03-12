FROM node:16-alpine

WORKDIR /rms-app

ENV NODE_ENV=development \
    SECRET=super-secret-key \
    MONGO_URL=mongodb://userdeptrai:12345678@rms-fpt.ddns.net:27017 \
    MONGO_DB_NAME=RMS \
    MONGO_DB_TEST=RMS_TEST

COPY /api/package*.json ./

RUN npm install

COPY /api/. .

EXPOSE 5000

CMD ["npm", "start"]
