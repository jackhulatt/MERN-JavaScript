// console.log(todo);

const todos = [
    new Todo("Walk the dog", "HIGH"),
    new Todo("Wash the car", "LOW")
];

// for...of for iterating over arrays
// - iterates over the values of the array instead
//   of the indexes
for (let todo of todos) console.log(todo);

// for...in for iterating over the keys of an object
// - iterating over an array returns the indexes (keys)
//   rather than the value
for (let todo in todos) console.log(todos[todo]);

// traditional for loop
for (let i = 0; i < todos.length; i++) {
    console.log(todos[i]);
}

let todo = new Todo("Test", "HIGH");
// iterating over the keys of an object
for (let key in todo) {
    console.log(`todo[${key}] is ${todo[key]}`);
}

// while
// do-while
let i = 1;

while (i <= 10) {
    console.log(i);
    i++;
}

i = 1;

do {
    console.log(i);
    i++;
} while (i <= 10);