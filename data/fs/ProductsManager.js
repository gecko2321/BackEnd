const fs = require("fs");
const crypto = require("crypto");

class ProductManager {
  constructor() {
    this.path = "./data/fs/files/products.json";

    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);

      fs.writeFileSync(this.path, stringData);

      console.log("ARCHIVO CREADO!");
    } else {
      console.log("ARCHIVO YA EXISTE!");
    }
  }
  async create(data) {
    try {
      if (!data.title) {
        throw new Error("INGRESE TITULO");
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo:
            data.photo ||
            "https://http2.mlstatic.com/D_NQ_NP_709331-MLA28343762816_102018-O.webp",
          category: data.category,
          price: data.price,
          stock: data.stock,
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
      console.log(error);
    }
  }
  async read() {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");

      all = JSON.parse(all);

      if (all.length === 0) {
        throw new Error("NO HAY PRODUCTOS");
      } else {
        console.log(all);
        return all;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");

      all = JSON.parse(all);

      let product = all.find((each) => each.id === id);

      if (!product) {
        throw new Error("NO ENCONTRADO");
      } else {
        console.log(product);
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async destroy(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");

      all = JSON.parse(all);

      let product = all.find((each) => each.id === id);

      if (!product) {
        throw new Error("NO ENCONTRADO");
      } else {
        let filtered = all.filter((each) => each.id !== id);

        filtered = JSON.stringify(filtered, null, 2);

        await fs.promises.writeFile(this.path, filtered);

        console.log({ deleted: product.id });
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

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

    const prueba = await product.create({
      title: "Borrar",
      photo: "borrar.png",
      category: "ninguna",
      price: 0,
      stock: 0,
    });
    await product.read();
    await product.readOne(prueba.id);
    await product.destroy(prueba.id);
  } catch (error) {
    console.log(error);
  }
}
prueba();
