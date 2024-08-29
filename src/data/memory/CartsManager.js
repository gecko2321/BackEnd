import crypto from "crypto";

class CartManager {
  static #carts = [];
 async create(data) {
    try {
      const one = {
        id: crypto.randomBytes(12).toString("hex"),
        user_id: data.user_id || "default",
        product_id: data.product_id || "default",
        quantity: data.quantity || 1,
        state: data.state || "reserved"
      };
      CartManager.#carts.push(one);
      console.log("Cart Creado");
      return one      
    } catch (error) {
      console.log(error);
    }
  }

  async read(opts) {
    try {
      let all = [...CartManager.#carts]; // Hacemos una copia para evitar mutaciones no deseadas
      if (opts && opts.category) {
        // Filtrar los carritos según la categoría especificada
        all = all.filter(cart => cart.category === opts.category);
      }
      return all;
    } catch (error) {
      console.log(error);
    }
  }

 async readOne(id) {
    try {
      const one = CartManager.#carts.find((each) => each.user_id === id);
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
      let carts = [...CartManager.#carts]; // Hacemos una copia para evitar mutaciones no deseadas
      // Aquí puedes aplicar filtros o paginación en memoria según los parámetros
      // `filter` y `options` recibidos. En este ejemplo, solo se devuelve todo.
      const all = {
        docs: carts, // Aquí deberías aplicar la lógica de filtrado o paginación en memoria
        totalDocs: carts.length, // Considerando todos los elementos como si fueran documentos
        page: 1, // Ejemplo de número de página
        totalPages: 1, // Ejemplo de número total de páginas
        hasNextPage: false, // Ejemplo de si hay una página siguiente
        hasPrevPage: false, // Ejemplo de si hay una página anterior
        nextPage: null, // Ejemplo del número de la siguiente página
        prevPage: null, // Ejemplo del número de la página anterior
      };
      if (all.totalDocs === 0) {
        const error = new Error("No hay Documentos");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      let all = await this.read();
      let one = all.find((each) => each.user_id === id);
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
      const one = CartManager.#carts.filter((each) => each.user_id !== id);
      CartManager.#carts = one;
      console.log("Cart Eliminado");
      return one
    } catch (error) {
      console.log(error);
    }
  }
  async destroyAll(id) {
    try {
      const all = CartManager.#carts.filter((cart) => cart.user_id !== id);
      CartManager.#carts = all;
      return all;
    } catch (error) {
      throw error;
    }
  }
  async aggregate(obj) {
    try {
      // Implementa la lógica de agregación aquí
      // Ejemplo simple: contar carritos por user_id
      const result = CartManager.#carts.reduce((acc, cart) => {
        const key = cart[obj.groupBy];
        if (!acc[key]) {
          acc[key] = { count: 0, carts: [] };
        }
        acc[key].count += 1;
        acc[key].carts.push(cart);
        return acc;
      }, {});
      return result;
    } catch (error) {
      throw error;
    }
  }
}

const cartsManager = new CartManager();
export default cartsManager

/*
cartsManager.create({
  title: "Celular",
  photo: "celular.png",
  category: "Electronicos",
  price: 400000,
  stock: 25,
});

console.log(cartsManager.read());
console.log(cartsManager.readOne(2));
cartsManager.destroy(2);
cartsManager.create()
console.log(cartsManager.readOne(2));
*/