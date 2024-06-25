FROM node:20

WORKDIR /ctf-server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5300

CMD ["npm", "run", "dev"]
