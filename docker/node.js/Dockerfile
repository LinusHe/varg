FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "api.js"]
HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://192.168.99.101:1110/ || exit 1