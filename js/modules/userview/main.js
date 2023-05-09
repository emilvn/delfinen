import {updateUserGrid} from "./display.js";
import { showDeleteDialog } from "./deleteUser.js";

window.addEventListener("load", main);

async function main(){
	await updateUserGrid();

	  document.querySelector(".delete-user-btn").addEventListener("click", showDeleteDialog);
}