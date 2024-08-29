document.querySelector("#verify").addEventListener("click", async () => {
  const data = {
    email: document.querySelector("#email").value,
    code: document.querySelector("#verifycode").value,
  };

  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch("/api/sessions/verify", opts);
    let result = await response.json();

    if (result.statusCode === 200) {
      await Swal.fire({
        title: result.message,
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      location.replace("/users/login");
    } else {
      // Manejar otros posibles estados de respuesta
      console.error("Error en la verificación:", result);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
});
