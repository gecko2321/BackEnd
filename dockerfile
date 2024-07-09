#definir que tipo de aplciacion vamos a construir
FROM node:20.15.0

#definir el nombre y donde se guarda el proyecto o imagen
WORKDIR /ceramicagloria

#copiar el package.json hacia el contenedor desde el servidor local
COPY package*.json ./

#instalar los paquetes del json
RUN npm install

#copiar el resto de la app
COPY . .

#indicar el puerto de exposicion de nuestra app (es el puerto donde va a correr el contenedor)
EXPOSE 8080

#configurar el comando de inicializacion de la app
CMD [ "npm","run","start" ]
#CMD [ "npm","run","dev" ]