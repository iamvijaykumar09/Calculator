#Building React App
FROM node:alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build 

#Serving Using Nginx
FROM nginx:alpine 
COPY --from=build /app/build /usr/share/nginx/html 
EXPOSE 80