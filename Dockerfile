FROM node
WORKDIR /app/src

COPY package*.json ./
COPY yarn.lock ./

COPY . .
RUN npm install
EXPOSE 8800
CMD [ "npm","start" ]