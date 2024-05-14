// Función para obtener productos paginados
async function obtenerProductosPaginados(page) {
  try {
    let resp= await fetch("/api/sessions/online")
    resp = await resp.json()
    const user_id = resp.user_id
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
    let resp= await fetch("/api/sessions/online")
    resp = await resp.json()
    const user_id = resp.user_id
    const response = await fetch(
      `http://localhost:8080/api/carts?user_id=${user_id}`
    );
    if (response.ok) {
      const data = await response.json();
      const products = data.response.docs;
      // Iterar sobre cada producto y eliminarlo
      for (const product of products) {
        await eliminarProducto(product._id);
      }
      obtenerProductosPaginados(1); // Recargar los productos después de eliminarlos
      //location.reload();
    } else {
      console.error("Error al obtener los datos");
    }
  } catch (error) {
    console.error("Error al eliminar todos los productos:", error);
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
    let resp= await fetch("/api/sessions/online")
    resp = await resp.json()
    const user_id = resp.user_id
    const response = await fetch(
      `http://localhost:8080/api/tickets/${user_id}`,
      {
        method: "GET",
      }
    );
    eliminarTodosProductos();
    location.reload();
  } catch (error) {
    console.error("Error al generar ticket", error);
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
