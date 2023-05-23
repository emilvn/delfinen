import { displayGridBody, displayGridHeader } from "./display.js";

export function searchForName(event, arr) {
	console.log("trying to search");
	const searchValue = event.target.value;
	const searchArr = arr
		.filter(user => user["name"].toLowerCase().includes(searchValue.toLowerCase()));
    displayGridHeader("ascending", "ascending", "ascending", searchArr);
	displayGridBody(searchArr);
}