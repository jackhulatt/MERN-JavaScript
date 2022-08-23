// Arrays
// - Java uses static arrays
// - JavaScript uses dynamic arrays

// Literal syntax
let arr = [1,2,3,4,5,6];
let twoDimensionalArr = [
    [1,2,3],
    [1,2,3,4]
];

// Array constructor
// - accepts an initial capacity
// - initialises elements to undefined
let otherArr = Array(5);

// Array access
console.log(arr[1]);

// easy way to iterate over an array
let names = ["Fred", "Bob", "Sarah"];

// generally, we don't use for...in loops for arrays
// - they are used to get the keys of an object generally
console.log("FOR...IN");
for (let item in names) {
    console.log(names[item]);
}

// the better way for arrays is to use for...of
console.log("FOR...OF");
for (let name of names) {
    console.log(name);
}

/*
  Create a simple static frontend that renders a list of 
  todo items.

  Exercises: 
  1. Add a form for entering new todos to the frontend
  2. Add an event listener that listens for the form to 
     be submitted. When the form is submitted, it adds
     the new todo to the todo items list and updates
     the list displayed on the browser.
*/
function Todo(name, priority) {
    this.name = name;
    this.priority = priority;
}

const todos = [
    new Todo("Walk the dog", "HIGH"),
    new Todo("Wash the car", "LOW"),
    new Todo("Iron the Shirts", "MEDIUM")
];

function todoToListItem(todo) {
    let container = document.createElement("li");
    container.appendChild(document.createTextNode(todo.name));

    let priority = document.createElement("span");
    priority.appendChild(document.createTextNode(`(${todo.priority})`));

    // modify the colour of the priority span
    switch (todo.priority) {
        case "HIGH":
            priority.style.backgroundColor = "red";
            break;
        case "MEDIUM":
            priority.style.backgroundColor = "yellow";
            break;
        case "LOW":
            priority.style.backgroundColor = "green";
            break;
    }
    container.appendChild(priority);

    return container;
}

const root = document.querySelector("#root");

const ul = document.createElement("ul");
// const mappedTodos = todos.map(todo => todoToListItem(todo));
// for (let todo of mappedTodos) ul.appendChild(todo);
// or
for (let todo of todos) {
    ul.appendChild(todoToListItem(todo));
}

root.appendChild(ul);

// If you want to add a new class, remove a class or toggle 
// a class, use the classList property on each node
root.classList.add("jpoiajfi");
root.classList.remove("jpoiajfi");
root.classList.toggle("jpoiajfi");