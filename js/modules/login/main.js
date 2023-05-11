"use strict";

window.addEventListener("load", main);

function main() {
  document.querySelector("#login_form").addEventListener("submit", setLocaleStorage);
}

function setLocaleStorage(event) {
  event.preventDefault();

  const username = document.querySelector("#user_name").value;
  const password = document.querySelector("#password").value;

  if (username === "admin" || username === "træner") {
    if (password === username) {
      localStorage.setItem("admin", username);
      document.querySelector("#result").innerHTML = "Logged in";
      reDirect();
    } else {
      document.querySelector("#result").innerHTML = "Error something went wrong";
    }
  }
}

function reDirect() {
  if (localStorage.getItem("admin") !== null) {
    window.location = "userview.html";
  } else {
    console.log(`Admin not found`);
  }
}
