// Función para eliminar todos los productos del carrito
async function eliminarTodosProductos() {
  try {
    // Obtén el user_id de la sesión actual
    let resp = await fetch("/api/sessions/online");
    resp = await resp.json();
    const user_id = resp.user_id;

    if (!user_id) {
      throw new Error("No se pudo obtener el user_id");
    }

    // Realiza la llamada a /api/tickets para obtener los datos necesarios
    const ticketResponse = await fetch(`/api/tickets/${user_id}`, {
      method: "GET",
    });

    if (ticketResponse.ok) {
      const ticketData = await ticketResponse.json();
      console.log("Datos del ticket:", ticketData);

      // Ahora que tienes los datos del ticket, puedes proceder a eliminar los productos del carrito
      const deleteResponse = await fetch(`/api/carts/all?user_id=${user_id}`, {
        method: "DELETE",
      });

      if (deleteResponse.ok) {
        console.log("Todos los productos han sido eliminados del carrito");
      } else {
        const errorData = await deleteResponse.json();
        console.error("Error al eliminar todos los productos", errorData);
      }
    } else {
      const errorData = await ticketResponse.json();
      console.error("Error al obtener los datos del ticket", errorData);
    }
  } catch (error) {
    console.error("Error al procesar la operación:", error);
  }
}

// Llamar a la función cuando se cargue la página
window.onload = eliminarTodosProductos;
