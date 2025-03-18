const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");
const ham = document.querySelector("main");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

ham.addEventListener("click", () => {
  hamMenu.classList.remove("active");
  offScreenMenu.classList.remove("active");
});

offScreenMenu.addEventListener("click", () => {
  hamMenu.classList.remove("active");
  offScreenMenu.classList.remove("active");
});