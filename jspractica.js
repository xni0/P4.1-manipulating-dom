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
function renderAccordion(jsondata) {
    // 1. I need to get the main div from the HTML file.
    const container = document.getElementById('accordionExample');

    // Make sure the container exists before trying to use it.
    if (!container) {
        console.error("Error: The div with id 'accordion' was not found in the HTML.");
        return;
    }

    // 2. The list of characters is inside jsondata.data.results
    const characters = jsondata.data.results;
    
    // 3. Clear the container before adding new cards.
    container.innerHTML = "";

    for (let char of characters) {
        
        // Build the image URL.
        const imageUrl = char.thumbnail.path + '.' + char.thumbnail.extension;
        
        // Create unique IDs for each accordion item.
        const collapseId = `collapse-${char.id}`;
        const headingId = `heading-${char.id}`;

        // I want to find the URL that takes me to the character's detail page.
        // The 'urls' array has different types of links, so I'll find the one with type "detail".
        const detailUrl = char.urls.find(url => url.type === 'detail');
        
        // 5. Build the HTML for each accordion item with the new info.
        container.innerHTML += `
            <div class="accordion-item">
                <h2 class="accordion-header" id="${headingId}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}">
                        ${char.name}
                    </button>
                </h2>
                <div id="${collapseId}" class="accordion-collapse collapse" aria-labelledby="${headingId}" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="row">
                            <div class="col-md-4 mb-3 mb-md-0">
                                <img src="${imageUrl}" class="img-fluid rounded" alt="Image of ${char.name}">
                            </div>
                            <div class="col-md-8">
                                <p>${char.description || 'No description available.'}</p>
                                
                                <hr> 
                                <p>
                                    <strong>Comics available:</strong> 
                                    <span class="badge bg-danger">${char.comics.available}</span>
                                </p>

                                ${detailUrl ? `<a href="${detailUrl.url}" class="btn btn-primary" target="_blank">More Info</a>` : ''}
                                </div>
                        </div>
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
            renderAccordion(data); // Call the function to create the accordion.
        })
        .catch(error => {
            console.error('There was an error loading the file:', error);
        });
});