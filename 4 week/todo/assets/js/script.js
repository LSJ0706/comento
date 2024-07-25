document.addEventListener("DOMContentLoaded", function () {
  const todoForm = document.getElementById("form__todo");
  const todoList = document.getElementById("todoList");
  const todo = document.getElementById("todo");
  const todoAddBtn = document.querySelector(".btn.btn__addTodoModal-close");
  let currentTodoList = JSON.parse(sessionStorage.getItem("todoList")) || [];

  const loadTodos = () => {
    todoList.innerHTML = "";
    currentTodoList.forEach((todo, index) => {
      setTodoList(index, todo.content, todo.checked);
    });
  };

  //add Todo
  const addTodo = () => {
    const currentTodo = todo.value;
    if (currentTodo) {
      currentTodoList.push({
        index: currentTodoList.length,
        content: currentTodo,
        checked: false,
      });
      updateSessionStorage();
      setTodoList(currentTodoList.length - 1, currentTodo, currentTodo.checked);
      todo.value = "";
    } else {
      alert("내용을 입력해주세요!");
    }
  };

  //set TodoList
  const setTodoList = (index, todo, isChecked) => {
    const li = document.createElement("li");
    li.setAttribute("data-index", index);
    li.innerHTML = `
    <div>
      <input class="checkbox__complete" type="checkbox" ${
        isChecked ? "checked" : ""
      }/>
      <span class="todoContent ${isChecked ? "checked" : ""}">${todo}</sapn>
    </div>
    <img src="./assets/img/delete_icon.png"  class="img__delete"/>
  `;
    todoList.appendChild(li);
    const checkbox = li.querySelector(".checkbox__complete");
    checkbox.addEventListener("change", checkTodo);
    const deleteIcon = li.querySelector(".img__delete");
    deleteIcon.addEventListener("click", deleteTodo);
  };

  //check Todo
  const checkTodo = (event) => {
    const check = event.target;
    const textContent = check.nextElementSibling;
    const idx = check.closest("li").getAttribute("data-index");
    currentTodoList[idx].checked = check.checked;
    updateSessionStorage();

    if (check.checked) {
      textContent.classList.add("checked");
    } else {
      textContent.classList.remove("checked");
    }
  };

  //delete todo
  const deleteTodo = (event) => {
    const todo = event.target.closest("li");
    const idx = todo.getAttribute("data-index");
    currentTodoList = currentTodoList
      .filter((todo) => todo.index != idx)
      .map((todo) => {
        if (idx < todo.index) {
          todo.index--;
        }
        return todo;
      });

    updateSessionStorage();
    loadTodos();
  };

  //sessionStorage
  const updateSessionStorage = () => {
    sessionStorage.setItem("todoList", JSON.stringify(currentTodoList));
  };
  //add eventListener
  todoForm.addEventListener("submit", (event) => event.preventDefault());
  todoAddBtn.addEventListener("click", (event) => {
    addTodo();
    event.preventDefault();
    modal.classList.remove("on");
  });

  loadTodos();
});
