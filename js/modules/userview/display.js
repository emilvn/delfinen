import {getAllUsers} from "../../rest/fetch.js";
import {showDeleteDialog, showTrainingTimeDialog, showUpdateDialog} from "./dialogs.js";

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

function showUser(user){
	const myHTML = /*html*/`
	<article>
		<div>
			<h3>${user["name"]}</h3>
			<p>Email: ${user["email"]}</p>
			<p>${(user["phone"])?`Telefon: ${user["phone"]}`:""}</p>
			<p>${user["age"]} år</p>
			<p>Medlemskab: ${(user["membershipPassive"])?"Passiv":"Aktiv"}</p>
			<p>${(user["competitive"])?"Konkurrencesvømmer":"Motionist"}</p>
		</div>
		<div class="user-btns">
			<div>		
				<button class="edit-user-btn" data-id="${user["id"]}">Redigér bruger</button>
				<button class="add-competitiontime-btn" data-id="${user["id"]}">Tilføj stævne tid</button>
			</div>
			<div>
				<button class="delete-user-btn" data-id="${user["id"]}">Slet bruger</button>
				<button class="add-trainingtime-btn" data-id="${user["id"]}">Tilføj trænings tid</button>
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
	const competitionBtn = currentUserArticle.querySelector(".add-competitiontime-btn");
	const trainingBtn = currentUserArticle.querySelector(".add-trainingtime-btn");

	/*Event listeners*/
	deleteBtn.addEventListener("click", showDeleteDialog);
	updateBtn.addEventListener("click", showUpdateDialog);
//	competitionBtn.addEventListener("click", showCompetitionDialog);
	trainingBtn.addEventListener("click", showTrainingTimeDialog);
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
		userArr = userArr.filter(user => user["age"] < 18);
	}
	else if(teamFilter.value === "senior"){
		userArr = userArr.filter(user => user["age"] >= 18);
	}
	showUsers(userArr);
}