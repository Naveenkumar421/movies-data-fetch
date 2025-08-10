const API_KEY = "f3375aaf";

async function searchMovies() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) {
    alert("Please enter a movie title");
    return;
  }

  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      document.getElementById("movies").innerHTML = `<p>No results found.</p>`;
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    document.getElementById("movies").innerHTML = `<p>Something went wrong.</p>`;
  }
}

function displayMovies(movies) {
  const moviesDiv = document.getElementById("movies");
  moviesDiv.innerHTML = movies.map(movie => `
    <div class="movie" onclick="showMovieDetails('${movie.imdbID}')">
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>Year: ${movie.Year}</p>
    </div>
  `).join("");
}

async function showMovieDetails(imdbID) {
  const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`;
  try {
    const res = await fetch(url);
    const movie = await res.json();

    if (movie.Response === "True") {
      document.getElementById("modal-content").innerHTML = `
        <span class="close" onclick="closeModal()">&times;</span>
        <h2>${movie.Title} (${movie.Year})</h2>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Runtime:</strong> ${movie.Runtime}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
      `;
      document.getElementById("movieModal").style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
}

function closeModal() {
  document.getElementById("movieModal").style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById("movieModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}
