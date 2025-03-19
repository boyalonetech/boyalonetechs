// ================ hamburger menu =============

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
  porfilePage.classList.remove("active");
});

offScreenMenu.addEventListener("click", () => {
  hamMenu.classList.remove("active");
  offScreenMenu.classList.remove("active");
});

// ================ Dark and light Mood togger =============
let body = document.querySelector("main");
let lightIcon = document.getElementById("light-icon");
let darkIcon = document.getElementById("dark-icon");

lightIcon.addEventListener("click", () => {
  body.style.backgroundColor = "#fff";
  body.style.color = "#000";
  darkIcon.style.display = "block";
  lightIcon.style.display = "none";
});

window.addEventListener("scroll", function () {
  let lightIcon = document.getElementById("light-icon");
  if (window.scrollY > 50) {
    lightIcon.style.display = "block";
  } else {
    lightIcon.style.display = "none";
  }
});

darkIcon.addEventListener("click", function () {
  body.style.backgroundColor = "#000";
  body.style.color = "#fff";
  darkIcon.style.display = "none";
  lightIcon.style.display = "block";
});
window.addEventListener("scroll", function () {
  let darkIcon = document.getElementById("dark-icon");
  if (window.scrollY > 50) {
    darkIcon.style.display = "block";
  } else {
    darkIcon.style.display = "none";
  }
});

// ================ profile page =============

const porfilePage = document.querySelector(".profile-page");
const profile = document.getElementById("profile-icon");

profile.addEventListener("click", () => {
  porfilePage.classList.toggle("active");
});

// ================ scroll =============
let lastScrollTop = 0;
const navbar = document.querySelector("nav");

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let screenWidth = window.innerWidth;

  if (screenWidth <= 768) {
    // Apply only on mobile screens (adjust breakpoint if needed)
    if (scrollTop > lastScrollTop) {
      // Scrolling down
      navbar.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      navbar.style.transform = "translateY(0)";
    }
  } else {
    // Reset navbar position for larger screens
    navbar.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop;
});
