document.querySelector("#loginn").addEventListener("click", async () => {
  const data = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let response = await fetch("/api/sessions/login", opts);
  response = await response.json();
  if (response.statusCode === 200) {
    return Swal.fire({
      title: response.message,
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then(function () {
      return location.replace("/");
    });
  }
  return Swal.fire({
    title: response.message,
    icon: "error",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
});
