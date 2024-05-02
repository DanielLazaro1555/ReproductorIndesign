document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("input", function () {
    filterSongs(this.value.trim().toLowerCase());
  });

  loadMusicList(); // Cargar la lista de música al cargar la página
});

function filterSongs(searchTerm) {
  const songs = document.querySelectorAll(".list-group-item");

  // Iterar sobre todas las canciones
  songs.forEach((song) => {
    const title = song
      .querySelector(".col-sm-3:nth-of-type(2)")
      .textContent.toLowerCase();
    const artist = song
      .querySelector(".col-sm-3:nth-of-type(3)")
      .textContent.toLowerCase();
    const album = song
      .querySelector(".col-sm-3:nth-of-type(4)")
      .textContent.toLowerCase();

    // Comprobar si el término de búsqueda está presente en el título, artista o álbum de la canción
    if (
      title.includes(searchTerm) ||
      artist.includes(searchTerm) ||
      album.includes(searchTerm)
    ) {
      song.style.display = "block"; // Mostrar la canción si coincide con el término de búsqueda
    } else {
      song.style.display = "none"; // Ocultar la canción si no coincide con el término de búsqueda
    }
  });
}
