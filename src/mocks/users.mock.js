import dbConnect from "../utils/dbConnect.util.js";
import "../utils/env.util.js";
import { faker } from "@faker-js/faker";
import usersRepository from "../repositories/users.rep.js";

async function createData() {
  try {
    dbConnect;
    for (let i = 1; i <= 20; i++) {
      const user = {
        name: faker.person.firstName(),
        lname: faker.person.lastName(),
        email: faker.internet.exampleEmail(),
        password: "Password1",
        role: 0,
        age: faker.number.int({ min: 18, max: 70 }),
        photo: faker.image.avatar(),
        verified: true,
        verifyCode: 12345678
      };
      await usersRepository.createRepository(user);
    }
    console.log("Users Created");
  } catch (error) {
    console.log(error);
  }
}

createData();
