// Función para cargar la información de la canción actual
async function loadCurrentSong() {
  // Verificar si hay canciones cargadas y si el número almacenado está dentro del rango de índices
  if (
    musicList && // Verificar si musicList está definido
    musicList.length > 0 &&
    currentSongIndex >= 0 &&
    currentSongIndex < musicList.length
  ) {
    // console.log(`El número almacenado es: ${currentSongIndex}`);
    // Obtener la información de la canción actual desde la lista de canciones usando el índice almacenado
    const currentSong = musicList[currentSongIndex];
    // console.log("Canción actual cargada:");
    // console.log(`Título: ${currentSong.titulo}`);
    // console.log(`Artista: ${currentSong.artista}`);
    // console.log(`Álbum: ${currentSong.album}`);

    // Llamar a la función para comparar la canción con los enlaces
    await compararMusicaConEnlace(currentSong.titulo, currentSong.album);
    // Establecer la URL de la música y la imagen
    const imageUrl = currentSong.imagen;
    const musicUrl = currentSong.archivo_musica;
    // console.log(`URL de la imagen: ${imageUrl}`);
    // console.log(`URL de la música: ${musicUrl}`);

    // Concatenar la parte común de la URL con la URL de la imagen
    const fullImageUrl = urlCommonPart + imageUrl;
    // console.log(`Enlace completo de la imagen: ${fullImageUrl}`);
    const fullmusicUrl = urlCommonPart + musicUrl;
    // console.log(`Enlace completo de la música: ${fullmusicUrl}`);

    // Establecer la URL de la imagen como fondo de la página - CAMBIO 1
    document.body.style.backgroundImage = `url('${fullImageUrl}')`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover"; // Para hacer que la imagen cubra todo el fondo
    document.body.style.backgroundPosition = "center"; // Para centrar la imagen en el fondo

    // Establecer la URL de la imagen en el contenedor de imagen
    const imageContainer = document.querySelector(".image-container");
    const image = imageContainer.querySelector("img");
    image.src = fullImageUrl;
    image.alt = currentSong.titulo;

    // Establecer el título de la música
    const titleElement = document.querySelector(".music-title");
    titleElement.textContent = currentSong.titulo;

    // Establecer el nombre del artista
    const artistNameElement = document.querySelector(".artist-name");
    artistNameElement.textContent = currentSong.artista;

    // Establecer la URL del archivo de música en el reproductor de audio
    const audioPlayer = document.getElementById("audio-player");
    const audioSource = document.getElementById("audio-source");
    audioSource.src = fullmusicUrl;
    audioPlayer.load(); // Cargar el archivo de música
    audioPlayer.play(); // Reproducir la música automáticamente - CAMBIO 1
  } else {
    // console.log("No se encontró ninguna canción con el número almacenado.");
  }
}

// Función para comparar el título y el álbum de la canción con los títulos y álbumes de las canciones en cada enlace y mostrar el enlace correspondiente si hay coincidencia
async function compararMusicaConEnlace(tituloCancion, albumCancion) {
  // Definir los enlaces
  const additionalURLs = [
    "https://raw.githubusercontent.com/DanielLazaro1555/Musica1/main/public/bd0.json",
  ];

  // Iterar sobre cada enlace
  for (let i = 0; i < additionalURLs.length; i++) {
    const url = additionalURLs[i];
    try {
      // Cargar los datos JSON desde el enlace
      const response = await fetch(url);
      const data = await response.json();

      // Iterar sobre cada canción en los datos
      for (const cancion of data) {
        // Comparar el título y el álbum de la canción actual con el título y álbum de la canción en los datos
        if (
          cancion.titulo === tituloCancion &&
          cancion.album === albumCancion
        ) {
          // console.log(
          //   `La canción "${tituloCancion}" del álbum "${albumCancion}" proviene de: ${url}`
          // );

          // Imprimir la parte común de la URL
          const commonPart = url.substring(0, url.lastIndexOf("/") + 1);
          // console.log(`Parte común de la URL: ${commonPart}`);

          // Guardar la parte común de la URL para usarla más tarde
          urlCommonPart = commonPart;

          return; // Detener la búsqueda una vez que se encuentra una coincidencia
        }
      }
    } catch (error) {
      // console.error(`Error al cargar los datos desde ${url}: ${error}`);
    }
  }

  // Si no se encuentra ninguna coincidencia
  // console.log(
  //   `No se encontró ninguna URL correspondiente para la canción "${tituloCancion}" del álbum "${albumCancion}".`
  // );
}

// Llamar a la función para cargar la canción actual
loadCurrentSong();
