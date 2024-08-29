document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("edit-user-form");

  // Obtener el ID del usuario de la URL
  const userId = window.location.pathname.split("/").slice(-1)[0];

  // Manejar el envío del formulario para actualizar el usuario
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const updatedUser = {
      name: document.getElementById("name").value,
      lname: document.getElementById("lname").value,
      email: document.getElementById("email").value,
      age: parseInt(document.getElementById("age").value, 10),
      photo: document.getElementById("photo").value,
      role: parseInt(document.getElementById("role").value, 10),
      verified: document.getElementById("verified").checked,
      verifyCode: document.getElementById("verifyCode").value,
    };

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        alert("Usuario actualizado exitosamente");
        window.location.href = "/users";
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error actualizando usuario");
      }
    } catch (error) {
      console.error("Error en la actualización:", error);
      alert("Hubo un problema al actualizar el usuario. Inténtalo de nuevo.");
    }
  });
});
