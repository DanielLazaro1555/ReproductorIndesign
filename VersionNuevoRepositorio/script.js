// Función para cargar el JSON y obtener la lista de canciones
async function loadMusicList() {
  try {
    const additionalURLs = [
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica1/main/public/bd0.json",
    ];

    // Array para almacenar las respuestas de fetch
    const responses = [];

    // Iterar sobre cada URL y llamar a fetch para obtener la respuesta
    for (const url of additionalURLs) {
      const response = await fetch(url);
      responses.push(response); // Almacenar la respuesta en el array
    }

    // Array para almacenar los resultados JSON
    const jsonResults = [];

    // Iterar sobre cada respuesta y obtener el JSON
    for (const response of responses) {
      const json = await response.json();
      jsonResults.push(json); // Almacenar el JSON en el array
    }

    // Combinar los resultados JSON en una sola lista de canciones
    musicList = jsonResults.flat();

    // Cargar la primera canción cuando se obtiene la lista de canciones
    loadCurrentSong();
  } catch (error) {
    console.error("Error al cargar el JSON:", error);
  }
}

// Cargar la lista de canciones cuando se carga la página
window.onload = loadMusicList;
