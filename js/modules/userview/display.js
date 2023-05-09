import {sendFetchToDB} from "../../rest/fetch.js";
import {prepareData} from "../preparation/preparedata.js";

let userArr;

export async function updateUserGrid(){
	const response = await sendFetchToDB("users.json", "GET");
	if(response.ok){
		const usersObj = await response.json();
		userArr = prepareData(usersObj);
		showUsers(userArr);
	}
	else{
		throw new Error(`Bad response at updateUserGrid: ${response.status} ${response.statusText}.`);
	}
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
			<p>${user["age"]}</p>
			<p>Medlemskab: ${(user["membershipPassive"])?"Passiv":"Aktiv"}</p>
			<p>${(user["competitive"])?"Konkurrencesvømmer":"Motionist"}</p>
		</div>
		<div class="user-btns">
			<button class="add-competitiontime-btn" data-id="${user["id"]}">Tilføj stævne tid</button>
			<button class="add-trainingtime-btn" data-id="${user["id"]}">Tilføj trænings tid</button>
			<button class="delete-user-btn" data-id="${user["id"]}">Slet bruger</button>
			<button class="edit-user-btn" data-id="${user["id"]}">Redigér bruger</button>
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
	const competitionBtn = currentUserArticle.querySelector("add-competitiontime-btn");
	const trainingBtn = currentUserArticle.querySelector("add-trainingtime-btn");

	/*Event listeners*/
//	deleteBtn.addEventListener("click", showDeleteDialog);
//	updateBtn.addEventListener("click", showUpdateDialog);
//	competitionBtn.addEventListener("click", showCompetitionDialog);
//	trainingBtn.addEventListener("click", showTrainingDialog)
}