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
			<p>${(user["phone"].length > 0)?`Telefon: ${user["phone"]}`:""}</p>
			<p>${user["age"]}</p>
			<p>Medlemskab: ${(user["membershipPassive"])?"Passiv":"Aktiv"}</p>
			<p>${(user["competitive"])?"Konkurrencesvømmer":"Motionist"}</p>
		</div>
		<div>
			<button class="add-competitiontime-btn">Tilføj konkurrence tid</button>
			<button class="add-trainingtime-btn">Tilføj trænings tid</button>
			<button class="delete-user-btn">Slet</button>
			<button class="edit-user-btn">Redigér</button>
		</div>
	</article>
	`;
	const usersGrid = document.querySelector("#userGrid");
	usersGrid.insertAdjacentHTML("beforeend", myHTML);

	/*todo: add event listeners for buttons*/
}