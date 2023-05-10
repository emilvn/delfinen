import {showNavDropdown, showFullNav} from "./modules/nav/dropdown.js";

window.addEventListener("load", main);

function main(){
	document.querySelector("#navExpandButton").addEventListener("click", showNavDropdown);
	window.addEventListener("resize", showFullNav);
}