// Archivo: ReproduccionData.js

document.addEventListener("DOMContentLoaded", function () {
    // Leer los parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const title = params.get("title");
    const artist = params.get("artist");
    const album = params.get("album");
    const fileURL = params.get("fileURL");

    // Mostrar la información de la canción seleccionada en la página
    const songInfoDiv = document.getElementById("song-info");
    songInfoDiv.innerHTML = `
        <p class="mb-0"><strong>Título:</strong> ${title}</p>
        <p class="mb-0"><strong>Artista:</strong> ${artist}</p>
        <p class="mb-0"><strong>Álbum:</strong> ${album}</p>
        <audio controls class="mt-3" src="${fileURL}" id="audio-player"></audio>
    `;

    // Obtener el elemento del botón "Siguiente"
    const nextButton = document.getElementById("next-song");

    // Agregar un evento de clic al botón "Siguiente"
    nextButton.addEventListener("click", function () {
        // Obtener el elemento de audio
        const audioPlayer = document.getElementById("audio-player");
        
        // Detener la reproducción actual
        audioPlayer.pause();
        
        // Avanzar a la siguiente canción (puedes implementar esta lógica según tu aplicación)
        // Por ahora, simplemente mostraremos un mensaje en la consola
        console.log("Avanzar a la siguiente canción...");
        
        // Reproducir la siguiente canción (puedes implementar esta lógica según tu aplicación)
        // Por ahora, simplemente reiniciaremos la reproducción actual
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    });
});
