import crypto from "crypto";

class ProductManager {
  static #products = [];
  async create(data) {
    try {
      // const one = {
      //   id: crypto.randomBytes(12).toString("hex"),
      //   title: data.title,
      //   photo:
      //     data.photo ||
      //     "https://http2.mlstatic.com/D_NQ_NP_709331-MLA28343762816_102018-O.webp",
      //   category: data.category || "Varios",
      //   price: data.price || 1,
      //   stock: data.stock || 1,
      // };
      ProductManager.#products.push(data);
      console.log("Producto Creado");
      return data      
    } catch (error) {
      console.log(error);
    }
  }
  async read(opts) {
    try {
      let all = ProductManager.#products;
      if (opts && opts.category) {
        // Si se proporciona la categoría en opts, filtrar los productos por categoría
        all = all.filter((product) => product.category === opts.category);
      }
      return all;
    } catch (error) {
      console.log(error);
    }
  }
 async readOne(id) {
    try {
      const one = ProductManager.#products.find((each) => each.id === id);
      if (!one) {
        throw new Error("NO EXISTE EL PRODUCTO");
      } else {
        return one;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async paginate({ filter, options }) {
    try {
      let all = ProductManager.#products;

      if (filter && filter.category) {
        all = all.filter((product) => product.category === filter.category);
      }

      const page = options.page || 1;
      const limit = options.limit || 10;
      const totalDocs = all.length;
      const totalPages = Math.ceil(totalDocs / limit);

      if (totalDocs === 0) {
        const error = new Error("No hay Documentos");
        error.statusCode = 404;
        throw error;
      }

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const docs = all.slice(startIndex, endIndex);

      const result = {
        docs,
        totalDocs,
        limit,
        totalPages,
        page,
      };

      return result;
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
      this.readOne(id);
      const one = ProductManager.#products.filter((each) => each.id !== id);
      ProductManager.#products = one;
      console.log("Producto Eliminado");
      return one      
    } catch (error) {
      console.log(error);
    }
  }
}
const productsManager = new ProductManager();
export default productsManager
/*
productsManager.create({
  title: "Celular",
  photo: "celular.png",
  category: "Electronicos",
  price: 400000,
  stock: 25,
});
productsManager.create({
  title: "Monitor",
  photo: "monitor.png",
  category: "Electronicos",
  price: 100000,
  stock: 30,
});
productsManager.create({
  title: "Headphones",
  photo: "headphones.png",
  category: "Audio",
  price: 45000,
  stock: 10,
});
productsManager.create({
  title: "Microondas",
  photo: "microondas.png",
  category: "Electrodomesticos",
  price: 300000,
  stock: 8,
});
productsManager.create({
  title: "Televisor",
  photo: "televisor.png",
  category: "Video",
  price: 500000,
  stock: 18,
});
productsManager.create({
  title: "Licuadora",
  photo: "licuadora.png",
  category: "Electro",
  price: 60000,
  stock: 10,
});
productsManager.create({
  title: "Juguera",
  photo: "juguera.png",
  category: "Electro",
  price: 30000,
  stock: 11,
});
productsManager.create({
  title: "Impresora",
  photo: "impresora.png",
  category: "Perifericos",
  price: 250000,
  stock: 20,
});
productsManager.create({
  title: "Switch",
  photo: "switch.png",
  category: "Redes",
  price: 200000,
  stock: 10,
});
productsManager.create({
  title: "CPU",
  photo: "cpu.png",
  category: "Computacion",
  price: 800000,
  stock: 5,
});

// hasta acá 10
productsManager.create({
  title: "Radio",
  photo: "radio.png",
  category: "Electronicos",
  price: 400000,
  stock: 25,
});
productsManager.create({
  title: "Freidora",
  photo: "freidora.png",
  category: "Electrodomesticos",
  price: 100000,
  stock: 30,
});
productsManager.create({
  title: "Heladera",
  photo: "heladera.png",
  category: "Electrodomesticos",
  price: 45000,
  stock: 10,
});
productsManager.create({
  title: "Destapador",
  photo: "destapador.png",
  category: "Electrodomesticos",
  price: 300000,
  stock: 8,
});
productsManager.create({
  title: "Cefetera",
  photo: "cafetera.png",
  category: "Electrodomesticos",
  price: 500000,
  stock: 18,
});
productsManager.create({
  title: "Exprimidora",
  photo: "exprimidora.png",
  category: "Electro",
  price: 60000,
  stock: 10,
});
productsManager.create({
  title: "Netbook",
  photo: "netbook.png",
  category: "Computacion",
  price: 30000,
  stock: 11,
});
productsManager.create({
  title: "Router",
  photo: "router.png",
  category: "Redes",
  price: 250000,
  stock: 20,
});
productsManager.create({
  title: "Mikrotik",
  photo: "mikrotik.png",
  category: "Redes",
  price: 200000,
  stock: 10,
});
productsManager.create({
  title: "Firewall",
  photo: "firewall.png",
  category: "Redes",
  price: 800000,
  stock: 5,
});

console.log(productsManager.read());
console.log(productsManager.readOne(2));
productsManager.destroy(2);
console.log(productsManager.readOne(2));
*/