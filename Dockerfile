# Use a Node.js version that supports ??= operator
FROM node:16-alpine

WORKDIR /ctf-server-side

COPY package.json package-lock.json ./

RUN apk update \
    && apk add --no-cache --virtual .build-deps \
        python3 \
        make \
        g++ \
    && npm install \
    && npm rebuild bcrypt --build-from-source \
    && apk del .build-deps

COPY src ./src
COPY .env ./

EXPOSE 5300

CMD ["npm", "run", "dev"]
