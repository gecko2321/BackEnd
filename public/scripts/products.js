document.addEventListener("DOMContentLoaded", async () => {
  const filterForm = document.getElementById("filterForm");
  const productsContainer = document.getElementById("productsContainer");

  // Obtener el rol y user_id del usuario logueado
  const userSession = await fetch("/api/sessions/online").then((res) =>
    res.json()
  );
  const role = userSession.role;
  const user_id = userSession.user_id;
  console.log(role);
  console.log(user_id);

  // Mostrar el botón "Mis Productos" si el role es 2 (Proveedor)
  if (role === 2) {
    const misProductosBtn = document.createElement("button");
    misProductosBtn.id = "misProductosBtn";
    misProductosBtn.className = "btn btn-secondary mb-3";
    misProductosBtn.innerText = "Mis Productos";
    misProductosBtn.addEventListener("click", () => {
      window.location.href = "products/Me";
    });

    // Agregar el botón al DOM (por ejemplo, antes del contenedor de productos)
    filterForm.insertAdjacentElement("beforebegin", misProductosBtn);
  }

  // Mostrar el botón "Gestionar Productos" si el role es 1 (Administrador)
  if (role === 1) {
    const gestionarProductosBtn = document.createElement("button");
    gestionarProductosBtn.id = "gestionarProductosBtn";
    gestionarProductosBtn.className = "btn btn-primary mb-3";
    gestionarProductosBtn.innerText = "Gestionar Productos";
    gestionarProductosBtn.addEventListener("click", () => {
      window.location.href = "products/Me";
    });

    // Agregar el botón al DOM (por ejemplo, antes del contenedor de productos)
    filterForm.insertAdjacentElement("beforebegin", gestionarProductosBtn);
  }

  // Función para cargar productos
  const loadProducts = async (category = "", page = 1) => {
    try {
      let url = `/api/products/paginate?page=${page}`;
      if (category) {
        url += `&category=${category}`;
      }

      // Filtrar por supplier_id si el rol es 2 (proveedor)
      if (role === 2) {
        url += `&supplier_id=${user_id}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (
        data.statusCode === 200 &&
        data.response &&
        Array.isArray(data.response.docs)
      ) {
        displayProducts(data.response.docs);
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
  const displayProducts = (products) => {
    productsContainer.innerHTML = ""; // Limpiar el contenedor
    const rowElement = document.createElement("div");
    rowElement.className = "row w-100"; // Clase de Bootstrap para fila

    products.forEach((product) => {
      const colElement = document.createElement("div");
      colElement.className =
        "col-12 col-sm-6 col-md-4 d-flex justify-content-center mb-4"; // Clase de Bootstrap para 3 columnas

      const productElement = document.createElement("a");
      productElement.href = `/products/${product._id}`;
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

      cardBody.appendChild(productTitle);
      productElement.appendChild(productImage);
      productElement.appendChild(cardBody);
      colElement.appendChild(productElement);
      rowElement.appendChild(colElement);
    });

    productsContainer.appendChild(rowElement);
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
        loadProducts("", paginationData.prevPage)
      );
      paginationContainer.appendChild(prevButton);
    }

    if (paginationData.hasNextPage) {
      const nextButton = document.createElement("button");
      nextButton.className = "btn btn-primary m-1";
      nextButton.innerText = "Siguiente";
      nextButton.addEventListener("click", () =>
        loadProducts("", paginationData.nextPage)
      );
      paginationContainer.appendChild(nextButton);
    }
  };

  // Cargar todos los productos al cargar la página
  loadProducts();

  // Filtrar productos cuando se envía el formulario
  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const category = document.getElementById("category").value;
    loadProducts(category);
  });
});
