import fs from "fs";
import crypto from "crypto";

class CartManager {
  constructor() {
    //this.path = "./files/carts.json"; Para FileSystem
    this.path = "./src/data/fs/files";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);

      fs.writeFileSync(this.path, stringData);

      console.log("ARCHIVO CARTS CREADO!");
    } else {
      console.log("ARCHIVO CARTS YA EXISTE!");
    }
  }
  async create(data) {
    try {
      if (!data.user_id) {
        throw new Error("Ingrese un User_ID");
      } else {
        const cart = {
          id: crypto.randomBytes(12).toString("hex"),
          user_id: data.user_id || "default",
          product_id: data.product_id || "default",
          quantity: data.quantity || 1,
          state: data.state || "reserved",
        };

        let all = await fs.promises.readFile(this.path, "utf-8");

        all = JSON.parse(all);

        all.push(cart);

        all = JSON.stringify(all, null, 2);

        await fs.promises.writeFile(this.path, all);

        console.log({ created: cart.id });
        return cart;
      }
    } catch (error) {
      throw error;
    }
  }

  async read(user_id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      user_id && (all = all.filter((each) => each.user_id === user_id));
      console.log(all)
      return all;
    } catch (error) {
      throw error;
    }
  }
  // async readOne(id) {
  //   try {
  //     let all = await fs.promises.readFile(this.path, "utf-8");
  //     all = JSON.parse(all);
  //     let product = all.find((each) => each.id === id);
  //     return product;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
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
        console.log(one)
        return one;
      } else {
        const error = new Error("Not found!!");
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

      let cart = all.find((each) => each.id === id);

      if (!cart) {
        const error = new Error("Not found!!");
        error.statusCode = 404;
        throw error;
      } else {
        let filtered = all.filter((each) => each.id !== id);

        filtered = JSON.stringify(filtered, null, 2);

        await fs.promises.writeFile(this.path, filtered);

        console.log({ deleted: cart.id });
        return cart;
      }
    } catch (error) {
      throw error;
    }
  }
}

const cartsManager = new CartManager();
export default cartsManager;

async function pruebaCreate() {
  try {
    const cart = new CartManager();

    await cart.create({
      user_id: "ricardo" || "default",
      product_id: "pixel" || "default",
      quantity: 1 || 1,
      state: "reserved" || "reserved",
    });
  } catch (error) {
    console.log(error);
  }
}

async function pruebaRead() {
  try {
    const cart = new CartManager();
    await cart.read("lely")
  } catch (error) {
    console.log(error);
  }
}

async function pruebaUpdate() {
  try {
    const cart = new CartManager();
    await cart.update("8f56be60c63e3d9b995ff7eb",{user_id: "Lely3",product_id:"Samsung"})
  } catch (error) {
    console.log(error);
  }
}

async function pruebaDestroy() {
  try {
    const cart = new CartManager();
    await cart.destroy("8f56be60c63e3d9b995ff7eb")
  } catch (error) {
    console.log(error);
  }
}

//pruebaCreate();
//pruebaRead();
//pruebaUpdate()
//pruebaDestroy()