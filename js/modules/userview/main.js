import {filterUsers, updateUserGrid} from "./display.js";
import {inputSearchChanged} from "./search.js";
import {showCreateDialog} from "./dialogs.js";
import {setTodayAsMaxDate} from "../helpers/helpers.js";

window.addEventListener("load", main);

async function main(){
	await updateUserGrid();
	setTodayAsMaxDate("post_user_birthdate");
	setTodayAsMaxDate("update_user_birthdate");
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
	document.querySelector("#post_user_dialog_open").addEventListener("click", showCreateDialog);
}