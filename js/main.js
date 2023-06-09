import { showNavDropdown, showFullNav } from "./modules/nav/dropdown.js";
import { generateNavHTML, displayCoachNav, displayOrdinaryUserNav } from "./modules/nav/nav.js";

window.addEventListener("load", main);

function main() {
  if (!document.URL.includes("index.html") && document.URL.includes(".html")) {
    generateNavHTML();
  }
  checkCurrentUser();
  setEventListeners();
}

function setEventListeners() {
  document.querySelector("#navExpandButton").addEventListener("click", showNavDropdown);
  window.addEventListener("resize", showFullNav);
}

function checkCurrentUser() {
  const currentUser = localStorage.getItem("username");

  if (currentUser) {
    document.querySelector("#login-html>a").textContent = "LOG UD";
  }

  if (!currentUser) {
    displayOrdinaryUserNav();
  } else if (currentUser === "træner") {
    displayCoachNav();
  }
}
