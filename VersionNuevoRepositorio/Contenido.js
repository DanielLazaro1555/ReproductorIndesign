// Declaración de variables
let musicList; // Lista de canciones
let currentSongIndex = 0; // Índice de la canción actual. Inicialmente se establece en 0

// Función para actualizar el índice de la canción actual
function updateCurrentSongIndex(selectedSongIndex) {
  currentSongIndex = selectedSongIndex; // Actualizar el índice de la canción actual
  console.log("Índice de la canción actual actualizado:", currentSongIndex); // Imprimir el índice de la canción actual en la consola
  localStorage.setItem("currentSongIndex", currentSongIndex); // Almacenar el nuevo índice en el almacenamiento local
}

// Definir listaCanciones fuera del evento DOMContentLoaded para que esté disponible en todo el script
const listaCanciones = document.getElementById("lista-canciones");

// Evento que se dispara cuando el DOM ha sido completamente cargado
document.addEventListener("DOMContentLoaded", async function () {
  await loadMusicList(); // Cargar la lista de música al cargar la página
  const storedIndex = localStorage.getItem("currentSongIndex"); // Obtener el índice de la canción almacenado en el almacenamiento local
  if (storedIndex !== null) {
    currentSongIndex = parseInt(storedIndex); // Convertir a entero y asignar como el nuevo índice de la canción actual
    console.log(
      "Índice de la canción actual actualizado por almacenamiento local:",
      currentSongIndex
    ); // Imprimir el índice de la canción actual actualizado por el almacenamiento local en la consola
  }
});
// Función asincrónica para cargar la lista de música
async function loadMusicList() {
  // URLs adicionales de donde cargar la lista de música
  const additionalURLs = [
    "https://raw.githubusercontent.com/DanielLazaro1555/Musica1/main/public/bd0.json",
  ];

  // Reiniciar la lista de canciones antes de comenzar a cargar nuevas listas
  musicList = [];

  try {
    // Iterar sobre cada URL adicional
    for (const url of additionalURLs) {
      // Realizar una solicitud para obtener los datos de la lista de música
      const response = await fetch(url);
      // Convertir la respuesta a formato JSON
      const additionalMusicList = await response.json();

      // Filtrar las canciones duplicadas basándose en una combinación única de título y álbum
      const filteredAdditionalMusicList = additionalMusicList.filter((song) => {
        return !musicList.some(
          (existingSong) =>
            existingSong.titulo === song.titulo &&
            existingSong.album === song.album
        );
      });

      // Concatenar las nuevas canciones filtradas a la lista de música
      musicList = musicList.concat(filteredAdditionalMusicList);

      // Si existe el elemento "listaCanciones" en el DOM, agregar las nuevas canciones a la lista
      if (listaCanciones) {
        filteredAdditionalMusicList.forEach((song, index) => {
          const songDiv = createSongDiv(
            song,
            musicList.length - filteredAdditionalMusicList.length + index
          );
          listaCanciones.appendChild(songDiv);
        });
      }
    }
  } catch (error) {
    console.error("Error al cargar el JSON adicional:", error); // Manejo de errores en caso de fallo al cargar el JSON adicional
  }
}
// Función para cargar la información de la canción actual
function loadCurrentSong() {
  const currentSong = musicList[currentSongIndex];
  // Resto del código para cargar la canción actual
}

// Función para crear un elemento de lista de canciones (div) con la información de la canción
function createSongDiv(song, index) {
  const divContainer = document.createElement("div");
  divContainer.classList.add("list-group-item", "mb-3", "border", "border"); // Agregar clase "border" y "border-danger" para un borde rojo

  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row", "align-items-center");

  const imgDiv = document.createElement("div");
  imgDiv.classList.add("col-md-2", "text-center", "mb-3", "mb-md-0");

  const img = document.createElement("img");
  img.src =
    "https://raw.githubusercontent.com/DanielLazaro1555/Musica1/main/public/" +
    song.imagen;
  img.width = 50;
  img.height = 50;

  // Aplicar estilos CSS para redondear las esquinas de la imagen
  img.style.borderRadius = "10px"; // Puedes ajustar el valor para cambiar la cantidad de redondeo

  imgDiv.appendChild(img);
  rowDiv.appendChild(imgDiv);

  const titleDiv = document.createElement("div");
  titleDiv.classList.add("col-sm-3", "text-truncate");
  titleDiv.textContent = song.titulo;
  rowDiv.appendChild(titleDiv);

  const artistDiv = document.createElement("div");
  artistDiv.classList.add("col-sm-3", "text-truncate");
  artistDiv.textContent = song.artista;
  rowDiv.appendChild(artistDiv);

  const albumDiv = document.createElement("div");
  albumDiv.classList.add("col-sm-3", "text-truncate");
  albumDiv.textContent = song.album;
  rowDiv.appendChild(albumDiv);

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("col-sm-1", "text-center");
  const button = document.createElement("button");
  button.classList.add("btn", "btn-transparent", "btn-block");
  const playIcon = document.createElement("img");
  playIcon.src = "Play.png";
  playIcon.width = 20;
  playIcon.height = 20;
  button.appendChild(playIcon);
  buttonDiv.appendChild(button);
  rowDiv.appendChild(buttonDiv);

  button.addEventListener("click", function () {
    updateCurrentSongIndex(index);
    loadCurrentSong();
    const baseURL =
      "https://github.com/DanielLazaro1555/Musica1/raw/main/public/";
    const fileURL = baseURL + song.archivo_musica;
    console.log("URL completa del archivo de música:", fileURL);

    const params = new URLSearchParams({
      title: song.titulo,
      artist: song.artista,
      album: song.album,
      fileURL: fileURL,
    });

    window.location.href = "Reproduccion.html?" + params.toString();
  });

  divContainer.appendChild(rowDiv);

  return divContainer;
}
