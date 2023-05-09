
import {showNavDropdown, showFullNav} from "./modules/nav/dropdown.js";

window.addEventListener("load", main);

function main(){
	setEventListeners();
}

function setEventListeners() {
	document.querySelector("#navExpandButton").addEventListener("click", showNavDropdown);
	window.addEventListener("resize", showFullNav);
}
