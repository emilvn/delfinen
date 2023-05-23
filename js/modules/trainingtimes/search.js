import { displayGridBody, displayGridHeader } from "./display.js";

export function searchName(event, arr) {
	const searchValue = event.target.value;
	const searchArr = arr
		.filter(user => user["name"].toLowerCase().includes(searchValue.toLowerCase()));
    displayGridHeader("ascending", "ascending", "ascending", searchArr);
	displayGridBody(searchArr);
}