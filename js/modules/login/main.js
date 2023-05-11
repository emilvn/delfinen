"use strict";

window.addEventListener("load", getLocalStorage);

// function main() {
//   console.log("Hello");
// }

// function login(event) {
//   event.preventDefault();
//   getLocalStorage();
// }

function getLocalStorage() {
  const form = document.querySelector("#login_form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.querySelector("#user_name").value;
    const passW = document.querySelector("#password").value;

    if (username === "admin" || username === "træner") {
      if (passW === username) {
        localStorage.setItem("admin", username);
      } else {
        document.querySelector("#result").textContent = "Error";
      }
    }
  });
}

// function reDirect() {
//     window.location = ""
// }
