import { showNavDropdown, showFullNav } from "./modules/nav/dropdown.js";
import { generateNavHTML, displayCoachNav} from "./modules/nav/nav.js";

window.addEventListener("load", main);

function main() {
  if (!document.URL.includes("index.html") && document.URL.includes(".html")) {
    generateNavHTML();
  }
  displayCoachNav();
  setEventListeners();
}

function setEventListeners() {
  document.querySelector("#navExpandButton").addEventListener("click", showNavDropdown);
  window.addEventListener("resize", showFullNav);
}