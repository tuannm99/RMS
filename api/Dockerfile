FROM node:16-alpine

WORKDIR /rms-app

ENV NODE_ENV=development \
    ACCESS_TOKEN_SECRECT=as-secrect \
    REFRESH_TOKEN_SECRECT=rf-secrect \
    MONGO_USERNAME=userdeptrai \
    MONGO_PASSWORD=12345678 \
    MONGO_HOST=42.114.216.182 \
    MONGO_PORT=27017 \
    MONGO_DB_NAME=RMS 

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
