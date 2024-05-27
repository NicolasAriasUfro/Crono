FROM node:22.1.0
#compiling the app
LABEL authors="Nicolas_Arias"
WORKDIR /app

COPY package*.json ./
COPY . .
CMD ["npm", "install"]


#running the app
EXPOSE 8080
RUN npm run lint
RUN npm run serve --fix