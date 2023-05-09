import {updateUserGrid} from "./display.js";

window.addEventListener("load", main);

async function main(){
	await updateUserGrid();
}