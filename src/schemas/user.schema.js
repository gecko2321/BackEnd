import joi from "joi-oid";

const usersSchema = joi.object({
  name: joi.string().min(3).max(50).required().messages({
    "any.required": "el nombre es requerido",
    "string.empty": "el nombre no puede ser una cadena de texto vacía",
    "string.base": "el nombre debe ser de tipo cadena de texto",
    "string.min": "el nombre tiene que tener minimo 3 letras",
    "string.max": "el nombre tiene que tener maximo 50 letras",
  }),
  lname: joi.string().min(3).max(50).required().messages({
    "any.required": "el apellido es requerido",
    "string.empty": "el apellido no puede ser una cadena de texto vacía",
    "string.base": "el apellido  debe ser de tipo cadena de texto",
    "string.min": "el apellido tiene que tener minimo 3 letras",
    "string.max": "el apellido tiene que tener maximo 50 letras",
  }),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .min(3)
    .max(50)
    .required()
    .messages({
      "any.required": "el email es requerido",
      "string.empty": "el email no puede ser una cadena de texto vacía",
      "string.email": "el email debe ser válido",
      "string.min": "el email tiene que tener minimo 3 letras",
      "string.max": "el email tiene que tener maximo 50 letras",
    }),
  password: joi
    .string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]+$"))
    .min(8)
    .max(50)
    .required()
    .messages({
      "any.required": "La contraseña es requerida",
      "string.empty": "La contraseña no puede ser una cadena de texto vacía",
      "string.pattern.base":
        "La contraseña debe ser alfanumérica con al menos una letra minúscula y una letra MAYÚSCULA",
      "string.min": "La contraseña tiene que tener mínimo 8 caracteres",
      "string.max": "La contraseña tiene que tener máximo 50 caracteres",
    }),
  role: joi.number(),
  age: joi
    .number()
    .min(18)
    .messages({
      "number.min": "No puedes registrarte si eres menor de 18 años",
    }),
  photo: joi.string().uri(),
  verified: joi.boolean(),
  verifyCode: joi.string(),
});

export default usersSchema;
