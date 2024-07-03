import { genSaltSync, hashSync, compareSync,compare } from "bcrypt";

const createHash = (password) => {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return hash;
};

const verifyHash = (reqBodyPass, mongoPass) => {
  //console.log(reqBodyPass)
  //console.log(mongoPass)
  const verify = compareSync(reqBodyPass, mongoPass);
  //const verify = compare(reqBodyPass, mongoPass);
  //console.log(verify)
  return verify;
};

export { createHash, verifyHash };
