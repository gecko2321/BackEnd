import productsManager from "../data/fs/ProductsManager.js";
import usersManager from "../data/fs/UsersManager.js";

export default async (socket) => {
  console.log("client id: " + socket.id);

  //Products
  socket.emit("products", await productsManager.read());
  socket.on("new_product", async (data) => {
    await productsManager.create(data);
    socket.emit("products", await productsManager.read());
  });

  //Users
  socket.on("new_user", async (data) => {
    await usersManager.create(data);
  });
};
