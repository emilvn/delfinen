import {showNavDropdown, showFullNav} from "./modules/nav/dropdown.js";
import { generateNavHTML } from "./modules/nav/nav.js";

window.addEventListener("load", main);

function main(){
	generateNavHTML();
	setEventListeners();
	displayVideo();
}

function setEventListeners() {
	document.querySelector("#navExpandButton").addEventListener("click", showNavDropdown);
	window.addEventListener("resize", showFullNav);
}

function displayVideo(){
	const videoBg = document.createElement('video');
	videoBg.src = 'data/videos/water.mp4';
	videoBg.muted = true;
	videoBg.loop = true;
	videoBg.autoplay = true;
	videoBg.setAttribute('id', 'videoBackground');
	document.querySelector('#homeMainScreen').appendChild(videoBg);
}