import {showNavDropdown, showFullNav} from "./modules/nav/dropdown.js";
import { generateNavHTML } from "./modules/nav/nav.js";

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

function displayVideo(){
	const waterVideo = document.createElement('video');
	waterVideo.src = 'data/videos/water.mp4';
	waterVideo.muted = true;
	waterVideo.loop = true;
	waterVideo.autoplay = true;
	waterVideo.setAttribute('id', 'videoBackground');
	document.querySelector('#homeMainScreen').appendChild(waterVideo);
}