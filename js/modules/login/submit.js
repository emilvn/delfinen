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

function validUser(username) {
    return username === "admin" || username === "træner";
}

export function resetLocalStorage() {
    localStorage.removeItem("username");
}

function reDirect(pageName) {
  window.location = `${pageName}.html`;
}
