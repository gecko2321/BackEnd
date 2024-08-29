import crypto from "crypto"

class UserManager {
  static #users = [];
  async create(data) {
    try {
      // const one = {
      //   id: crypto.randomBytes(12).toString("hex"),
      //   photo:
      //     data.photo ||
      //     "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
      //   email: data.email,
      //   password: data.password,
      //   role: data.role || 0,
      //   age: data.age || 18
      // };
      UserManager.#users.push(data);
      return(data)
    } catch (error) {
      console.log(error);
    }
  }
  async read(opts) {
    try {
      let all = UserManager.#users;      
      if (opts && opts.category) {
        all = users.filter(user => user.category === opts.category);
      }
      return all;
    } catch (error) {
      console.log(error);
    }
  }
  async readOne(id) {
    try {
      const one = UserManager.#users.find((each) => each.id === id);
      if (!one) {
        throw new Error("NO EXISTE EL USUARIO");
      } else {
        return one;
      }
    } catch (error) {
      console.log(error);
      throw error      
    }
  }
  async readByEmail(email) {
    try {
      const one = UserManager.#users.find(user => user.email === email);
      if (!one) {
        throw new Error("NO EXISTE EL USUARIO");
      }
      return one;
    } catch (error) {
      throw error;
    }
  }
  async paginate({ filter, options }) {
    try {
      let users = UserManager.#users;
      if (filter) {
        users = users.filter(user => {
          for (let key in filter) {
            if (user[key] !== filter[key]) {
              return false;
            }
          }
          return true;
        });
      }
      const totalDocs = users.length;
      if (totalDocs === 0) {
        const error = new Error("No hay Documentos");
        error.statusCode = 404;
        throw error;
      }
      const page = options.page || 1;
      const limit = options.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedUsers = users.slice(startIndex, endIndex);
      return {
        docs: paginatedUsers,
        totalDocs,
        limit,
        page,
        totalPages: Math.ceil(totalDocs / limit),
        hasNextPage: endIndex < totalDocs,
        hasPrevPage: startIndex > 0,
        nextPage: endIndex < totalDocs ? page + 1 : null,
        prevPage: startIndex > 0 ? page - 1 : null
      };
    } catch (error) {
      throw error;
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
  async destroy(id) {
    try {
      this.readOne(id);
      const within = UserManager.#users.filter((each) => each.id !== id);
      UserManager.#users = within;
      console.log("Usuario Eliminado");
    } catch (error) {
      console.log(error);
    }
  }
  async destroyAll(user_id) {
    try {
      // Filtrar usuarios que no tienen el user_id proporcionado
      const remainingUsers = UserManager.#users.filter(user => user.user_id !== user_id);      
      // Si no hay cambios en el array, significa que no hay usuarios con el user_id proporcionado
      if (remainingUsers.length === UserManager.#users.length) {
        throw new Error("No hay Documentos");
      }
      UserManager.#users = remainingUsers;
      console.log("Usuarios Eliminados");
      return { deletedCount: UserManager.#users.length - remainingUsers.length };
    } catch (error) {
      throw error;
    }
  }
}



const usersManager = new UserManager();
export default usersManager
/*
usersManager.create({
  photo: "photo.png",
  email: "usuario1@hotmail.com",
  password: "12345678",
  role: "DBA",
});
usersManager.create({
  photo: "photo.png",
  email: "usuario2@hotmail.com",
  password: "12345678",
  role: "DBA",
});
usersManager.create({
  photo: "photo.png",
  email: "usuario3@hotmail.com",
  password: "12345678",
  role: "DBA",
});
usersManager.create({
  photo: "photo.png",
  email: "usuario4@hotmail.com",
  password: "12345678",
  role: "DBA",
});

console.log(usersManager.read());
console.log(usersManager.readOne(2));
usersManager.destroy(2);
console.log(usersManager.readOne(2));
*/