let hamsterData = []; // Starts empty, fills up via fetch
const gridContainer = document.getElementById('hamster-grid');
const searchInput = document.getElementById('search-input');

// 1. Fetch the data from JSON file on page load
fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        hamsterData = data; // Save the data globally
        renderCards(hamsterData); // Draw the grid
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
        gridContainer.innerHTML = `<p style="text-align:center; width: 100%; color: #666;">Failed to load data. Ensure you are running a local server!</p>`;
    });

// 2. Function to render the cards to the screen
function renderCards(dataToRender) {
    gridContainer.innerHTML = ''; // Clear grid

    if (dataToRender.length === 0) {
        gridContainer.innerHTML = '<p style="text-align:center; width: 100%; color: #666;">No hamsters found for this vibe. :(</p>';
        return;
    }

    dataToRender.forEach(hamster => {
        const card = document.createElement('a');
        card.href = hamster.url;
        card.target = "_blank"; 
        card.className = "hamster-card glass-card";

        const tagsHTML = hamster.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('');

        card.innerHTML = `
            <img src="${hamster.thumbnail}" alt="Hamster" class="card-image" loading="lazy">
            <div class="tags-container">
                ${tagsHTML}
            </div>
        `;

        gridContainer.appendChild(card);
    });
}

// 3. Real-Time Search Engine
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    const filteredHamsters = hamsterData.filter(hamster => {
        return hamster.tags.some(tag => tag.toLowerCase().includes(searchTerm));
    });

    renderCards(filteredHamsters);
});
