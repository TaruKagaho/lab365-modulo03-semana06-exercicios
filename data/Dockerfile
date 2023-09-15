FROM node:18

WORKDIR /minhapasta

COPY . .

# RUN npm install -g json-server
RUN npm install json-server

EXPOSE 3000

CMD ["json-server", "--watch", "db.json", "--host", "0.0.0.0", "--port", "3000"]