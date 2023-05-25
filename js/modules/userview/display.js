import {getAllUsers} from "../../rest/fetch.js";
import {showCompetitionDialog, showDeleteDialog, showTrainingTimeDialog, showUpdateDialog} from "./dialogs.js";
import {calculateAge} from "../helpers/helpers.js";
import {categoriesInDanish} from "../helpers/helpers.js";

export let userArr;

export async function updateUserGrid(){
	userArr = await getAllUsers();
	showUsers(userArr);
}

export function showUsers(users){
	document.querySelector("#userGrid").innerHTML = "";
	for(const user of users){
		showUser(user);
	}
}

export function showUser(user){
	const userAge = calculateAge(user["birthdate"]);
	const categoryHTML = generateCategoryHTML(user["categories"]);
	const myHTML = /*html*/`
	<article>
		<div>
			<h3>${user["name"]}</h3>
			<p>Email: <a href="mailto:${user["email"]}">${user["email"]}</a></p>
			<p>${(user["phone"])?`Telefon: <a href="tel:+45${user["phone"]}">${user["phone"]}</a>`:""}</p>
			<p>${userAge} år</p>
			<p>Medlemskab: ${(user["membershipPassive"])?"Passiv":"Aktiv"}</p>
			<p>${(user["competitive"])?"Konkurrencesvømmer":"Motionist"}</p>
			${categoryHTML?? ""} 
		</div>
		<div class="user-btns">
			<div>		
				<button class="edit-user-btn" data-id="${user["id"]}">Redigér medlem</button>
				<div class="user-competitiontime-btn-div"></div>
			</div>
			<div>
				<button class="delete-user-btn" data-id="${user["id"]}">Slet medlem</button>
				<button class="add-trainingtime-btn" data-id="${user["id"]}">Redigér trænings tider</button>
			</div>
		</div>
	</article>
	`;
	const usersGrid = document.querySelector("#userGrid");
	usersGrid.insertAdjacentHTML("beforeend", myHTML);

  	/*Current user article*/
  	const currentUserArticle = usersGrid.querySelector("article:last-child");
  	/*current buttons*/
  	const deleteBtn = currentUserArticle.querySelector(".delete-user-btn");
  	const updateBtn = currentUserArticle.querySelector(".edit-user-btn");
  	const trainingBtn = currentUserArticle.querySelector(".add-trainingtime-btn");
  	const currentUser = localStorage.getItem("username");

  	if (currentUser === "træner") {
    	deleteBtn.style.display = "none";
    	updateBtn.style.display = "none";
  	}

	/*Event listeners*/
	deleteBtn.addEventListener("click", showDeleteDialog);
	updateBtn.addEventListener("click", showUpdateDialog);
	trainingBtn.addEventListener("click", showTrainingTimeDialog);
	if(user["competitive"]){
		currentUserArticle.querySelector(".user-competitiontime-btn-div")
			.innerHTML = `
				<button class="add-competitiontime-btn" data-id="${user["id"]}">Redigér stævne tider</button>
			`;
		const competitionBtn = currentUserArticle.querySelector(".add-competitiontime-btn");
		competitionBtn.addEventListener("click", showCompetitionDialog);
	}
}

function generateCategoryHTML(categories) {
	if(categories) {
		let categoryString = /* html */ `Aktive discipliner: `
		for (let i = 0; i<categories.length; i++) {
			if(i !== categories.length-1){
				categoryString += categoriesInDanish[categories[i]] + ", ";
			}
			else{
				categoryString += categoriesInDanish[categories[i]] + "."
			}
		}
		return /*html*/`<p>${categoryString}</p>`;
	}
}

/* ========== FILTER ========== */
export async function filterUsers(){
	const teamFilter = document.querySelector("#userTeamFilter");
	const competitionFilter = document.querySelector("#userCompetitiveFilter");
	await updateUserGrid();
	if(competitionFilter.checked){
		userArr = userArr.filter(user => user["competitive"]);
	}
	if(teamFilter.value === "junior"){
		userArr = userArr.filter(user => calculateAge(user["birthdate"]) < 18);
	}
	else if(teamFilter.value === "senior"){
		userArr = userArr.filter(user => calculateAge(user["birthdate"]) >= 18);
	}
	showUsers(userArr);
}