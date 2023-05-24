import { submitLogin } from "./submit.js";
import { resetLocalStorage } from "../helpers/helpers.js";
window.addEventListener("load", main);

function main() {
  resetLocalStorage("username");
  document.querySelector("#login_form").addEventListener("submit", submitLogin);
}
