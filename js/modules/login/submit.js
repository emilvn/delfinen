import {validUser} from "./validate.js";
import {reDirect} from "../helpers/helpers.js";

export function submitLogin(event) {
  event.preventDefault();

  const username = document.querySelector("#user_name").value;
  const password = document.querySelector("#password").value;

  if (validUser(username)) {
    if (password === username) {
      login(username);
    } else {
      document.querySelector("#result").innerHTML = "Error something went wrong";
    }
  }
}

function login(username) {
    localStorage.setItem("username", username);
    reDirect(`../index`);
}