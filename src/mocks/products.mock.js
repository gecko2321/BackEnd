import dbConnect from "../utils/dbConnect.util.js";
import "../utils/env.util.js";
import { faker } from "@faker-js/faker";
import productsRepository from "../repositories/products.rep.js";

async function createData() {
  try {
    dbConnect;
    for (let i = 1; i <= 1000; i++) {
      const product = {
        title: faker.commerce.product(),
        category: faker.helpers.arrayElement([
          "Tazas",
          "Platos",
          "Combo",
          "Jardineria",
          "Varios",
        ]),
        price: faker.commerce.price({ min: 1000, max: 10000 }),
        stock: 10,
        photo: faker.image.url(314, 314),
      };
      await productsRepository.createRepository(product);
    }
    console.log("Products Created");
  } catch (error) {
    console.log(error);
  }
}

createData();
