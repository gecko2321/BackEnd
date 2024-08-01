import assert from "assert";
//import environment from "../../../src/utils/env.util.js";
import dao from "../../../src/data/dao.factory.js";
const { productsManager } = dao;

describe(//la descripcion del entorno de testeo
"Testeando el recurso productos", //la callback con todos los tests a ejecutar
() => {
  const data = { title: "Jarron", category: "Varios" };
  it(//la descrip del tesst
  "Testeando que la creacion de un producto recibe un objeto con la propiedad 'title'", //la callback con la logica del test
  () => {
    assert.ok(data.title);
  });
});
