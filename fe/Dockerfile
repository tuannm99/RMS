FROM node:16-alpine as build
WORKDIR /app

COPY /fe/package.json ./
COPY /fe/package-lock.json ./

RUN npm install

COPY /ui/. ./

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY /ui/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
