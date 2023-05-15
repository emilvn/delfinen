import {showNavDropdown, showFullNav} from "./modules/nav/dropdown.js";
import { generateNavHTML } from "./modules/nav/nav.js";
import {displayVideo} from "./modules/index/video.js";

window.addEventListener("load", main);

function main(){
	if(!document.URL.includes("index.html")){
		generateNavHTML();
	}
	setEventListeners();
	displayVideo();
}

function setEventListeners() {
	document.querySelector("#navExpandButton").addEventListener("click", showNavDropdown);
	window.addEventListener("resize", showFullNav);
}