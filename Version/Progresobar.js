// Función para calcular el tiempo transcurrido y restante en base al progreso
function calcularTiempo(audioPlayer) {
  // Verificar si la duración del audio es un número válido
  if (!isNaN(audioPlayer.duration)) {
    const duracionTotal = audioPlayer.duration;
    const tiempoTranscurrido = Math.floor(audioPlayer.currentTime);
    const tiempoRestante = Math.floor(duracionTotal - tiempoTranscurrido);

    // Formatear los tiempos en formato MM:SS
    function formatearTiempo(tiempo) {
      const minutos = Math.floor(tiempo / 60);
      const segundos = tiempo % 60;
      return minutos + ":" + (segundos < 10 ? "0" : "") + segundos;
    }

    return {
      tiempoTranscurrido: formatearTiempo(tiempoTranscurrido),
      tiempoRestante: "-" + formatearTiempo(Math.abs(tiempoRestante)),
    };
  } else {
    // Si la duración no está disponible, devuelve tiempos vacíos
    return {
      tiempoTranscurrido: "0:00",
      tiempoRestante: "0:00",
    };
  }
}

// Función para actualizar la barra de progreso con aproximadamente 60 fps
function updateProgressBar() {
  const audioPlayer = document.getElementById("audio-player");
  const progressBar = document.getElementById("progress-bar");
  const tiempo = calcularTiempo(audioPlayer); // Obtener tiempo transcurrido y restante
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = progress + "%";

  // Actualizar los elementos HTML con los tiempos transcurrido y restante
  document.getElementById("tiempo-transcurrido").textContent =
    tiempo.tiempoTranscurrido;
  document.getElementById("tiempo-restante").textContent =
    tiempo.tiempoRestante;

  requestAnimationFrame(updateProgressBar); // Solicitar la próxima actualización de la barra de progreso
}

// Iniciar la actualización de la barra de progreso cuando el audio comience a reproducirse
const audioPlayer = document.getElementById("audio-player");
audioPlayer.addEventListener("play", function () {
  setTimeout(updateProgressBar, 1000 / 60); // Iniciar la actualización con un intervalo aproximado de 16.67 ms (aproximadamente 60 fps)
});

// Función para actualizar la barra de progreso al hacer clic en ella
function seek(event) {
  const progressBar = document.getElementById("progress-bar");
  const progressContainer = document.querySelector(".progress");

  // Calcular la posición del clic dentro de la barra de progreso
  const clickPosition =
    event.clientX - progressContainer.getBoundingClientRect().left;
  const progressBarWidth = progressContainer.clientWidth;
  const progress = (clickPosition / progressBarWidth) * 100;

  // Actualizar la apariencia de la barra de progreso
  progressBar.style.width = progress + "%";

  // Obtener el reproductor de audio
  const audioPlayer = document.getElementById("audio-player");

  // Calcular el tiempo correspondiente en la pista de audio
  const audioDuration = audioPlayer.duration;
  const seekTime = (progress / 100) * audioDuration;

  // Establecer la posición de reproducción en el reproductor de audio
  audioPlayer.currentTime = seekTime;
}

// Event listener para detectar cuando la canción actual termina
audioPlayer.addEventListener("ended", nextSong);
