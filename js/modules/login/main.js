import { submitLogin, resetLocalStorage } from "./submit.js";
window.addEventListener("load", main);

function main() {
  resetLocalStorage();
  document.querySelector("#login_form").addEventListener("submit", submitLogin);
}
