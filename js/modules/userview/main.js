import {filterUsers, updateUserGrid} from "./display.js";
import {inputSearchChanged} from "./search.js";
import {showCreateDialog, toggleCategoryFieldset} from "./dialogs.js";
import {setTodayAsMaxDate} from "../helpers/helpers.js";

window.addEventListener("load", main);

async function main(){
	await updateUserGrid();
	setMaxDates()
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
	document.querySelector("#post_user_competitive").addEventListener("change", toggleCategoryFieldset)
	document.querySelector("#update_user_competitive").addEventListener("change", toggleCategoryFieldset)
}

function setMaxDates(){
	/* Update and create forms */
	setTodayAsMaxDate("post_user_birthdate");
	setTodayAsMaxDate("update_user_birthdate");
	/* trainingtimes time form */
	setTodayAsMaxDate("date-time");
}