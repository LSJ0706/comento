const modal = document.querySelector(".modal");
const modalOpen = document.querySelector(".btn.btn__modal-open");
const modalClose = document.querySelector(".btn.btn__add");
const todoList = document.getElementById("todoList");

modalOpen.addEventListener("click", () => {
  modal.classList.add("on");
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("on");
});

document.addEventListener("DOMContentLoaded", () => {
  console.log(modalOpen + ": 내용");
});
