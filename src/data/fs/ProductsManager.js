import fs from "fs";
import crypto from "crypto";

class ProductManager {
  constructor() {
    //this.path = "./files/products.json";  Para Filesystem
    this.path = "./src/data/fs/files";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);

      fs.writeFileSync(this.path, stringData);

      console.log("ARCHIVO PRODUCTS CREADO!");
    } else {
      console.log("ARCHIVO PRODUCTS YA EXISTE!");
    }
  }
  async create(data) {
    try {
      if (!data.title) {
        throw new Error("Enter a Title");
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo:
            data.photo ||
            "https://http2.mlstatic.com/D_NQ_NP_709331-MLA28343762816_102018-O.webp",
          category: data.category || "Electronicos",
          price: data.price || 1,
          stock: data.stock || 1,
        };

        let all = await fs.promises.readFile(this.path, "utf-8");

        all = JSON.parse(all);

        all.push(product);

        all = JSON.stringify(all, null, 2);

        await fs.promises.writeFile(this.path, all);

        console.log({ created: product.id });
        return product;
      }
    } catch (error) {
      throw error;
    }
  }

  async read(cat) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      cat && (all = all.filter((each) => each.category === cat));
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let product = all.find((each) => each.id === id);
      return product;
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
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
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

      let product = all.find((each) => each.id === id);

      if (!product) {
        const error = new Error("Not found!!");
        error.statusCode = 404;
        throw error;
      } else {
        let filtered = all.filter((each) => each.id !== id);

        filtered = JSON.stringify(filtered, null, 2);

        await fs.promises.writeFile(this.path, filtered);

        console.log({ deleted: product.id });
        return product;
      }
    } catch (error) {
      throw error;
    }
  }
}

const productsManager = new ProductManager();
export default productsManager;

async function prueba() {
  try {
    const product = new ProductManager();

    await product.create({
      title: "Celular",
      photo: "celular.png",
      category: "Electronicos",
      price: 400000,
      stock: 25,
    });
    await product.create({
      title: "Monitor",
      photo: "monitor.png",
      category: "Electronicos",
      price: 100000,
      stock: 30,
    });
    await product.create({
      title: "Headphones",
      photo: "headphones.png",
      category: "Audio",
      price: 45000,
      stock: 10,
    });
    await product.create({
      title: "Microondas",
      photo: "microondas.png",
      category: "Electrodomesticos",
      price: 300000,
      stock: 8,
    });
    await product.create({
      title: "Televisor",
      photo: "televisor.png",
      category: "Video",
      price: 500000,
      stock: 18,
    });
    await product.create({
      title: "Licuadora",
      photo: "licuadora.png",
      category: "Electro",
      price: 60000,
      stock: 10,
    });
    await product.create({
      title: "Juguera",
      photo: "juguera.png",
      category: "Electro",
      price: 30000,
      stock: 11,
    });
    await product.create({
      title: "Impresora",
      photo: "impresora.png",
      category: "Perifericos",
      price: 250000,
      stock: 20,
    });
    await product.create({
      title: "Switch",
      photo: "switch.png",
      category: "Redes",
      price: 200000,
      stock: 10,
    });
    await product.create({
      title: "CPU",
      photo: "cpu.png",
      category: "Computacion",
      price: 800000,
      stock: 5,
    });

    // const prueba = await product.create({
    //   title: "Borrar",
    //   photo: "borrar.png",
    //   category: "ninguna",
    //   price: 0,
    //   stock: 0,
    // });
    //hasta aca 10
    await product.create({
      title: "Radio",
      photo: "radio.png",
      category: "Electronicos",
      price: 400000,
      stock: 25,
    });
    await product.create({
      title: "Freidora",
      photo: "freidora.png",
      category: "Electrodomesticos",
      price: 100000,
      stock: 30,
    });
    await product.create({
      title: "Heladera",
      photo: "heladera.png",
      category: "Electrodomesticos",
      price: 45000,
      stock: 10,
    });
    await product.create({
      title: "Destapador",
      photo: "destapador.png",
      category: "Electrodomesticos",
      price: 300000,
      stock: 8,
    });
    await product.create({
      title: "Cefetera",
      photo: "cafetera.png",
      category: "Electrodomesticos",
      price: 500000,
      stock: 18,
    });
    await product.create({
      title: "Exprimidora",
      photo: "exprimidora.png",
      category: "Electro",
      price: 60000,
      stock: 10,
    });
    await product.create({
      title: "Netbook",
      photo: "netbook.png",
      category: "Computacion",
      price: 30000,
      stock: 11,
    });
    await product.create({
      title: "Router",
      photo: "router.png",
      category: "Redes",
      price: 250000,
      stock: 20,
    });
    await product.create({
      title: "Mikrotik",
      photo: "mikrotik.png",
      category: "Redes",
      price: 200000,
      stock: 10,
    });
    await product.create({
      title: "Firewall",
      photo: "firewall.png",
      category: "Redes",
      price: 800000,
      stock: 5,
    });

    // await product.read();
    // await product.readOne(prueba.id);
    // await product.destroy(prueba.id);
  } catch (error) {
    console.log(error);
  }
}
//prueba();
