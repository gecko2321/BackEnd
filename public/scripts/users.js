
document.addEventListener("DOMContentLoaded", async () => {
  const userList = document.getElementById("user-list");

  try {
    const response = await fetch("/api/users");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    console.log(data); // Verifica la estructura de los datos

    const users = data.response; // Accede a la propiedad 'response' que contiene el array de usuarios

    if (!Array.isArray(users)) {
      throw new Error("Expected an array of users");
    }

    users.forEach((user) => {
      const userElement = document.createElement("a");
      userElement.href = `/users/${user._id}`;
      userElement.className = "p-3 m-3 w-50 text-light btn btn-success";
      userElement.innerHTML = `
          <img src="${user.photo}" alt="${user.email}" width="100"> -
          ${user.email}
        `;
      userList.appendChild(userElement);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
});


/*
document.addEventListener("DOMContentLoaded", async () => {
  const userList = document.getElementById("user-list");

  try {
    const response = await fetch("/api/users");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    console.log(data); // Verifica la estructura de los datos

    const users = data.response; // Accede a la propiedad 'response' que contiene el array de usuarios

    if (!Array.isArray(users)) {
      throw new Error("Expected an array of users");
    }

    users.forEach((user) => {
      const userElement = document.createElement("a");
      userElement.href = `/users/${user._id}`;
      userElement.className = "p-3 m-3 w-50 text-light btn btn-success";
      userElement.innerHTML = `
          <img src="${user.photo}" alt="${user.email}" width="100"> -
          ${user.email} - ${user.role} - ${user.age || "N/A"}
        `;
      userList.appendChild(userElement);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
});
*/