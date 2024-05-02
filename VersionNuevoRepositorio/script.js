// Función para cargar el JSON y obtener la lista de canciones
async function loadMusicList() {
  try {
    const additionalURLs = [
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica1/main/public/bd0.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica2/main/public/bd1.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica3/main/public/bd2.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica4/main/public/bd3.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica5/main/public/bd4.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica6/main/public/bd5.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica7/main/public/bd6.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica8/main/public/bd7.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica9/main/public/bd8.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica10/main/public/bd9.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica11/main/public/bd10.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica12/main/public/bd11.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica13/main/public/bd12.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica14/main/public/bd13.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica15/main/public/bd14.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica16/main/public/bd15.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica17/main/public/bd16.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica18/main/public/bd17.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica19/main/public/bd18.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica20/main/public/bd19.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica21/main/public/bd20.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica22/main/public/bd21.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica23/main/public/bd22.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica24/main/public/bd23.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica25/main/public/bd24.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica26/main/public/bd25.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica27/main/public/bd26.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica28/main/public/bd27.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica29/main/public/bd28.json",
      "https://raw.githubusercontent.com/DanielLazaro1555/Musica30/main/public/bd29.json",
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
