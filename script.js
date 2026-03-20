let allGames = [];

// This line tells the code that games.txt is correct
fetch('games.txt')
    .then(response => response.json())
    .then(data => {
        allGames = data;
        displayGames(allGames);
    })
    .catch(err => console.error("Could not load games.txt:", err));

function displayGames(games) {
    const grid = document.getElementById('gameGrid');
    grid.innerHTML = '';

    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${game.thumbnail}" alt="${game.title}">
            <h3>${game.title}</h3>
        `;
        card.onclick = () => openGame(game);
        grid.appendChild(card);
    });
}

function openGame(game) {
    document.getElementById('gameGrid').classList.add('hidden');
    document.getElementById('gameView').classList.remove('hidden');
    document.getElementById('gameFrame').src = game.url;
    document.getElementById('gameTitle').innerText = game.title;
}

document.getElementById('backBtn').onclick = () => {
    document.getElementById('gameView').classList.add('hidden');
    document.getElementById('gameGrid').classList.remove('hidden');
    document.getElementById('gameFrame').src = ''; 
};

document.getElementById('searchBar').oninput = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allGames.filter(g => g.title.toLowerCase().includes(term));
    displayGames(filtered);
};