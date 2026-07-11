let hamsterData = []; 
const gridContainer = document.getElementById('hamster-grid');
const searchInput = document.getElementById('search-input');

// 1. Fetch the data from JSON file on page load
fetch('data.json')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        hamsterData = data; 
        renderCards(hamsterData, ""); // Draw the grid initially with no search term
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
        gridContainer.innerHTML = `<p style="text-align:center; width: 100%; color: #666;">Failed to load data.</p>`;
    });

// 2. Function to render the cards to the screen
function renderCards(dataToRender, searchTerm) {
    gridContainer.innerHTML = ''; 

    if (dataToRender.length === 0) {
        gridContainer.innerHTML = '<p style="text-align:center; width: 100%; color: #666;">No hamsters found for this vibe. :(</p>';
        return;
    }

    dataToRender.forEach(hamster => {
        const card = document.createElement('a');
        card.href = hamster.url;
        card.target = "_blank"; 
        card.className = "hamster-card glass-card";

        // --- THE NEW TAG LOGIC ---
        let displayTags = [];
        
        if (searchTerm) {
            let matchingTags = [];
            let otherTags = [];
            
            // Separate tags into "matches" and "others"
            hamster.tags.forEach(tag => {
                if (tag.toLowerCase().includes(searchTerm)) {
                    matchingTags.push(tag);
                } else {
                    otherTags.push(tag);
                }
            });
            // Combine them (matches first) and cut off at 5
            displayTags = [...matchingTags, ...otherTags].slice(0, 5);
        } else {
            // If no search, just show the first 5 tags
            displayTags = hamster.tags.slice(0, 5);
        }

        // Build HTML and add 'highlight' class if it matches the search term
        const tagsHTML = displayTags.map(tag => {
            const isMatch = searchTerm && tag.toLowerCase().includes(searchTerm);
            const highlightClass = isMatch ? ' highlight' : '';
            return `<span class="tag-pill${highlightClass}">${tag}</span>`;
        }).join('');
        // -------------------------

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
        if (!searchTerm) return true; // Show all if search is empty
        return hamster.tags.some(tag => tag.toLowerCase().includes(searchTerm));
    });

    // Pass both the filtered data AND the search term so we can highlight it
    renderCards(filteredHamsters, searchTerm);
});
