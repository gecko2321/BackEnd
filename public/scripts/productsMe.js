document.addEventListener("DOMContentLoaded", async () => {
  const productsContainer = document.getElementById("productsContainer");

  // Obtener el user_id y role del usuario logueado
  const userSession = await fetch("/api/sessions/online").then((res) =>
    res.json()
  );
  const user_id = userSession.user_id;
  const user_role = userSession.role; // Obtener el rol del usuario

  // Función para cargar productos del usuario logueado
  const loadMyProducts = async (category = "", page = 1) => {
    try {
      let url = `/api/products/me?page=${page}`;
      if (category) {
        url += `&category=${category}`;
      }

      // Aplica el filtro supplier_id solo si el usuario tiene role = 2
      if (user_role === 2) {
        url += `&supplier_id=${user_id}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (
        data.statusCode === 200 &&
        data.response &&
        Array.isArray(data.response.docs)
      ) {
        displayMyProducts(data.response.docs);
        updatePagination(data.response);
      } else {
        console.error("Unexpected response format:", data);
        productsContainer.innerHTML = "<p>Error al cargar los productos.</p>";
      }
    } catch (error) {
      console.error("Error al cargar los productos:", error);
      productsContainer.innerHTML = "<p>Error al cargar los productos.</p>";
    }
  };

  // Función para mostrar productos
  const displayMyProducts = (products) => {
    productsContainer.innerHTML = ""; // Limpiar el contenedor
    const rowElement = document.createElement("div");
    rowElement.className = "row w-100"; // Clase de Bootstrap para fila

    products.forEach((product) => {
      const colElement = document.createElement("div");
      colElement.className =
        "col-12 col-sm-6 col-md-4 d-flex justify-content-center mb-4"; // Clase de Bootstrap para 3 columnas

      const productElement = document.createElement("div");
      productElement.className = "card"; // Usar clase card de Bootstrap para mejor diseño

      const productImage = document.createElement("img");
      productImage.src = product.photo;
      productImage.alt = product.title;
      productImage.className = "card-img-top product-image"; // Clase para estilizar la imagen

      const cardBody = document.createElement("div");
      cardBody.className = "card-body d-flex flex-column align-items-center";

      const productTitle = document.createElement("h5");
      productTitle.innerText = product.title;
      productTitle.className = "card-title";

      const editButton = document.createElement("a");
      editButton.href = `/products/edit?pid=${product._id}`;
      editButton.className = "btn btn-warning mt-2";
      editButton.innerText = "Editar Producto";

      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-danger mt-2";
      deleteButton.innerText = "Eliminar Producto";
      deleteButton.addEventListener("click", () => deleteProduct(product._id));

      cardBody.appendChild(productTitle);
      cardBody.appendChild(editButton);
      cardBody.appendChild(deleteButton);
      productElement.appendChild(productImage);
      productElement.appendChild(cardBody);
      colElement.appendChild(productElement);
      rowElement.appendChild(colElement);
    });

    productsContainer.appendChild(rowElement);
  };

  // Función para eliminar producto con SweetAlert
  const deleteProduct = async (productId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "No, cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`/api/products/${productId}`, {
            method: "DELETE",
          });
          Swal.fire("¡Eliminado!", "El producto ha sido eliminado.", "success");
          loadMyProducts(); // Recargar productos después de la eliminación
        } catch (error) {
          console.error("Error al eliminar el producto:", error);
        }
      }
    });
  };

  // Función para actualizar la paginación
  const updatePagination = (paginationData) => {
    const paginationContainer = document.getElementById("paginationContainer");
    paginationContainer.innerHTML = ""; // Limpiar el contenedor

    if (paginationData.hasPrevPage) {
      const prevButton = document.createElement("button");
      prevButton.className = "btn btn-primary m-1";
      prevButton.innerText = "Anterior";
      prevButton.addEventListener("click", () =>
        loadMyProducts("", paginationData.prevPage)
      );
      paginationContainer.appendChild(prevButton);
    }

    if (paginationData.hasNextPage) {
      const nextButton = document.createElement("button");
      nextButton.className = "btn btn-primary m-1";
      nextButton.innerText = "Siguiente";
      nextButton.addEventListener("click", () =>
        loadMyProducts("", paginationData.nextPage)
      );
      paginationContainer.appendChild(nextButton);
    }
  };

  // Cargar todos los productos del usuario al cargar la página
  loadMyProducts();
});
