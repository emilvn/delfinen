import { submitUser } from "./postuser.js";
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
	document.querySelector("#userTeamFilter").addEventListener("change", filterUsers);
	document.querySelector("#userCompetitiveFilter").addEventListener("change", filterUsers);
	/* Create */
	document.querySelector("#post_user_form").addEventListener("submit", event => {submitUser(event)});
	document.querySelector("#post_user_dialog_open").addEventListener("mouseup", () => { document.querySelector("#post_user_dialog").showModal() });
}