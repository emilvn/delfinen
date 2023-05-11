"use strict";

window.addEventListener("load", main);

function main() {
  
  document.querySelector("#login_form").addEventListener("submit", setLocaleStorage)
  document.querySelector("#testbtn").addEventListener("click", reDirect)
}

function setLocaleStorage(event) {
  event.preventDefault();

  const username = document.querySelector("#user_name").value;
  const password = document.querySelector("#password").value;

   if (username === "admin" || username === "træner") {
     if (password === username) {
       localStorage.setItem("admin", username);
     } else {
       console.log("Test");
       document.querySelector("#result").innerHTML = "Error something went wrong";
     }
   }

   
}

function reDirect() {
    window.location = "userview.html";
}
