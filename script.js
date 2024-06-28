document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTodoButton = document.getElementById("add-todo");
  const todoList = document.getElementById("todo-list");

  // Load todos from localStorage
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  // Function to render todos
  function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = "todo-item";
      li.innerHTML = `${todo} <button class ="delete-button" data-index = "${index}">Delete</button>`;
      todoList.appendChild(li);
    });
  }

  // Function to add a new todo
  function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText !== "") {
      todos.push(todoText);
      localStorage.setItem("todos", JSON.stringify(todos));
      todoInput.value = "";
      renderTodos();
    }
  }

  // Function to delete a todo
  function deleteTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  }

  //Add event listeners
  addTodoButton.addEventListener("click", addTodo);
  todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-button")) {
      const index = event.target.getAttribute("data-index");
      deleteTodo(index);
    }
  });

  // Initial render
  renderTodos();
});
