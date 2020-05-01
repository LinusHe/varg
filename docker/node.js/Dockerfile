FROM node:8
COPY package*.json ./
RUN npm install mysql
RUN npm install express
RUN npm install
CMD ["npm", "start"]