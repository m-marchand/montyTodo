FROM node:10.1 as react-build
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install 
RUN npm run build
EXPOSE 3000
ENTRYPOINT npm start