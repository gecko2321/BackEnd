import argsUtil from "../utils/args.util.js";
import crypto from "crypto";
import { createHash } from "../utils/hash.util.js";

const persistence = argsUtil.persistence;


class UsersDTO {
  
  constructor(data) {
    
    persistence !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.name = data.name;
    this.lname = data.lname;
    this.email = data.email;
    this.password = createHash(data.password);
    //this.password = data.password;
    this.role = data.role;
    this.age = data.age || 18;
    this.photo =
      data.photo ||
      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png";
    (this.verified = data.verified),
      (this.verifyCode = crypto.randomBytes(6).toString("hex")),
      //verificar si corresponde o no evaluar el heasheo de la contraseña
      //porque el enrutador de sessions (/api/sessions/register) está usando PASSPORT!!!
      //pero yo acá estoy usando el CRUD de users (/api/users)
      persistence !== "mongo" && (this.createdAt = new Date());
    persistence !== "mongo" && (this.updatedAt = new Date());
  }
}

export default UsersDTO;
