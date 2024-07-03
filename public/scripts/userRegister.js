//Para user socket
// const socket = io();
//   document.querySelector("#register").addEventListener
//   ("click", (event) => {
//   let photo = document.querySelector("#photo").value
//   let email = document.querySelector("#email").value
//   let password = document.querySelector("#password").value
//   let role = document.querySelector("#role").value
//   socket.emit("new_user", {photo,email,password,role }) })

document.querySelector("#register").addEventListener("click", async () => {
  const data = {
    name: document.querySelector("#name").value,
    lname: document.querySelector("#lname").value,
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
    photo: document.querySelector("#photo").value,
    age: document.querySelector("#age").value,
  };
  //console.log(data);

  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let response = await fetch("/api/sessions/register", opts);
  response = await response.json();

  if (response.statusCode === 201) {
    await Swal.fire({
      title: response.message,
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
      confirmButtonColor: "#ff3b3c",
      showConfirmButton: false
    });

    // Espera 2 segundos antes de redirigir
    setTimeout(() => {
      location.replace("/users/verify");
    }, 2000);
  } else {
    Swal.fire({
      title: response.message,
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
      confirmButtonColor: "#ff3b3c",
    });
  }
});
