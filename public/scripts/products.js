/*
document.addEventListener('DOMContentLoaded', () => {
    const filterForm = document.getElementById('filterForm');
    const productsContainer = document.getElementById('productsContainer');

    // Función para cargar productos
    const loadProducts = async (category = '') => {
        try {
            console.log("fetcheo proddddssss")
            let url = 'http://localhost:8080/api/products';
            if (category) {
                url += `?category=${category}`;
            }
            const response = await fetch(url);
            const data = await response.json();

            // Verificar si la respuesta tiene el formato esperado
            if (data.statusCode === 200 && Array.isArray(data.response)) {
                displayProducts(data.response);
            } else {
                console.error('Unexpected response format:', data);
                productsContainer.innerHTML = '<p>Error al cargar los productos.</p>';
            }
        } catch (error) {
            console.error('Error al cargar los productos:', error);
            productsContainer.innerHTML = '<p>Error al cargar los productos.</p>';
        }
    };

    // Función para mostrar productos
    const displayProducts = (products) => {
        productsContainer.innerHTML = ''; // Limpiar el contenedor
        products.forEach(product => {
            const productElement = document.createElement('a');
            productElement.href = `/products/${product._id}`;
            productElement.className = 'p-3 m-3 w-50 text-light btn btn-success';
            productElement.innerHTML = `${product.title} - Precio $${product.price}`;
            productsContainer.appendChild(productElement);
        });
    };

    // Cargar todos los productos al cargar la página
    loadProducts();

    // Filtrar productos cuando se envía el formulario
    filterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const category = document.getElementById('category').value;
        loadProducts(category);
    });
});
*/



document.addEventListener('DOMContentLoaded', () => {
    
    const filterForm = document.getElementById('filterForm');
    const productsContainer = document.getElementById('productsContainer');

    // Función para cargar productos
    const loadProducts = async (category = '', page = 1) => {
        try {
            
            let url = `/api/products/paginate?page=${page}`;
            if (category) {
                url += `&category=${category}`;
            }
            const response = await fetch(url);
            const data = await response.json();

            // Verificar si la respuesta tiene el formato esperado
            if (data.statusCode === 200 && data.response && Array.isArray(data.response.docs)) {
                displayProducts(data.response.docs);
                updatePagination(data.response);
            } else {
                console.error('Unexpected response format:', data);
                productsContainer.innerHTML = '<p>Error al cargar los productos.</p>';
            }
        } catch (error) {
            console.error('Error al cargar los productos:', error);
            productsContainer.innerHTML = '<p>Error al cargar los productos.</p>';
        }
    };

    // Función para mostrar productos
const displayProducts = (products) => {
    productsContainer.innerHTML = ''; // Limpiar el contenedor
    const rowElement = document.createElement('div');
    rowElement.className = 'row w-100'; // Clase de Bootstrap para fila

    products.forEach(product => {
        const colElement = document.createElement('div');
        colElement.className = 'col-12 col-sm-6 col-md-4 d-flex justify-content-center mb-4'; // Clase de Bootstrap para 3 columnas

        const productElement = document.createElement('a');
        productElement.href = `/products/${product._id}`;
        productElement.className = 'card'; // Usar clase card de Bootstrap para mejor diseño

        const productImage = document.createElement('img');
        productImage.src = product.photo;
        productImage.alt = product.title;
        productImage.className = 'card-img-top product-image'; // Clase para estilizar la imagen

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body d-flex flex-column align-items-center';

        const productTitle = document.createElement('h5');
        productTitle.innerText = product.title;
        productTitle.className = 'card-title';

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
        const paginationContainer = document.getElementById('paginationContainer');
        paginationContainer.innerHTML = ''; // Limpiar el contenedor

        if (paginationData.hasPrevPage) {
            const prevButton = document.createElement('button');
            prevButton.className = 'btn btn-primary m-1';
            prevButton.innerText = 'Anterior';
            prevButton.addEventListener('click', () => loadProducts('', paginationData.prevPage));
            paginationContainer.appendChild(prevButton);
        }

        if (paginationData.hasNextPage) {
            const nextButton = document.createElement('button');
            nextButton.className = 'btn btn-primary m-1';
            nextButton.innerText = 'Siguiente';
            nextButton.addEventListener('click', () => loadProducts('', paginationData.nextPage));
            paginationContainer.appendChild(nextButton);
        }
    };

    // Cargar todos los productos al cargar la página
    loadProducts();

    // Filtrar productos cuando se envía el formulario
    filterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const category = document.getElementById('category').value;
        loadProducts(category);
    });
});