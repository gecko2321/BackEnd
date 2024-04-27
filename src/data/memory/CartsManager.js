class CartManager {
  static #carts = [];
  create(data) {
    try {
      const cart = {
        user_id: data.user_id || "id_de_usuario",
        product_id: data.product_id || "id_de_producto",
        quantity: data.quantity || 1,
        state: data.state || "reserved"
      };
      CartManager.#carts.push(cart);
      console.log("Cart Creado");
    } catch (error) {
      console.log(error);
    }
  }

  read() {
    try {
      return CartManager.#carts;
    } catch (error) {
      console.log(error);
    }
  }

  readOne(id) {
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
  destroy(id) {
    try {
      this.readOne(id);

      const within = CartManager.#carts.filter((each) => each.user_id !== id);
      CartManager.#carts = within;
      console.log("Cart Eliminado");
    } catch (error) {
      console.log(error);
    }
  }
}

const gestorDeCarritos = new CartManager();
gestorDeCarritos.create({
  title: "Celular",
  photo: "celular.png",
  category: "Electronicos",
  price: 400000,
  stock: 25,
});

console.log(gestorDeCarritos.read());
console.log(gestorDeCarritos.readOne(2));
gestorDeCarritos.destroy(2);
gestorDeCarritos.create()
console.log(gestorDeCarritos.readOne(2));
