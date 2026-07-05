// 1. The Database (Start tagging them here!)
// I used cute placeholder images so you can see it working right now.
const hamsterData = [
    {
        id: 1,
        tags: ["crying", "sad", "tears", "bed"],
        thumbnail: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=400&q=80", 
        url: "https://instagram.com/almarts27"
    },
    {
        id: 2,
        tags: ["angry", "knife", "stabby", "red"],
        thumbnail: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&w=400&q=80",
        url: "https://instagram.com/almarts27"
    },
    {
        id: 3,
        tags: ["happy", "vibing", "strawberry", "snack"],
        thumbnail: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=400&q=80",
        url: "https://instagram.com/almarts27"
    },
    {
        id: 4,
        tags: ["staring", "blank", "existential dread"],
        thumbnail: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80",
        url: "https://instagram.com/almarts27"
    }
];

// 2. Select DOM Elements
const gridContainer = document.getElementById('hamster-grid');
const searchInput = document.getElementById('search-input');

// 3. Function to render the cards to the screen
function renderCards(dataToRender) {
    // Clear the grid first
    gridContainer.innerHTML = '';

    // If no results
    if (dataToRender.length === 0) {
        gridContainer.innerHTML = '<p style="text-align:center; width: 100%; color: #666;">No hamsters found for this vibe. :(</p>';
        return;
    }

    // Loop through data and build HTML for each card
    dataToRender.forEach(hamster => {
        // Create the card link (opens Instagram)
        const card = document.createElement('a');
        card.href = hamster.url;
        card.target = "_blank"; // Opens in new tab
        card.className = "hamster-card glass-card";

        // Create HTML for the tags
        const tagsHTML = hamster.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('');

        // Inject the inner HTML
        card.innerHTML = `
            <img src="${hamster.thumbnail}" alt="Hamster" class="card-image">
            <div class="tags-container">
                ${tagsHTML}
            </div>
        `;

        // Add to the grid
        gridContainer.appendChild(card);
    });
}

// 4. The Real-Time Search Engine
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    // Filter the array based on tags
    const filteredHamsters = hamsterData.filter(hamster => {
        // Check if ANY tag in the hamster's array includes the typed search term
        return hamster.tags.some(tag => tag.toLowerCase().includes(searchTerm));
    });

    // Re-render the grid with the filtered results
    renderCards(filteredHamsters);
});

// 5. Initialize the page on first load
renderCards(hamsterData);
