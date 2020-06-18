FROM node:12
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
# Bundle app source
COPY . /usr/src/app
# run api
CMD ["node", "api.js"]
HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f https://sam.imn.htwk-leipzig.de:7070/ || exit 1
