FROM node:18 as construcao

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM nginx:alpine as final

COPY --from=construcao /app/dist/labschool-manager /usr/share/nginx/html

EXPOSE 80

