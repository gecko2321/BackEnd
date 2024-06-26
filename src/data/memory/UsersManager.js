class UserManager {
  static #users = [];
  create(data) {
    try {
      const user = {
        id:
          UserManager.#users.length === 0
            ? 1
            : UserManager.#users[UserManager.#users.length - 1].id + 1,
        photo:
          data.photo ||
          "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
        email: data.email,
        password: data.password,
        role: data.role || 0,
      };
      UserManager.#users.push(user);
      console.log("Usuario Creado");
    } catch (error) {
      console.log(error);
    }
  }
  read() {
    try {
      return UserManager.#users;
    } catch (error) {
      console.log(error);
    }
  }

  readOne(id) {
    try {
      const one = UserManager.#users.find((each) => each.id === id);
      if (!one) {
        throw new Error("NO EXISTE EL USUARIO");
      } else {
        return one;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async update(id, data) {
    try {
      let all = await this.read();
      let one = all.find((each) => each.id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        return one;
      } else {
        const error = new Error("Not Found!!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }
  destroy(id) {
    try {
      this.readOne(id);

      const within = UserManager.#users.filter((each) => each.id !== id);
      UserManager.#users = within;
      console.log("Usuario Eliminado");
    } catch (error) {
      console.log(error);
    }
  }
}

const gestorDeUsuarios = new UserManager();
gestorDeUsuarios.create({
  photo: "photo.png",
  email: "usuario1@hotmail.com",
  password: "12345678",
  role: "DBA",
});
gestorDeUsuarios.create({
  photo: "photo.png",
  email: "usuario2@hotmail.com",
  password: "12345678",
  role: "DBA",
});
gestorDeUsuarios.create({
  photo: "photo.png",
  email: "usuario3@hotmail.com",
  password: "12345678",
  role: "DBA",
});
gestorDeUsuarios.create({
  photo: "photo.png",
  email: "usuario4@hotmail.com",
  password: "12345678",
  role: "DBA",
});

console.log(gestorDeUsuarios.read());
console.log(gestorDeUsuarios.readOne(2));
gestorDeUsuarios.destroy(2);
console.log(gestorDeUsuarios.readOne(2));
