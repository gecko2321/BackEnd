// Función para obtener productos paginados
async function obtenerProductosPaginados(page) {
  try {
    let resp = await fetch("/api/sessions/online");
    resp = await resp.json();
    const user_id = resp.user_id;
    const response = await fetch(
      `http://localhost:8080/api/carts?user_id=${user_id}&page=${page}`
    );
    if (response.ok) {
      const data = await response.json();
      const products = data.response.docs;
      const cartItemsContainer = document.getElementById("cart-items");
      const noProductsDiv = document.getElementById("no-products");
      const deleteButton = document.getElementById("delete-btn");
      const finishButton = document.getElementById("finish-btn");

      // Si no hay productos, muestra el mensaje y oculta los botones
      if (products.length === 0) {
        noProductsDiv.style.display = "block";
        deleteButton.style.display = "none";
        finishButton.style.display = "none";
      } else {
        noProductsDiv.style.display = "none";
        deleteButton.style.display = "block";
        finishButton.style.display = "block";
      }

      // Limpiar el contenedor antes de agregar nuevos productos
      cartItemsContainer.innerHTML = "";
      // Recorre los productos y crea el HTML para cada tarjeta
      products.forEach((product) => {
        // Genera el HTML para la tarjeta de cada producto
        console.log(product)
        const cardHTML = `
                    <div class="card col-md-4 mx-4 mb-4">                                
                        <img src="${product.product_id.photo}" width="314" height="314" class="card-img-bottom" alt="${product.product_id.title}">
                        <div class="card-body text-center">
<h5 class="card-title">${product.product_id.title}</h5>
<p class="card-text">Precio: $${product.product_id.price}</p>
<!-- Utiliza un input numérico para modificar la cantidad -->
<label for="quantity-${product._id}">Cantidad:</label>
<input type="number" id="quantity-${product._id}" class="form-control" value="${product.quantity}" min="1" onchange="actualizarCantidad('${product._id}', this.value)">
<button class="btn btn-danger btn-sm" onclick="eliminarProducto('${product._id}')">Eliminar</button>
</div>

                    </div>
                `;
        // Agregar el HTML generado al contenedor de productos
        cartItemsContainer.insertAdjacentHTML("beforeend", cardHTML);
      });
      // Actualizar los botones de paginación
      actualizarBotonesPaginacion(data.response);
    } else {
      console.error("Error al obtener los datos");
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

// Función para eliminar un producto del carrito
async function eliminarProducto(id) {
  try {
    const response = await fetch(`http://localhost:8080/api/carts/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      obtenerProductosPaginados(1); // Cargar la primera página después de eliminar el producto
      location.reload();
    } else {
      console.error("Error al eliminar el producto");
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
  }
}

async function eliminarTodosProductos() {
  try {
    let resp = await fetch("/api/sessions/online");
    resp = await resp.json();

    // Agrega depuración para ver la estructura de resp
    console.log("Respuesta de /api/sessions/online:", resp);

    // Extraer user_id directamente del objeto raíz
    const user_id = resp.user_id;

    if (!user_id) {
      throw new Error("No se pudo obtener el user_id");
    }

    const response = await fetch(
      `http://localhost:8080/api/carts/all?user_id=${user_id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      Swal.fire({
        title: "Éxito",
        text: "Todos los productos han sido eliminados del carrito",
        icon: "success",
      }).then(() => {
        location.reload();
      });
    } else {
      const errorData = await response.json();
      console.error("Error al eliminar todos los productos", errorData);
      Swal.fire({
        title: "Error",
        text: errorData.message || "Ocurrió un error al eliminar los productos",
        icon: "error",
      });
    }
  } catch (error) {
    console.error("Error al eliminar todos los productos:", error);
    Swal.fire({
      title: "Error",
      text: error.message || "Ocurrió un error al eliminar los productos",
      icon: "error",
    });
  }
}

function actualizarBotonesPaginacion(response) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";
  if (response.hasPrevPage) {
    paginationContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="btn btn-primary" onclick="obtenerProductosPaginados(${response.prevPage})">Anterior</button>`
    );
  }
  if (response.hasNextPage) {
    paginationContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="btn btn-primary ml-2" onclick="obtenerProductosPaginados(${response.nextPage})">Siguiente</button>`
    );
  }
}

async function finalizarCompra() {
  try {
    const result = await Swal.fire({
      title: '¿Está seguro que desea finalizar la compra?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, finalizar compra'
    });

    if (result.isConfirmed) {
      let resp = await fetch("/api/sessions/online");
      resp = await resp.json();
      const user_id = resp.user_id;
      const response = await fetch(
        `http://localhost:8080/api/tickets/${user_id}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        await eliminarTodosProductos();
        Swal.fire({
          title: 'Compra finalizada',
          //text: 'Todos los productos han sido eliminados del carrito',
          icon: 'success',
        }).then(() => {
          location.reload();
        });
      } else {
        const errorData = await response.json();
        console.error("Error al finalizar la compra", errorData);
        Swal.fire({
          title: 'Error',
          text: errorData.message || 'Ocurrió un error al finalizar la compra',
          icon: 'error',
        });
      }
    }
  } catch (error) {
    console.error("Error al generar ticket", error);
    Swal.fire({
      title: 'Error',
      text: error.message || 'Ocurrió un error al generar el ticket',
      icon: 'error',
    });
  }
}


async function actualizarCantidad(productId, cantidad) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/carts/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: cantidad }),
      }
    );
    if (response.ok) {
      obtenerProductosPaginados(1); // Cargar la primera página después de actualizar la cantidad
      location.reload();
    } else {
      console.error("Error al actualizar la cantidad del producto");
    }
  } catch (error) {
    console.error("Error al actualizar la cantidad del producto:", error);
  }
}

obtenerProductosPaginados(1);
