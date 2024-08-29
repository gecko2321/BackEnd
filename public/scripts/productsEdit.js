document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("pid");

  if (productId) {
    try {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();

      if (response.ok) {
        const product = data.response; // Acceder a la propiedad 'response'

        // Rellenar los campos del formulario con los datos del producto
        document.getElementById("title").value = product.title;
        document.getElementById("category").value = product.category;
        document.getElementById("price").value = product.price;
        document.getElementById("stock").value = product.stock;
        document.getElementById("photo").value = product.photo;
      } else {
        console.error(
          "Error al obtener los datos del producto:",
          data.message || "Respuesta inesperada"
        );
      }
    } catch (error) {
      console.error("Error al obtener los datos del producto:", error);
    }
  } else {
    console.error("No se proporcionó el ID del producto en la URL.");
  }
});

document
  .getElementById("editProductForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const productId = new URLSearchParams(window.location.search).get("pid");

    if (productId) {
      const updatedProduct = {
        title: document.getElementById("title").value,
        category: document.getElementById("category").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
        photo: document.getElementById("photo").value,
      };

      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        });

        if (response.ok) {
          Swal.fire(
            "Producto actualizado",
            "El producto se actualizó correctamente",
            "success"
          ).then(() => {
            // Redirigir a la vista products/Me y recargar la página
            window.location.href = "/products/Me";
          });
        } else {
          const result = await response.json();
          Swal.fire(
            "Error",
            result.message || "No se pudo actualizar el producto",
            "error"
          );
        }
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
        Swal.fire(
          "Error",
          "Ocurrió un error al intentar actualizar el producto",
          "error"
        );
      }
    } else {
      Swal.fire(
        "Error",
        "No se proporcionó el ID del producto en la URL",
        "error"
      );
    }
  });
