document.getElementById('restorePasswordForm').addEventListener('submit', async function(e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
  
    try {
      const response = await fetch('/api/sessions/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        Swal.fire({
          title: 'Código enviado',
          text: 'Se ha enviado un código de verificación a su correo electrónico.',
          icon: 'success',
        }).then(() => {
          // Redirigir a la vista de restablecimiento de contraseña
          window.location.href = '/users/password';
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: result.message || 'Ocurrió un error al enviar el código.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al procesar la solicitud.',
        icon: 'error',
      });
    }
  });
  