const todoForm = document.getElementById("form__todo");
const todoList = document.getElementById("todoList");
const todo = document.getElementById("todo");
const todoAddBtn = document.querySelector(".btn.btn__addTodoModal-close");
const currentTodoList = [];

todoForm.addEventListener("submit", (event) => event.preventDefault());

todoAddBtn.addEventListener("click", (event) => {
  addTodo();
  event.preventDefault();
  modal.classList.remove("on");
});

const addTodo = () => {
  const currentTodo = todo.value;
  console.log(currentTodo);
  setTodoList(currentTodo);
  todo.value = "";
};

const test = () => {
  console.log(todo.textContent + " : test");
};

const setTodoList = (todo) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <div>
      <span>${todo}</sapn>
      <input class="checkbox__delete" type="checkbox"/>
    </div>
    <button><img src="./assets/img/delete_icon.png"  class="img__delete"/></button>
  `;
  todoList.appendChild(li);
  console.log(li);
};
// const loadStorage = () => {
//   const storage = loadStorage.getItem("todoList");
//   if (storage != null) {
//     const storageTodo = JSON.parse(storage);
//     storageTodo.forEach((todo) => {
//       const { text, checked } = todo;
//     });
//   }
// };

// const addAlarm = () => {
//   const inputTime = alarm.getElementsByTagName("input");
//   const alarmTime = Array.from(inputTime).map((input) =>
//     getFormatTime(Number(input.value))
//   );

//   if (alarmList.childElementCount > 3) {
//     alert("알람은 최대 3개까지만 설정할 수 있습니다.");
//     return;
//   }

//   const newAlarm = document.createElement("div");
//   newAlarm.innerHTML = `${alarmTime[0]}:${alarmTime[1]}:${alarmTime[2]}`;

//   const alarmBtn = document.createElement("button");
//   alarmBtn.innerHTML = "제거";
//   alarmBtn.addEventListener("click", () => {
//     newAlarm.remove();
//   });

//   alarmList.appendChild(newAlarm);
//   newAlarm.appendChild(alarmBtn);
// };
