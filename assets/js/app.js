const baseEndpoint = 'https://api.github.com';
const usersEndpoint = `${baseEndpoint}/users`;
const $n = document.querySelector('.name');  // Se agregó . antes de name
const $b = document.querySelector('.blog');  // Se cambió #blog por .blog
const $l = document.querySelector('.location');

async function displayUser(username) { // Se agrega async al principio para corregir la función
  try {
    $n.textContent = 'Cargando...';

    const response = await fetch(`${usersEndpoint}/${username}`);
    if (!response.ok) { // Validación por si la petición falla
      throw new Error(`Error ${response.status}: No se pudo obtener la información del usuario`);
    }

    const data = await response.json();  // Obtiene el JSON de la respuesta
    console.log(data); // revisa qué datos devuelve la API

    // Actualiza el DOM con los datos obtenidos
    $n.textContent = data.name ? data.name : 'Nombre no disponible';
    $b.textContent = data.blog ? data.blog : 'Blog no disponible';
    $l.textContent = data.location ? data.location : 'Ubicación no disponible';

  } catch (err) {
    handleError(err);  // Maneja los errores en caso de fallo
  }
}

function handleError(err) {
  console.log('Algo salió mal:');
  console.error(err);  // Imprime el error en la consola
  $n.textContent = `Algo salió mal: ${err.message}`;  // Imprime el error en el DOM
}

// Llamada inicial para obtener datos de un usuario específico
displayUser('bluenet-ops').catch(handleError);
