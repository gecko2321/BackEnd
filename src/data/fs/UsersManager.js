import fs from "fs";
import crypto from "crypto";

class UserManager {
  constructor() {
    this.path = "./src/data/fs/files/users.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);

      fs.writeFileSync(this.path, stringData);

      console.log("ARCHIVO USERS CREADO!");
    } else {
      console.log("ARCHIVO USERS YA EXISTE!");
    }
  }
  async create(data) {
    try {
      if (!data.email || !data.password) {
        throw new Error("INGRESE EMAIL/PASSWORD");
      } else {
        // const one = {
        //   id: crypto.randomBytes(12).toString("hex"),
        //   email: data.email,
        //   password: data.password,
        //   role: data.role || 0,
        //   photo:
        //     data.photo ||
        //     "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
        //   age: data.age || 18,
        // };
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);
        all.push(data);
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        return data;
      }
    } catch (error) {
      throw error;
    }
  }
  async read(opts) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      opts && (all = all.filter((each) => each.opts === opts));
      return all;
    } catch (error) {
      console.log(error);
    }
  }
  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");

      all = JSON.parse(all);

      let one = all.find((each) => each._id === id);

      if (!one) {
        throw new Error("Not Found!!");
      } else {
        console.log(one);
        return one;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async readByEmail(email) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let one = all.find((each) => each.email === email);
      //console.log(all)
      // if (!one) {
      //   throw new Error("Not Found!!");
        
      // } else {
      //   return one;        
      // }
      return one
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      let all = await this.read();
      let one = all.find((each) => each._id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
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
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let one = all.find((each) => each._id === id);
      if (!one) {
        const error = new Error("Not found!!");
        error.statusCode = 404;
        throw error;
      } else {
        let filtered = all.filter((each) => each._id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log({ deleted: one._id });
        return one;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async destroyAll(user_id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let initialLength = all.length;
      all = all.filter((each) => each.user_id !== user_id);
      let deletedCount = initialLength - all.length;
      if (deletedCount === 0) {
        throw new Error("No hay Documentos");
      }
      all = JSON.stringify(all, null, 2);
      await fs.promises.writeFile(this.path, all);
      console.log(`Deleted ${deletedCount} users with user_id: ${user_id}`);
      return { deletedCount };
    } catch (error) {
      throw error;
    }
  }
}

const usersManager = new UserManager();
export default usersManager;

/*
async function prueba() {
  try {
    const user = new UserManager();

    await user.create({
      photo: "",
      email: "usuario1@hotmail.com",
      password: "12345678",

      role: "DBA",
    });
    await user.create({
      photo: "photo.png",
      email: "usuario2@hotmail.com",
      password: "12345678",

      role: "DBA",
    });
    await user.create({
      photo: "photo.png",
      email: "usuario3@hotmail.com",
      password: "12345678",

      role: "DBA",
    });
    await user.create({
      photo: "photo.png",
      email: "usuario4@hotmail.com",
      password: "12345678",

      role: "DBA",
    });

    const prueba = await user.create({
      photo: "photo.png",
      email: "usuario4@hotmail.com",
      password: "12345678",

      role: "DBA",
    });

    await user.read();
    await user.readOne(prueba.id);
    await user.destroy(prueba.id);
  } catch (error) {
    console.log(error);
  }
}

//prueba();
*/