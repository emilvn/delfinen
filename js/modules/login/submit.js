import {validUser} from "./validate.js";
import {reDirect} from "../helpers/helpers.js";
import {showToastMessage} from "../helpers/toastmessages.js";

export function submitLogin(event) {
  event.preventDefault();

  const username = document.querySelector("#user_name").value;
  const password = document.querySelector("#password").value;

  if (validUser(username)) {
    if (password === username) {
      login(username);
    } else {
      showToastMessage("Ugyldigt password", "error");
    }
  }
  else{
    showToastMessage("Ugyldig bruger", "error");
  }
}

function login(username) {
    localStorage.setItem("username", username);
    reDirect(`../index`);
}