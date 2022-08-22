// Select an element from the DOM
// - Document Object Model
// - defines the layout of objects in the document
//   where object means HTML element

// Built-in methods available on a global
// document object
// - only available on client side JavaScript

// querySelector(cssSelector)
// - accepts any kind of CSS selector
const root = document.querySelector("#root");
const h1 = root.querySelector("h1");

console.log("Old h1: " + h1.innerText);

// once we have an element, we can modify its contents
h1.innerText = "Hello world";
console.log("New h1: " + h1.innerText);



// =========================== ADDING OBJECT TO DOM ==============================
// adding an object as elements to the DOM
let person = {
    name: "Fred",
    age: 32
};

// createElement allows us to create a new HTML
// node in JS which can be programmatically manipulated
const personDiv = document.createElement("div");
const h2 = document.createElement("h2");

// appendChild() adds a new child HTML node to an element
h2.appendChild(document.createTextNode(`${person.name} is ${person.age} years old`));
personDiv.appendChild(h2);

// appending to a visible node, one in the DOM, adds
// the new node to the DOM
root.appendChild(personDiv);


// =========================== Event listener example =============================
// setup initial count value
let count = 0;
const counter = document.querySelector("#counter");
counter.innerText = count;

const incrementButton = document.querySelector("#incrementCounterBtn");

// every html Node has the addEventListener method
incrementButton.addEventListener("click", function(event) {
    event.preventDefault(); // prevents button from refreshing page if submitted in a form
    count++;
    counter.innerText = count;
});


// =========================== Form input example =====================================
const inputForename = document.querySelector("#forenameInput");
const submitForename = document.querySelector("#submitForename");

submitForename.addEventListener("click", (event) => {
    event.preventDefault();

    const forename = inputForename.value;
    console.log(forename);
});