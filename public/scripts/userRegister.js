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
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
    photo: document.querySelector("#photo").value,
    age: document.querySelector("#age").value,
  };
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let response = await fetch("/api/sessions/register", opts);
  response = await response.json();
  if (response.statusCode === 201) {
    Swal.fire({
      title: response.message,
      icon: "success",
      timer: 5000,
      timerProgressBar: true,
      confirmButtonColor: "#ff3b3c",
    });

    return location.replace("/users/login");
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
