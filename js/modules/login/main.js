function main() {

    document.querySelector("#login_form").addEventListener("submit", login);
}


function login(e) {
    e.preventDefault();
    setLocaleStorage();

}


function setLocaleStorage(event) {
    console.log("Kører før Locale Storage")
    event.preventDefault();
    const userName = document.querySelector("#user_name").value;
    const password = document.queryselector("#password").value;

     setLocaleStorage("username", password);
     setLocaleStorage("password", password);

     console.log("kører efter Locale St")

    

    

    

}

function reDirect() {
    window.location = "/userview.html"
}