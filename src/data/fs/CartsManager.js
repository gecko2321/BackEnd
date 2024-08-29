import fs from "fs";
import crypto from "crypto";

class CartManager {
  constructor() {    
    this.path = "./src/data/fs/files/carts.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);

      fs.writeFileSync(this.path, stringData);

      console.log("ARCHIVO CARTS CREADO!");
    } else {
      //console.log("ARCHIVO CARTS YA EXISTE!");
    }
  }
  async create(data) {
    try {
      if (!data.user_id) {
        throw new Error("Ingrese un User_ID");
      } else {
        // const one = {
        //   id: crypto.randomBytes(12).toString("hex"),
        //   user_id: data.user_id || "default",
        //   product_id: data.product_id || "default",
        //   quantity: data.quantity || 1,
        //   state: data.state || "reserved",
        // };
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);
        all.push(data);
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        console.log({ created: data.id });
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
      if (opts && opts.user_id) {
        all = all.filter((each) => each.user_id === opts.user_id);
      }
      console.log(all);
      return all;
    } catch (error) {
      throw error;
    }
  }
   async readOne(id) {
     try {
       let all = await fs.promises.readFile(this.path, "utf-8");
       all = JSON.parse(all);
       let one = all.find((each) => each.id === id);
       return one;
    } catch (error) {
       throw error;
     }
   }
   async paginate({ filter, options }) {
    try {
      let file = await fs.promises.readFile(this.path, "utf-8");
      file = JSON.parse(file);      
      if (filter.user_id) {
        file = file.filter(cart => cart.user_id === filter.user_id);
      }
      const totalDocs = file.length;
      const limit = options.limit || 10;
      const page = options.page || 1;
      const totalPages = Math.ceil(totalDocs / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;
      const nextPage = hasNextPage ? page + 1 : null;
      const prevPage = hasPrevPage ? page - 1 : null;
      const paginatedDocs = file.slice((page - 1) * limit, page * limit);
      const all = {
        docs: paginatedDocs,
        totalDocs,
        limit,
        page,
        totalPages,
        hasNextPage,
        hasPrevPage,
        nextPage,
        prevPage,
      };
      if (all.totalDocs === 0) {
        const error = new Error("No hay Documentos");
        error.statusCode = 404;
        throw error;
      }
      console.log(all)
      return all; // Return the paginated result
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
      let cart = all.find((each) => each._id === id);
      if (!cart) {
        const error = new Error("Not found!!");
        error.statusCode = 404;
        throw error;
      } else {
        let filtered = all.filter((each) => each._id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log({ deleted: cart._id });
        return cart;
      }
    } catch (error) {
      throw error;
    }
  }
  async destroyAll(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      const filtered = all.filter((cart) => cart.user_id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(filtered, null, 2));
      return all;
    } catch (error) {
      throw error;
    }
  }
  async aggregate(obj) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);

      let result = all;

      for (const stage of obj) {
        if (stage.$match) {
          result = result.filter(cart => {
            return Object.keys(stage.$match).every(key => {
              if (key === 'user_id') {
                return cart[key] === stage.$match[key];
              }
              return cart[key] === stage.$match[key];
            });
          });
        } else if (stage.$lookup) {
          // Simulate lookup by joining data in-memory
          // Since we don't have a database, this part will be a simplified simulation
          // Assuming products are also stored in JSON file at "./src/data/fs/files/products.json"
          const products = JSON.parse(await fs.promises.readFile("./src/data/fs/files/products.json", "utf-8"));
          result = result.map(cart => {
            const product = products.find(product => product._id === cart.product_id);
            return { ...cart, product_id: [product] };
          });
        } else if (stage.$replaceRoot) {
          result = result.map(cart => {
            const newRoot = { ...cart.product_id[0], ...cart };
            delete newRoot.product_id;
            return newRoot;
          });
        } else if (stage.$set) {
          result = result.map(cart => ({
            ...cart,
            subTotal: cart.quantity * cart.price,
          }));
        } else if (stage.$group) {
          const grouped = {};
          result.forEach(cart => {
            if (!grouped[cart.user_id]) {
              grouped[cart.user_id] = { user_id: cart.user_id, total: 0 };
            }
            grouped[cart.user_id].total += cart.subTotal;
          });
          result = Object.values(grouped);
        } else if (stage.$project) {
          result = result.map(cart => ({
            user_id: cart.user_id,
            total: cart.total,
            date: new Date(),
          }));
        } else if (stage.$merge) {
          // Simulate merge by saving results in a "tickets" JSON file
          const ticketsPath = "./src/data/fs/files/tickets.json";
          const tickets = fs.existsSync(ticketsPath) ? JSON.parse(await fs.promises.readFile(ticketsPath, "utf-8")) : [];
          result.forEach(ticket => {
            tickets.push(ticket);
          });
          await fs.promises.writeFile(ticketsPath, JSON.stringify(tickets, null, 2));
        }
      }

      return result;
    } catch (error) {
      throw error;
    }
  }
}

const cartsManager = new CartManager();
export default cartsManager;

/*
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
*/