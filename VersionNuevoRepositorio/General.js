let musicList;

let currentSongIndex = 0; // Inicialmente se establece en 0

// En General.js
function updateCurrentSongIndex(index) {
    currentSongIndex = index;
    console.log("Índice de la canción actual actualizado:", currentSongIndex);
}

// Función para cargar la información de la canción actual
function loadCurrentSong() {
    const currentSong = musicList[currentSongIndex];
    // Resto del código para cargar la canción actual
}
