// ================ hamburger menu =============

const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");
const ham = document.querySelector("main");
const body = document.querySelector("body");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

body.addEventListener("click", () => {
  porfilePage.classList.remove("open-profile-page");
});

ham.addEventListener("click", () => {
  hamMenu.classList.remove("active");
  offScreenMenu.classList.remove("active");
  profilePage.classList.remove("open-profile-page");
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
const learn = document.getElementById("learn");
const navBottom = document.querySelector(".nav-bottom");



function enableDarkMode() {
  document.body.style.backgroundColor = "#000";
  document.body.style.color = "#fff";
  nav.style.backgroundImage =
    "linear-gradient(to right, #000,#000,#000,#000,#000,#000,#000,#000,#000,#000,#000,#000,#000,#000,#000,#000,#000,#000";
  navBottom.style.backgroundColor = "#000";
  profilePage.style.background = "#000";
  profilePage.style.color = "#fff";
  darkThemeToggle.style.display = "none";
  themeToggle.style.display = "block";
  localStorage.setItem("theme", "dark");
}

function enableLightMode() {
  document.body.style.backgroundColor = "#fff";
  document.body.style.color = "#000";
  nav.style.backgroundImage = "linear-gradient(to right, #fff, #fff)";
  const footer = document.querySelector(".footer");
  footer.classList.add(".footer-theme");
  navBottom.style.backgroundColor = "#fff";
  profilePage.style.background = "#fff";
  profilePage.style.color = "#000";
  darkThemeToggle.style.display = "block";
  themeToggle.style.display = "none";
  localStorage.setItem("theme", "light");
}


const job = document.getElementById("jobN");
const exp = document.getElementById("expN");
const work = document.getElementById("workN");

let jobStarted = false;
let expStarted = false;
let workStarted = false;

function startCount(el, max, delay) {
  let count = 0;
  const interval = setInterval(() => {
    if (count < max) {
      count++;
      el.textContent = count + "+";
    } else {
      clearInterval(interval);
    }
  }, delay);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.id === "jobN" && !jobStarted) {
        startCount(job, 15, 100);
        jobStarted = true;
      }
      if (entry.target.id === "expN" && !expStarted) {
        startCount(exp, 45, 100);
        expStarted = true;
      }
      if (entry.target.id === "workN" && !workStarted) {
        startCount(work, 60, 100);
        workStarted = true;
      }
    }
  });
}, {
  threshold: 0.5 // Triggers when 50% of the element is visible
});

observer.observe(job);
observer.observe(exp);
observer.observe(work);

// ============== Scroll Effect =============

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    themeToggle.style.transform = "translateY(100px)";
    darkThemeToggle.style.transform = "translateY(100px)";
    themeToggle.style.opacity = "0";
    darkThemeToggle.style.opacity = "0";
    profilePage.classList.remove("open-profile-page");
  } else {
    // Scrolling up
    themeToggle.style.transform = "translateY(0)";
    darkThemeToggle.style.transform = "translateY(0)";
    themeToggle.style.opacity = "1";
    darkThemeToggle.style.opacity = "1";
    profilePage.classList.remove("open-profile-page");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative value

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
const profilePage = document.getElementById("userProfile");

function openProfilePage() {
  profilePage.classList.toggle("open-profile-page");
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
      offScreenMenu.classList.remove("active");
      hamMenu.classList.remove("active"); // Reset hamburger menu
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
      threshold: 1, // Trigger when 50% of the element is visible
    }
  );

  fadeElements.forEach((element) => {
    observer.observe(element);
  });
});

// ======================================= SKILL ================================
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".progress-bar span").forEach((bar) => {
    bar.style.width = bar.style.width;
  });
});

// ======================================= Scroll Handler================================
document.addEventListener("DOMContentLoaded", function () {
  // Get all elements that need to be animated
  const animatedElements = document.querySelectorAll(
    ".slide-in, .slide-in-left, .slide-in-right"
  );

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
      rect.bottom >= 0
    );
  }

  // Function to handle scroll events
  function handleScroll() {
    animatedElements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add("active");
      } else {
        // Optional: Remove the class if you want animations to trigger again when scrolling back up
        // element.classList.remove('active');
      }
    });
  }

  // Debounce function to optimize performance
  function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // Initial check in case elements are already in view
  handleScroll();

  // Add scroll event listener with debounce for performance
  window.addEventListener("scroll", debounce(handleScroll));

  // Optional: Trigger animations when window is resized (in case layout changes)
  window.addEventListener("resize", debounce(handleScroll));
});









// ===================== Pop Up ==================//

//=================== login =========================//

let myResult = document.getElementById("result");
let myBtn = document.getElementById("myBtn");
let signOut = document.getElementById("signOut");

function setUserName() {
  const userName = document.getElementById("userName").value;
  localStorage.setItem("first", userName);
  myResult.textContent = userName;
}

signOut.addEventListener("click", function () {
  localStorage.setItem("first", "Username"); // Set to "Username"
  myResult.textContent = "Username"; // Update display
});

if (!localStorage.getItem("first")) {
  setUserName();
} else {
  const storedName = localStorage.getItem("first");
  myResult.textContent = storedName;
}

myBtn.onclick = () => {
  setUserName();
};



// ============ Status Bar =============//




