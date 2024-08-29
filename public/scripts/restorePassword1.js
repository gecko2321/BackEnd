document
  .getElementById("changePasswordForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const code = document.getElementById("verifyCode").value;
    const newpassword = document.getElementById("newPassword").value;

    try {
      const response = await fetch('/api/sessions/password', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code, newpassword }),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Contraseña cambiada",
          text: "Su contraseña ha sido cambiada exitosamente.",
          icon: "success",
        }).then(() => {
          // Redirigir al usuario al login después de cambiar la contraseña
          window.location.href = "/users/login";
        });
      } else {
        Swal.fire({
          title: "Error",
          text: result.message || "Ocurrió un error al cambiar la contraseña.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al procesar la solicitud.",
        icon: "error",
      });
    }
  });
