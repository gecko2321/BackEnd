class UserManager {
  static #users = [];
  create(data) {
    const user = {
      id:
        UserManager.#users.length === 0
          ? 1
          : UserManager.#users[UserManager.#users.length -1].id + 1,
      photo: data.photo,
      email: data.email,
      password: data.password,
      role: 0,
    };
    UserManager.#users.push(user);
    console.log("Usuario Creado");
  }
  read(){
    return UserManager.#users
  }
}

const gestorDeUsuarios = new UserManager()
gestorDeUsuarios.create({
    photo: "photo.png",
    email: "usuario1@hotmail.com",
    password: "12345678"
 })
//Crear un usuario mas
 gestorDeUsuarios.create({
     photo: "photo.png",
     email: "usuario2@hotmail.com",
     password: "12345678"
  })

console.log(gestorDeUsuarios.read())