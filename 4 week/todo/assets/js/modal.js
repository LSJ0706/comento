const modal = document.querySelector(".modal");
const modalOpen = document.querySelector(".btn.btn__modal-open");
const modalClose = document.querySelector(".btn__modal-close");

modalOpen.addEventListener("click", () => {
  modal.classList.add("on");
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("on");
});
