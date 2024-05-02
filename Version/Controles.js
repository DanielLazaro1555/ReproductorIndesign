// Función para avanzar a la siguiente canción
function nextSong() {
    // Incrementar el índice de la canción actual
    currentSongIndex++;
  
    // Verificar si hay una canción siguiente en la lista
    if (currentSongIndex < musicList.length) {
      // Cargar y reproducir la siguiente canción
      loadCurrentSong(currentSongIndex);
    } else {
      // Si no hay más canciones, volver al inicio de la lista
      currentSongIndex = 0;
      loadCurrentSong(currentSongIndex);
    }
  }
  
  // Función para retroceder a la canción anterior
  function prevSong() {
    // Decrementar el índice de la canción actual
    currentSongIndex--;
  
    // Verificar si hay una canción anterior en la lista
    if (currentSongIndex >= 0) {
      // Cargar y reproducir la canción anterior
      loadCurrentSong(currentSongIndex);
    } else {
      // Si estamos al principio de la lista, cargar la última canción
      currentSongIndex = musicList.length - 1;
      loadCurrentSong(currentSongIndex);
    }
  }
  
  // Función para pausar o reproducir la canción actual
  function togglePlayPause() {
    const audioPlayer = document.getElementById("audio-player");
    if (audioPlayer.paused) {
      audioPlayer.play(); // Reproducir la música si está pausada
    } else {
      audioPlayer.pause(); // Pausar la música si se está reproduciendo
    }
  }