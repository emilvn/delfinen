import {filterUsers, updateUserGrid} from "./display.js";

window.addEventListener("load", main);

async function main(){
	await updateUserGrid();
	setEventListeners();
}

function setEventListeners(){
	/* Search */
	const searchBar = document.querySelector("#userSearch");

	/* Filter */
	document.querySelector("#userFilter").addEventListener("change", filterUsers);
}