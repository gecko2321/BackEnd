class ProductManager {
  static #products = [];
  create(data) {
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
  }
  read() {
    return ProductManager.#products;
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
//Crear un usuario mas
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

console.log(gestorDeProductos.read());
