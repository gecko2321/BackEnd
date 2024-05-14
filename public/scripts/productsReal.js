const socket = io();
  socket.on("products", data => {
    //console.log(data)
    const template = data
        .map(each => ` <img style="width: 50%; height: 50%" src="${each.photo}" class="object-fit-cover p-3" alt="${each.id}"> `)
        .reverse()
        .splice(0)
        .join("")
    document.querySelector("#products").innerHTML = template
  })
  // document.querySelector("#ingresarPrd").addEventListener("click", (event) => {
  //   let title = document.querySelector("#title").value
  //   let photo = document.querySelector("#photo").value
  //   let category = document.querySelector("#category").value
  //   let price = document.querySelector("#price").value
  //   let stock = document.querySelector("#stock").value
  //   socket.emit("new_product", { title,photo,category,price,stock })
  // })

  document.querySelector("#ingresarPrd").addEventListener("click", async () => {
    const data = {
      title: document.querySelector("#title").value,
      photo: document.querySelector("#photo").value,
      category: document.querySelector("#category").value,
      price: document.querySelector("#price").value,
      stock: document.querySelector("#stock").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/products", opts);
    response = await response.json();
    if (response.statusCode === 201) {
      Swal.fire({
        title: response.message,
        icon: "success",
        timer: 5000,
        timerProgressBar: true,
        confirmButtonColor: "#ff3b3c",
      });
  
      //return location.replace("/users/login");
    } else {
      Swal.fire({
        title: response.message,
        icon: "error",
        timer: 5000,
        timerProgressBar: true,
        confirmButtonColor: "#ff3b3c",
      });
    }
  });
  