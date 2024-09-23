const games = [
    { id: 1, name: "The Witcher 3: Wild Hunt", genre: ["RPG", "Adventure"], image: "https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/kh4MUIuMmHlktOHar3lVl6rY.png" },
    { id: 2, name: "Minecraft", genre: ["Sandbox", "Adventure"], image: "https://store-images.s-microsoft.com/image/apps.58378.14492077886571533.338a563a-86e7-47b1-b9dc-41cf411f5dcd.dc840f22-6e8f-4a59-b7bc-57958a0740fd?q=90&w=480&h=270" },
];


// Search history storage
let searchHistory = [];

// Function to search for games
function searchGames() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const gameListDiv = document.getElementById('gameList');
    gameListDiv.innerHTML = '';  // Clear previous content

    // Filter games by search query in name or genres
    const filteredGames = games.filter(game => 
        game.name.toLowerCase().includes(query) ||
        game.genre.some(genre => genre.toLowerCase().includes(query))
    );

    filteredGames.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game-item');
        gameDiv.innerHTML = `
            <h3>${game.name}</h3>
            <img src="${game.image}" alt="${game.name}" style="width:100px; height:auto;">
            <p>Genres: ${game.genre.join(', ')}</p>
        `;
        gameListDiv.appendChild(gameDiv);
    });

    if (filteredGames.length > 0) {
        searchHistory.push(...filteredGames[0].genre);
        recommendGamesByGenre(filteredGames[0].genre);
    } else if (query) {
        searchHistory.push(query);
        recommendGames();
    }
}


// Function to recommend games based on search history
function recommendGames() {
    const recommendedListDiv = document.getElementById('recommendedList');
    recommendedListDiv.innerHTML = '';  // Clear previous recommendations

    const lastSearch = searchHistory[searchHistory.length - 1];

    const recommendedGames = games.filter(game => 
        game.name.toLowerCase().includes(lastSearch) || 
        game.genre.some(genre => genre.toLowerCase().includes(lastSearch))
    );

    recommendedGames.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('recommended-item');
        gameDiv.innerHTML = `
            <h3>${game.name}</h3>
            <img src="${game.image}" alt="${game.name}" style="width:100px; height:auto;">
            <p>Genres: ${game.genre.join(', ')}</p>
        `;
        recommendedListDiv.appendChild(gameDiv);
    });
}

// *** เพิ่มฟังก์ชันใหม่ recommendGamesByGenre ***
function recommendGamesByGenre(genres) {
    const recommendedListDiv = document.getElementById('recommendedList');
    recommendedListDiv.innerHTML = '';  // Clear previous recommendations

    // Find recommended games based on matching genres
    const recommendedGames = games.filter(game => 
        game.genre.some(genre => genres.includes(genre))
    );

    recommendedGames.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('recommended-item');
        gameDiv.innerHTML = `<h3>${game.name}</h3><p>Genres: ${game.genre.join(', ')}</p>`;
        recommendedListDiv.appendChild(gameDiv);
    });
}

// Function to load all games initially
function loadAllGames() {
    const gameListDiv = document.getElementById('gameList');
    games.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game-item');
        gameDiv.innerHTML = `<h3>${game.name}</h3><p>Genres: ${game.genre.join(', ')}</p>`;
        gameListDiv.appendChild(gameDiv);
    });
}

// Function to generate genre buttons
function loadGenres() {
    const genreListDiv = document.getElementById('genreList');
    const allGenres = [...new Set(games.flatMap(game => game.genre))]; // Extract unique genres

    allGenres.forEach(genre => {
        const genreDiv = document.createElement('div');
        genreDiv.classList.add('genre-item');
        genreDiv.innerText = genre;
        genreDiv.onclick = () => filterByGenre(genre);  // Filter games by genre when clicked
        genreListDiv.appendChild(genreDiv);
    });
}

// Function to filter games by genre
function filterByGenre(genre) {
    const gameListDiv = document.getElementById('gameList');
    gameListDiv.innerHTML = '';  // Clear previous content

    const filteredGames = games.filter(game => game.genre.includes(genre));

    filteredGames.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game-item');
        gameDiv.innerHTML = `<h3>${game.name}</h3><p>Genres: ${game.genre.join(', ')}</p>`;
        gameListDiv.appendChild(gameDiv);
    });

    // Add genre to search history and recommend similar games
    searchHistory.push(genre);
    recommendGames();
}

// Load all games and genres when page loads
loadAllGames();
loadGenres();
