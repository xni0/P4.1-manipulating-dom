/**
 * This code is just to read the json file. Don't worry about it. We will see it in detail in next sectioins
 * Write your own code in the procesarJSON function
 */

/**
 * Este código es solo para leeer el archivo json. No os preocupéis por él, lo veremos y lo analizaremos en próximos capítulos
 * Escribir vuestro código en la función procesarJSON
 */

/**
 * My function to create the cards on the screen.
 * It needs the data from the json file to work.
 * @param {object} jsondata - This is the big object from the Marvel API.
 */
function renderCards(jsondata) {
    // 1. I need to get the main div from the HTML file.
    const container = document.getElementById('cards_container');

    // Make sure the container exists before trying to use it.
    if (!container) {
        console.error("Error: The div with id 'cards_container' was not found in the HTML.");
        return;
    }

    // 2. The list of characters is inside jsondata.data.results
    const characters = jsondata.data.results;
    
    // 3. Clear the container before adding new cards.
    container.innerHTML = "";

    // 4. Loop through the 'characters' array.
    for (let char of characters) {
        
        // Build the image URL from the path and extension.
        const imageUrl = char.thumbnail.path + '.' + char.thumbnail.extension;
        
        // 5. Build the HTML for each card.
        container.innerHTML += `
            <div class="col-12 col-md-6 col-lg-3 p-2">
                <div class="card h-100 shadow-sm">
                    <img src="${imageUrl}" class="card-img-top" alt="Image of ${char.name}">
                    <div class="card-body">
                        <h5 class="card-title">${char.name}</h5>
                        <p class="card-text small">
                            ${char.description || 'No description available.'}
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
}

// Wait for the page to load before running the script.
document.addEventListener('DOMContentLoaded', function() {
    
    // Fetch the external json file.
    fetch('./data/heroes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('File loaded successfully!', data);
            renderCards(data); // Call the function to create the cards.
        })
        .catch(error => {
            console.error('There was an error loading the file:', error);
        });
});