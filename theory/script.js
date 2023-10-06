
// So far all the things we have seen were executed in the order they were written. For example:

const firstname = "Jean-Didier";
console.log(firstname);

const max = 5;
for (let i = 0; i < max; i++) {
	console.log(i);
}
console.log("end");


// -------------------------------------------------------------------------
// -------------------------------------------------------------------------


// The problem with synchronicity

// We've already seen how to schedule a task in the future (here's a reminder :shipit: ).
// Let's try the BAD approach.

const in1Second = Date.now() + 1000;
console.log('in1Second : ', in1Second);
let operations = 0;

console.log("Before the delay");

// This loop is executed until we reach the in1Second timestamp
while (Date.now() < in1Second) {
	operations += 1;
}

console.log("After the delay");
console.log("We could have done " + operations + " operations in that time.");

// ----------------------------

// This is really bad because, we're essentially blocking any other task from happening during the timeframe.

// Using the RIGHT approach :

console.log("Before the delay");
setTimeout(() => console.log("After 1s"), 1000);
console.log("After the delay");

// We can see that After the delay is displayed even though it is written after the setTimeout function. This is an asynchronous operation.

// We can also say that this method is non-blocking, since code execution can continue, even though we have stuff planned in the future.

// Event listeners are another way of writing asynchronous code. The code is only executed once the event happens.


// -------------------------------------------------------------------------
// -------------------------------------------------------------------------


// Promises
// So we already know about timeouts/intervals and event listeners. There is another type of asynchronous code we haven't seen so far, which is Promises, a name that pretty much says : It is not ready yet, but when ready I'll execute something!


// -------------------------------------------------------------------------
// -------------------------------------------------------------------------


// The fetch function (AJAX)
// I assume this is still pretty vague, so let's try an example right away. The fetch() function, allows you to send a request to your server.

// Imagine we have a text document on our server, named document.txt:


const request = fetch("document.txt");
console.log("Making the request:", request); // Promise is pending

const response = request.then((response) => response.text());
console.log("Treating the response", response); // Promise is pending

response.then((text) => {
	console.log(text);
});

/*  
    - Request creates a promise. It will be fulfilled when the server sends the document back.
    - When we have the response, we call response.text() to say we want to interpret the response as a text. It creates a new promise
    - When the text is fully loaded, we create a function to log the result into the console.
*/


// -------------------------------------------------------------------------
// -------------------------------------------------------------------------


// We can chain the promises so they appear more concise:

fetch("document.txt")
	.then((response) => response.text())
	.then((text) => {
		const p = document.createElement("p");
		p.textContent = text;

		document.body.appendChild(p);
	});


// -------------------------------------------------------------------------
// -------------------------------------------------------------------------


// We just need to add a little something so the code does not behave weirdly. What if document.txt does not exist ? Or has been renamed ? Or the server has been eaten ? We need to take Promise failure into account using the catch() method.

fetch("document.txt")
	.then((response) => response.text())
	.then((text) => {
		const p = document.createElement("p");
		p.textContent = text;

		document.body.appendChild(text);
	})
	.catch((error) => {
		console.log("There was an error!", error);
	});

/*
    Le bloc catch sera appelé en cas d'erreur dans la requête fetch ou dans n'importe quelle étape de la chaîne de promesses (then). Cela permet de capturer les erreurs à n'importe quel niveau de la chaîne et de les gérer de manière centralisée.
*/

    
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------


// Cross-server request (APIs)

/*
    Normally you would use fetch() to query your own server, however some websites allow us to do query on their server via an API.

    In this case an API is simply an URL that returns special values that you can use directly in your JS code. For this example, we're going to use the agify API to predict the age of a given name.

    For instance if you go to https://api.agify.io/?name=kelian, you'll see a webpage returning a JSON object, containing the number of person with that name, and their median age. This is super useful because we can directly use this value in our code. Here's how:
*/

const fetchName = (name) => fetch("https://api.agify.io/?name=" + name);

fetchName("keith")
	.then((response) => response.json())
	.then((json) => {
		console.log(json.age);
		console.log(json.count);
	})
	.catch((error) => {
		console.log("There was an error!", error);
	});


// -------------------------------------------------------------------------
// -------------------------------------------------------------------------


// Debugging requests

// When making fetch request, make sure to check out the network panel of your browser devtools! It's going to be really useful. It is available on every major browser such as Firefox or Chrome/Brave