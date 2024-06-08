document.querySelector("#logout").onclick = async () => {
  // Muestra la alerta de confirmación
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "¿Quieres cerrar sesión?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, cerrar sesión",
    cancelButtonText: "Cancelar",
  });

  // Si el usuario confirma, procede con el cierre de sesión
  if (result.isConfirmed) {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch("/api/sessions/signout", opts);
    response = await response.json();
    if (response.statusCode === 200) {
      location.replace("/");
    } else {
      Swal.fire(
        "Error",
        "No se pudo cerrar sesión. Intenta nuevamente.",
        "error"
      );
    }
  }
};

// Llamada a la API para verificar si el usuario está en línea
fetch("/api/sessions/online")
  .then((response) => response.json())
  .then((data) => {
    // Verificar si la respuesta es exitosa (statusCode = 200)
    if (data.statusCode === 200) {
      // Usuario en línea, mostrar las etiquetas cart y logout
      document.getElementById("cart").style.display = "block";
      document.getElementById("logout").style.display = "block";
      // Ocultar el botón de login
      document.getElementById("login").style.display = "none";
    } else {
      // Usuario no está en línea, ocultar las etiquetas cart y logout
      document.getElementById("cart").style.display = "none";
      document.getElementById("logout").style.display = "none";
      // Mostrar el botón de login
      document.getElementById("login").style.display = "block";
    }
  })
  .catch((error) => {
    console.error("Error al verificar estado de sesión:", error);
    // En caso de error, asegurar que el botón de login esté visible
    document.getElementById("login").style.display = "block";
  });


  