FROM node:20-alpine

WORKDIR /ctf-server

COPY package.json package-lock.json ./

RUN npm install

COPY src ./src
COPY .env ./

EXPOSE 5300

CMD ["npm", "run", "dev"]
