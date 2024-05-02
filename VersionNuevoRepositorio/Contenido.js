let musicList;
let currentSongIndex = 0; // Inicialmente se establece en 0

// Función para actualizar el índice de la canción actual
function updateCurrentSongIndex(selectedSongIndex) {
  currentSongIndex = selectedSongIndex;
  console.log("Índice de la canción actual actualizado:", currentSongIndex);
  localStorage.setItem("currentSongIndex", currentSongIndex); // Almacenar el nuevo índice en el almacenamiento local
}

// Definir listaCanciones fuera del evento DOMContentLoaded para que esté disponible en todo el script
const listaCanciones = document.getElementById("lista-canciones");

document.addEventListener("DOMContentLoaded", async function () {
  await loadMusicList(); // Cargar la lista de música al cargar la página
  const storedIndex = localStorage.getItem("currentSongIndex"); // Obtener el índice de la canción almacenado en el almacenamiento local
  if (storedIndex !== null) {
    currentSongIndex = parseInt(storedIndex); // Convertir a entero y asignar como el nuevo índice de la canción actual
    console.log(
      "Índice de la canción actual actualizado por almacenamiento local:",
      currentSongIndex
    );
  }
});

async function loadMusicList() {
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

  // Reiniciar la lista de canciones antes de comenzar a cargar nuevas listas
  musicList = [];

  try {
    for (const url of additionalURLs) {
      const response = await fetch(url);
      const additionalMusicList = await response.json();

      // Filtrar las canciones duplicadas basándose en una combinación única de título y álbum
      const filteredAdditionalMusicList = additionalMusicList.filter((song) => {
        return !musicList.some(
          (existingSong) =>
            existingSong.titulo === song.titulo &&
            existingSong.album === song.album
        );
      });

      musicList = musicList.concat(filteredAdditionalMusicList);

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
    console.error("Error al cargar el JSON adicional:", error);
  }
}

// Función para cargar la información de la canción actual
function loadCurrentSong() {
  const currentSong = musicList[currentSongIndex];
  // Resto del código para cargar la canción actual
}

function createSongDiv(song, index) {
  const divContainer = document.createElement("div");
  divContainer.classList.add("list-group-item");

  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row", "align-items-center");

  const imgDiv = document.createElement("div");
  imgDiv.classList.add("col-sm-2", "text-center");
  const img = document.createElement("img");
  img.src = ``;
  img.width = 50;
  img.height = 50;

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
