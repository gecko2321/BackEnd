document.querySelector("#logout").onclick = async ()=> {
  const opts ={
      method:"POST",
      headers: {"Content-Type":"aplication/json"}
  }
  let response = await fetch("/api/sessions/signout",opts)
  response = await response.json()
  if (response.statusCode===200){
      location.replace("/")
  }
}
// Llamada a la API para verificar si el usuario está en línea
 fetch("/api/sessions/online")
 .then(response => response.json())
 .then(data => {
   // Verificar si la respuesta es exitosa (statusCode = 200)
   if (data.statusCode === 200) {
     // Usuario en línea, mostrar las etiquetas cart y logout
     document.getElementById('cart').style.display = 'block';
     document.getElementById('logout').style.display = 'block';
   } else {
     // Usuario no está en línea, ocultar las etiquetas cart y logout
     document.getElementById('cart').style.display = 'none';
     document.getElementById('logout').style.display = 'none';
   }
 })
 .catch(error => {
   console.error('Error al verificar estado de sesión:', error);
 });