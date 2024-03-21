class ProductManager {
  static #products = [];
  create(data) {
    try {
      const product = {
        id:
          ProductManager.#products.length === 0
            ? 1
            : ProductManager.#products[ProductManager.#products.length - 1].id +
              1,
        title: data.title,
        photo: data.photo,
        category: data.category,
        price: data.price,
        stock: data.stock,
      };
      ProductManager.#products.push(product);
      console.log("Producto Creado");
    } catch (error) {
      console.log(error);
    }
  }

  read() {
    try {
      return ProductManager.#products;
    } catch (error) {
      console.log(error);
    }
  }

  readOne(id) {
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

  destroy(id) {
    try {
      this.readOne(id);

      const within = ProductManager.#products.filter((each) => each.id !== id);
      ProductManager.#products = within;
      console.log("Producto Eliminado");
    } catch (error) {
      console.log(error);
    }
  }
}

const gestorDeProductos = new ProductManager();
gestorDeProductos.create({
  title: "Celular",
  photo: "celular.png",
  category: "Electronicos",
  price: 400000,
  stock: 25,
});
gestorDeProductos.create({
  title: "Monitor",
  photo: "monitor.png",
  category: "Electronicos",
  price: 100000,
  stock: 30,
});
gestorDeProductos.create({
  title: "Headphones",
  photo: "headphones.png",
  category: "Audio",
  price: 45000,
  stock: 10,
});
gestorDeProductos.create({
  title: "Microondas",
  photo: "microondas.png",
  category: "Electrodomesticos",
  price: 300000,
  stock: 8,
});
gestorDeProductos.create({
  title: "Televisor",
  photo: "televisor.png",
  category: "Video",
  price: 500000,
  stock: 18,
});
gestorDeProductos.create({
  title: "Licuadora",
  photo: "licuadora.png",
  category: "Electro",
  price: 60000,
  stock: 10,
});
gestorDeProductos.create({
  title: "Juguera",
  photo: "juguera.png",
  category: "Electro",
  price: 30000,
  stock: 11,
});
gestorDeProductos.create({
  title: "Impresora",
  photo: "impresora.png",
  category: "Perifericos",
  price: 250000,
  stock: 20,
});
gestorDeProductos.create({
  title: "Switch",
  photo: "switch.png",
  category: "Redes",
  price: 200000,
  stock: 10,
});
gestorDeProductos.create({
  title: "CPU",
  photo: "cpu.png",
  category: "Computacion",
  price: 800000,
  stock: 5,
});

// hasta acá 10
gestorDeProductos.create({
  title: "Radio",
  photo: "radio.png",
  category: "Electronicos",
  price: 400000,
  stock: 25,
});
gestorDeProductos.create({
  title: "Freidora",
  photo: "freidora.png",
  category: "Electrodomesticos",
  price: 100000,
  stock: 30,
});
gestorDeProductos.create({
  title: "Heladera",
  photo: "heladera.png",
  category: "Electrodomesticos",
  price: 45000,
  stock: 10,
});
gestorDeProductos.create({
  title: "Destapador",
  photo: "destapador.png",
  category: "Electrodomesticos",
  price: 300000,
  stock: 8,
});
gestorDeProductos.create({
  title: "Cefetera",
  photo: "cafetera.png",
  category: "Electrodomesticos",
  price: 500000,
  stock: 18,
});
gestorDeProductos.create({
  title: "Exprimidora",
  photo: "exprimidora.png",
  category: "Electro",
  price: 60000,
  stock: 10,
});
gestorDeProductos.create({
  title: "Netbook",
  photo: "netbook.png",
  category: "Computacion",
  price: 30000,
  stock: 11,
});
gestorDeProductos.create({
  title: "Router",
  photo: "router.png",
  category: "Redes",
  price: 250000,
  stock: 20,
});
gestorDeProductos.create({
  title: "Mikrotik",
  photo: "mikrotik.png",
  category: "Redes",
  price: 200000,
  stock: 10,
});
gestorDeProductos.create({
  title: "Firewall",
  photo: "firewall.png",
  category: "Redes",
  price: 800000,
  stock: 5,
});


console.log(gestorDeProductos.read());
console.log(gestorDeProductos.readOne(2));
gestorDeProductos.destroy(2);
console.log(gestorDeProductos.readOne(2));
