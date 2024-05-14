# BackEnd

Repositorio para el curso de BackEnd de CoderHouse

# Sprint1

- Creacion de clases ProductManager y UserManager en memoria

# Sprint2

- Modificacion de clases ProductManager y UserManager
- Creacion de clases ProductManager y UserManager en filesystem
- Los archivos se crean en el path /data/files

# Sprint3

- Modificacion de clases ProductManager y UserManager para permitir el filtrado por categoria y rol
- Instalacion de express y nodemon
- Creacion de .gitignore e inclusion de node_modules
- Creacion de server.js con los parametros del server y rutas con sus metodos

# Challenge 1

- Modificacion Products y Users Manager para agregar el metodo update
- Se instala Morgan
- Se agregan routers
- Se agregan middlewares para errorHandler
- Se agregan middlewares para pathHandler
- Se reestructura el arbol de la app segun directorios especificados

# Sprint4

- Se instala express-handlebars
- Se instala socket.io
- Se generan las hbs (main, index, products,productsDetail,productsReal,users,usersDetail y usersRegister) utilizando como base un sitio web previamente generado en el curso de frontend (con bootstrap)
- Se aplican los metodos de socket emit() y on() para la comunicacion entre el servidor y el cliente (envio y recibo nuevos productos/usuarios y refresco online de prodductos)

# Sprint5

- Se instala mongoose
- Se crean los modelos de documentos para llenar la DB
- Se crean los managers de products, users y carts para gestionar la DB "ceramicagloria" en MongoDB

# Challenge 2

- Se instala mongoose-paginate-v2
- Se agrega el icono del carrito y se pagina la visual del carrito
- Se incorpora el metodo aggregate y paginate al manager de mongo
- Se utiliza el metodo populate para referenciar al producto y al usuario en el carrito
- Se agregan los botones anterior y siguiente en la paginacion del carrito
- Se agrega el boton eliminar producto del carrito
- Se agrega vista de registros de usuario (funcional) y login de usuario
- Se agrega el boton finalizar compra que genera un documento en la coleccion tickets con el total de la compra y id de usuario que compra
- Y mucho mas

# Sprint6

- Se instala cookies y sessions
- Se configura el inicio de sesion y registro de usuarios
- Se establece el storage en mongo de las sessions
- Se condiciona la visualizacion de botones del navbar segun el estado online del usuario
- Se pueden cargar nuevos productos si el usuario tiene ROL = 1
- Está paginada la vista cart de articulos de un usuario
- Se utiliza la variable _id del usuario que inicio session para gestionar el carrito, etc
- Haciendo login con el usuario ricardo.moreno@prueba.com/12345678 se puede ingresar al carrito, agregar productos, etc