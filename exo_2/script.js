// Exercise 2

// Make a new page with a text input and a button. When the button is clicked, a fetch query is sent to the agify API with the name entered in the input. When the request is finished display the result in a new div on the page. Keep the the past requests on the page by creating a new div each time you make an API call.



// Variable qui stock le nom entré dans l'input par l'utilisateur
let nameToSearch;


// Récupérer l'input et ajouter un évènement 
let userName = document.querySelector('#userName');
userName.addEventListener('keyup', function (e) {
    nameToSearch = e.target.value;
})


// Récupérer le bouton qui lance la requête
let searchBtn = document.querySelector('#searchBtn');
searchBtn.addEventListener('click', function () {
    fetchData(`https://api.agify.io?name=${nameToSearch}`);
});


// Définir la fonction fetchData
/**
 * Cette fonction effectue une requête vers l'API Agify en utilisant un nom d'utilisateur saisi par l'utilisateur.
 * Elle récupère les données renvoyées par l'API et les affiche dans une nouvelle section HTML.
 *
 * @param {string} url - L'URL de l'API Agify avec le nom d'utilisateur à rechercher.
 */
function fetchData(url) {
    fetch(url)
        .then((response) => response.json())
        .then((json) => displayData(json))
        .catch((error) => {
            console.log("Une erreur s'est produite lors de la requête:", error);
        });
}


/**
 * Cette fonction affiche les données reçues de l'API Agify dans une nouvelle section HTML.
 *
 * @param {Object} dataReceive - Les données reçues de l'API Agify.
 */
function displayData(dataReceive) {
    // Créer un conteneur HTML pour afficher les données
    let container = document.createElement('div');

    // Parcourir les clés et valeurs de l'objet reçu
    for (let key in dataReceive) {
        let value = dataReceive[key];

        // Créer un paragraphe pour afficher chaque paire clé-valeur
        let data = document.createElement('p');
        data.textContent = `${key} : ${value}`;

        // Ajouter le paragraphe au conteneur
        container.appendChild(data);
    }

    // Ajouter le conteneur au corps de la page HTML
    document.body.appendChild(container);
}