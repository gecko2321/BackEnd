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

# Sprint7

- Se instala el modulo passport
- Se instala el modulo bcrypt
- Se utilizan las estrategias de passport y el modulo bcrypt para hashear el password y crear registro de usuarios y login
- Se condiciona el navbar para que responda segun exista un usuario logueado o no mediante el endpoint sesions/online
- Haciendo login con el usuario ricardo.moreno@prueba.com/12345678 se puede ingresar al carrito, agregar productos, etc

# Sprint8

- Se instala y aplica jsonwebtoken
- Se modifica la session para que utilice jwt en cookie en lugar de la tabla de mongo
- Se aplica el custom router
- Se normalizan las respuestas mediante el custom router
- Se aplican las politicas de autenticacion/autorizacion mediante custom router
- Se finaliza el endpoint /api/tickets para insrtar el total d la compra en la coleccion tickets de mongo
- Se finaliza el endpoint /api/carts/all para eliminar todos los productos del carrito del usuario logueado

# Sprint9

- Se implementa la division de capas MVC
- Controllers - Services
- Se utilizan variables de entorno parametrizables en el archivo env.dev y env.prod
- Se instalan librerias vite - angular - cors aunque no las voy a utilizar, ya que uso handlebars

# Challenge 3

- Se definen servicios, controladores y repositorios
- Se parametrizan los scripts npm run start (produccion) npm run dev (desa mongo), npm run devfs (desa fs) y npm run devmem (desa memoria) todos con el puerto 8080
- Se instala el modulo nodemailer y se desarrolla la solucion para que al registrar un usuario se le envie un mail con un codigo de verificacion
- Se genera la vista handlebars para verificar dicho codigo
- Se implementa dao para pivotear las persistencias

# Sprint10

- Se implementa mocks. 1000 articulos y 20 users en devs
- Se implementa brotli
- Se pagina y ordena la renderizacion de productos

# Sprint11

- Implementacion de Winston para loggear errores
- Se parametriza un logger para loggear eventos en consola y file en produccion y un loggerdev para loggear eventos en consola en desarrollo
- Los distintos loggers se utilizan segun el parametro env
- Se genera el endpoint api/loggers para probar

# Sprint14

- Instalacion y configuracion de Swagger para todos los endpoints y cruds
- Instalacion de CHAI
- Instalacion de MOCHA
- Instalacion de SUPERTEST
- Configuracion Artillery (Simplex - Complex - Flow)

# Sprint15 - Entrega Final

- Se agrega el rol de usuario PREM = 2 a las policies de autenticacion
- Se configura lo necesario para que el usuario PREM pueda gestionar sus productos y comprar los del resto
- Se agrega el campo supplier_id al modelo product y se referencia con el id del usuario proveedor
- Se implementa meddleware para validar los permisos que corresponden segun rol
- El admin no puede comprar productos
- Un user comun puede ver y comprar todos los productos
- Se agregó la opcion de re-establecer el password
- Se configuró stripe como pasarela de pagos
    
    -  Para probar la funcionalidad del sitio:
      -  Usuario ADMIN: gecko_2321@hotmail.com
      -  Usuario PREM: Quentin.Doyle@example.net
      -  Usuario Comun: Clemens.Nolan@example.net
      -  Password default para todos los usuarios: Password1
