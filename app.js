//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(event) {
    //prenvent form from supmiting
    event.preventDefault();
    //creating div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    if (todoInput.value === "") {
        todo.style.display = "none";
    }
    todoDiv.appendChild(newTodo);

    //add todo to localstorage
    saveLocalStorage(todoInput.value);

    //check mark button
    const complitedbutton = document.createElement("button");
    complitedbutton.innerHTML = "<i class='fas fa-check'></i>";
    complitedbutton.classList.add("complete-btn");
    todoDiv.appendChild(complitedbutton);

    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //appending todoDiv to list
    todoList.appendChild(todoDiv);

    //clear todoInput value
    todoInput.value="";
}

function deleteCheck(e) {
    const item = e.target;

    //delete todo
    if (item.classList[0]=== "trash-btn") {
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
        
    }

    //check mark
    if (item.classList[0]=== "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            default:
                break;
        }
    })
}

function saveLocalStorage(todo) {
    //check if there exist a todo in local storage
    let todos;
    if (localStorage.getItem("todos")=== null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;

    //check if there exist a todo in local storage
    if (localStorage.getItem("todos")=== null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todo) {
            //creating div
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");
        
            //create li
            const newTodo = document.createElement("li");
            newTodo.innerText = todo;
            newTodo.classList.add("todo-item");
            todoDiv.appendChild(newTodo);
        
            //check mark button
            const complitedbutton = document.createElement("button");
            complitedbutton.innerHTML = "<i class='fas fa-check'></i>";
            complitedbutton.classList.add("complete-btn");
            todoDiv.appendChild(complitedbutton);
        
            //check trash button
            const trashButton = document.createElement("button");
            trashButton.innerHTML = "<i class='fas fa-trash'></i>";
            trashButton.classList.add("trash-btn");
            todoDiv.appendChild(trashButton);
        
            //appending todoDiv to list
            todoList.appendChild(todoDiv);
        
    })
}

function removeLocalTodos(todo) {
    let todos;

    //check if there exist a todo in local storage
    if (localStorage.getItem("todos")=== null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}