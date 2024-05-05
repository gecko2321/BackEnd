import fs from "fs";
import crypto from "crypto";

class UserManager {
  constructor() {
    //this.path = "./files/users.json"; Para Filesystem
    this.path = "./src/data/fs/files";
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
      if (!data.email) {
        throw new Error("Enter EMAIL!");
      } else if (!data.password) {
        throw new Error("Enter PASSWORD!");
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          photo:
            data.photo ||
            "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
          email: data.email,
          password: data.password,
          role: data.role || 0,
        };

        let all = await fs.promises.readFile(this.path, "utf-8");

        all = JSON.parse(all);

        all.push(user);

        all = JSON.stringify(all, null, 2);

        await fs.promises.writeFile(this.path, all);

        console.log({ created: user.id });
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async read(role) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");

      all = JSON.parse(all);

      role && (all = all.filter((each) => each.role === role));
      return all;
    } catch (error) {
      console.log(error);
    }
  }
  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");

      all = JSON.parse(all);

      let user = all.find((each) => each.id === id);

      if (!user) {
        throw new Error("Not Found!!");
      } else {
        console.log(user);
        return user;
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

      let user = all.find((each) => each.id === id);

      if (!user) {
        const error = new Error("Not found!!");
        error.statusCode = 404;
        throw error;
      } else {
        let filtered = all.filter((each) => each.id !== id);

        filtered = JSON.stringify(filtered, null, 2);

        await fs.promises.writeFile(this.path, filtered);

        console.log({ deleted: user.id });
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const usersManager = new UserManager();
export default usersManager;

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
