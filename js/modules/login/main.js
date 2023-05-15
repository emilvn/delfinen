import { submitLogin, resetLocalStorage } from "./submit.js";
window.addEventListener("load", main);

function main() {
  resetLocalStorage("username");
  document.querySelector("#login_form").addEventListener("submit", submitLogin);
}
