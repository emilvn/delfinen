import { submitUser } from "./postuser.js";
window.addEventListener("load", main);

async function main(){
	setEventListeners();
}

function setEventListeners() {
    document.querySelector("#post_user_form").addEventListener("submit", event => {submitUser(event)});
    document.querySelector("#post_user_dialog_open").addEventListener("mouseup", () => {document.querySelector("#post_user_dialog").showModal()});
}