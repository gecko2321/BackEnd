import joi from "joi-oid";

const productsSchema = joi.object({
  title: joi.string().min(1).max(50).required().messages({
    "any.required": "el titulo es requerido",
    "string.empty": "el titulo no puede ser una cadena de texto vacía",
    "string.base": "el titulo debe ser de tipo cadena de texto",
    "string.min": "el titulo tiene que tener minimo 1 letras",
    "string.max": "el titulo tiene que tener maximo 50 letras",
  }),
  category: joi.string().required().messages({
    "any.required": "la categoria es requerido",
    "string.empty": "la categoria no puede ser una cadena de texto vacía",
  }),
  price: joi
    .number()    
    .required()
    .messages({
      "any.required": "el precio es requerido",
    }),
  stock: joi
    .number()
    .min(1)
    .required()
    .messages({
      "any.required": "El stock es requerido",      
    }),
  photo: joi.string().uri(),  
});

export default productsSchema;
