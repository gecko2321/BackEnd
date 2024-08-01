import { expect } from "chai";
import supertest from "supertest";
import environment from "../../src/utils/env.util.js";
import usersRepository from "../../src/repositories/users.rep.js";


const requester = supertest(`http://localhost:${environment.PORT}/api`);

describe("Testeando CERAMICAGLORIA API", function () {
  this.timeout(20000);
  const user = {
    name: "Super",
    lname: "Test",
    email: "pruebasupertest@hotmail.com",
    password: "Password1",
    role: 1,
    verified: true,
  };
  const product = {
    title: "SuperTest",
    category: "Varios",
    photo:
      "https://d22fxaf9t8d39k.cloudfront.net/f1901a40e42e5a23cfd96f43a6f2d7f7284f2d641c3b04d8e607479c2b8094c777180.jpeg",
    price: 2000,
    stock: 20,
  };
  let token = "";
  let createdId_p = "";

  it("Registro de un usuario", async () => {
    const response = await requester.post("/sessions/register").send(user);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(201);
  });

  it("Inicio de sesión de un usuario", async () => {
    const response = await requester.post("/sessions/login").send(user);
    const { _body, headers } = response;
    token = headers["set-cookie"][0].split(";")[0];
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Leer Productos", async () => {
    const response = await requester
      .get("/products")
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Leer Usuarios", async () => {
    const response = await requester
      .get("/users")
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Creación de un producto por parte de un administrador", async () => {
    const response = await requester
      .post("/products")
      .send(product)
      .set("Cookie", token);
    const { _body } = response;
    const mess = _body.message.match(/CREATED ID: (\w+)/);
    createdId_p = mess[1];
    expect(_body.statusCode).to.be.equals(201);
  });

  it("Update de un producto por parte de un administrador", async () => {
    const response = await requester
      .put(`/products/${createdId_p}`)
      .send(product)
      .set("Cookie", token);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });

   it("Update de un usuario por parte de un administrador", async () => {
    const foundUser = await usersRepository.readByEmailRepository(user.email);
     const response = await requester
       .put("/users/" + foundUser._id)
       .send(user)
       .set("Cookie", token);
     const { _body } = response;
     expect(_body.statusCode).to.be.equals(200);
   });


  it("Eliminación de un producto por parte de un administrador", async () => {
    const response = await requester
      .delete(`/products/${createdId_p}`)
      .set("Cookie", token);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Eliminación de un producto sin haber iniciado sesión", async () => {
    const response = await requester
      .delete("/products/666a384a3e5c8e385e8b90d8")
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(401);
  });

  it("Cerrado de sesión", async () => {
    const response = await requester
      .post("/sessions/signout")
      .set("Cookie", token);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Eliminación de un usuario", async () => {
    const foundUser = await usersRepository.readByEmailRepository(user.email);
    const response = await requester.delete("/users/" + foundUser._id);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });
});
