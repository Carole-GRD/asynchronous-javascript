
// Exercise 1

// You probably already use it but if you don't, install it. For this exercise we're going to use VSCode's live-server extension, which allows us to have a running backend in a few seconds.

// Create a new directory , containing 3 files:

// index.html
// script.js
// a json file containing an array with a few strings ( learn what's a json file )
// Create a <button>, when clicked the json's contentn is loaded with a fetch('your-json-file.json'), then dynamically generate a <ul> list containing each rule in a <li>.



// Créer un bouton qui lance la requête
let btn = document.querySelector('#loadDataBtn');
btn.addEventListener('click', function() {
	fetchData("./data.json");
});

// Définir la fonction fetchData
function fetchData(url) {
	fetch(url)
		.then((response) => response.json())
		.then((json) => displayData(json))
		.catch((error) => {
			console.log("There was an error!", error);
		});
}


// // Définir la fonction fetchData
// function fetchData(url) {
// 	fetch(url)
// 		.then((response) => response.json())
// 		.then((json) => displayData(json.data))
// 		.catch((error) => {
// 			console.log("There was an error!", error);
// 		});
// }

// // ou avec une fonction asynchrone
// async function fetchData(url) {
// 	try {
// 		const response = await fetch(url);
// 		const json = await response.json();
// 		return displayData(json.data);
// 	} catch (error) {
// 		console.log("There was an error!", error);
// 	}
// }


function displayData(dataToDisplay) {
	console.log(dataToDisplay);
    // // Accéder aux clés et valeurs de l'objet JSON
	// for (let key in dataToDisplay) {
	// 	let value = dataToDisplay[key];
	// 	// Créer les éléments et les afficher dans le DOM
	// 	const p = document.createElement("p");
	// 	p.textContent = `${key} : ${value}`;
	// 	document.body.appendChild(p);
	// }
	// Parcourir les albums et afficher leurs détails
	dataToDisplay.forEach(function(albumData) {
		let albumGroup = document.createElement('ul');

		// Accéder aux clés et valeurs de l'objet
		for (let key in albumData) {
			let album = albumData[key];

			let title = document.createElement('li');
			let group = document.createElement('li');
			let year = document.createElement('li');
			let gender = document.createElement('li');

			title.textContent = `Titre : ${album.titre}`;
			group.textContent = `Groupe : ${album.groupe}`;
			year.textContent = `Année : ${album.annee}`;
			gender.textContent = `Genre : ${album.genre}`;

			albumGroup.appendChild(title);
			albumGroup.appendChild(group);
			albumGroup.appendChild(year);
			albumGroup.appendChild(gender);

			document.body.appendChild(albumGroup);
		}
	})
}



