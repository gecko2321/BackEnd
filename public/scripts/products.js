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
