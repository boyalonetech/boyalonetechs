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
  porfilePage.classList.remove("open-profile-page");
});

offScreenMenu.addEventListener("click", () => {
  hamMenu.classList.remove("active");
  offScreenMenu.classList.remove("active");
});

// ================ Dark and light Mood togger =============

// Toggle Dark/Light Mode
let lastScrollTop = 0;
const themeToggle = document.querySelector("#theme-toggle");
const darkThemeToggle = document.querySelector("#dark-theme-toggle");
const theme = document.querySelector("main");
const nav = document.querySelector("nav");

function enableDarkMode() {
  document.body.style.backgroundColor = "#000";
  document.body.style.color = "#fff";
  nav.style.backgroundImage =
    "linear-gradient(to right, #000,#000,#000,#000,#000,#000,#000,#000,#000,#000,#000,#000,#000,#000,#000,#000,#000,#000";

  darkThemeToggle.style.display = "none";
  themeToggle.style.display = "block";
  localStorage.setItem("theme", "dark");
}

function enableLightMode() {
  document.body.style.backgroundColor = "#fff";
  document.body.style.color = "#000";
  nav.style.backgroundImage = "linear-gradient(to right, #000, #000)";

  darkThemeToggle.style.display = "block";
  themeToggle.style.display = "none";
  localStorage.setItem("theme", "light");
}

// ============== Scroll Effect =============

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    themeToggle.style.transform = "translateY(100px)";
    darkThemeToggle.style.transform = "translateY(100px)";
    themeToggle.style.opacity = "0";
    darkThemeToggle.style.opacity = "0";
  } else {
    // Scrolling up
    themeToggle.style.transform = "translateY(0)";
    darkThemeToggle.style.transform = "translateY(0)";
    themeToggle.style.opacity = "1";
    darkThemeToggle.style.opacity = "1";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative values
});

// Apply stored theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    enableDarkMode();
  } else {
    enableLightMode();
  }
});

// Event Listeners for toggle buttons
themeToggle.addEventListener("click", enableLightMode);
darkThemeToggle.addEventListener("click", enableDarkMode);
// =============== Profile ==============
const porfilePage = document.getElementById("userProfile");

function openProfilePage() {
  porfilePage.classList.add("open-profile-page");
  // darkThemeToggle.style.visibility = "hidden";
  // themeToggle.style.visibility = "hidden";
}

// ================ scroll =============
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

// text scroll

// Add this to your JavaScript file or <script> tag
document.addEventListener("DOMContentLoaded", function () {
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of the element is visible
    }
  );

  fadeElements.forEach((element) => {
    observer.observe(element);
  });
});
