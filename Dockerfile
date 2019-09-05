FROM node:8.10.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . . 
RUN npm install
EXPOSE 3000
CMD ["npm","start"]
