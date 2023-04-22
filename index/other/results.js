const wordInput = document.getElementById('wordInput');
const submitBtn = document.getElementById('submitBtn');
const definitionContainer = document.getElementById('definitionContainer');
const gifContainer = document.getElementById('gifContainer');

// Add event listener for submit button
submitBtn.addEventListener('click', function() {
    const word = wordInput.value.trim(); // Get input value and trim whitespace

    // Make API request to fetch definition
    fetchDefinition(word);

    // Make API request to fetch gifs
    fetchGifs(word);
});

// Function to fetch definition using API
function fetchDefinition(word) {
    // Make API request to retrieve definition
    // Replace API_KEY with your actual dictionary API key
    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=API_KEY`)
        .then(response => response.json())
        .then(data => {
            // Extract definition from API response
            const firstDefinition = data[0].shortdef[0];

            // Display definition in definition container
            definitionContainer.innerHTML = `<p><strong>Definition:</strong> ${firstDefinition}</p>`;
        })
        .catch(error => {
            console.error('Error fetching definition:', error);
        });
}

// Function to fetch gifs using API
function fetchGifs(word) {
    // Make API request to retrieve gifs
    // Replace API_KEY with your actual Giphy API key
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=API_KEY&q=${word}`)
        .then(response => response.json())
        .then(data => {
            const gifs = data.data;

            // Display gifs in gif container
            gifContainer.innerHTML = '';
            gifs.forEach(gif => {
                const img = document.createElement('img');
                img.src = gif.images.fixed_width.url;
                img.alt = gif.title;
                gifContainer.appendChild(img);
            });
        })
        .catch(error => {
            console.error('Error fetching gifs:', error);
        });
}