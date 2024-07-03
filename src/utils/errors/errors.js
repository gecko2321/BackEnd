const errors = {
    error: { message: "Error", statusCode: 400 },
    enter_mail_pass: { message: "Please enter email and password!", statusCode: 400 },
    regform: { message: "Please enter Name, Last Name, email and password!", statusCode: 400 },
    auth: { message: "Bad auth", statusCode: 401 },
    forbidden: { message: "Forbidden", statusCode: 403 },
    notFound: { message: "Not found", statusCode: 404 },
    fatal: { message: "Fatal", statusCode: 500 },
   };
   
   export default errors;