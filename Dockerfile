FROM node:examen

WORKDIR /nestjs-mysql-crud-app/src

COPY package.json .
RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]