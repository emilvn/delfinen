
window.addEventListener("load", main)


function main() {
    console.log("Hello");

    
}


function loginAdminOrCoach() {
   
    const username = document.querySelector("#user_name").value;

    const passW = document.querySelector("#password").value;

    const results = document.querySelector("#result")

    const user = localStorage.getItem(username)
    const data = JSON.parse(user)
    console.log(data)

    if (user == null) {
        results.innerHTML = "Forkert Brugernavn"
    } else if (username == data.username && passW == data.password) {
        console.log(username);
        results.innerHTML = "Logget ind";
    } else {
        results.innerHTML = "Forkert Password";
    }

   

}