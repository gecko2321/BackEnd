
class CustomError {
    static new({ message, statusCode }) {
        console.log("entré al custom error")
      const error = new Error(message);
      error.statusCode = statusCode;
      throw error;
    }
   }
   
   export default CustomError;

