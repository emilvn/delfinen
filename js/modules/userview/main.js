import {filterUsers, updateUserGrid} from "./display.js";
import {inputSearchChanged} from "./search.js";

window.addEventListener("load", main);

async function main(){
	await updateUserGrid();
	setEventListeners();
}

function setEventListeners(){
	/* Search */
	const searchBar = document.querySelector("#userSearch");
	searchBar.addEventListener("keyup", inputSearchChanged);
	searchBar.addEventListener("search", inputSearchChanged);
	/* Filter */
	document.querySelector("#userFilter").addEventListener("change", filterUsers);
}