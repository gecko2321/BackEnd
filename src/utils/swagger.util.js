import __dirname from "../../utils.js";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "CERAMICAGLORIA API",
      description: "Documentation of ceramicagloria API",
    },
  },
  apis: [__dirname + "/src/docs/*.yaml"],
};

export default options;
