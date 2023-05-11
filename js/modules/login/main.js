"use strict";

window.addEventListener("load", getLocalStorage);

// function login(event) {
//   event.preventDefault();
//   getLocalStorage();
// }

function getLocalStorage() {
  const form = document.querySelector("#login_form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.querySelector("#user_name").value;
    const password = document.querySelector("#password").value;

    if (username === "admin" || username === "træner") {
      if (password === username) {
        localStorage.setItem("admin", username);
      } else {
        document.querySelector("#result").textContent = "Error something went wrong";
      }
    }
  });
}

function reDirect(url) {
    window.location.href = "`$http://127.0.0.1:5501/pages/userview.html`";
}
