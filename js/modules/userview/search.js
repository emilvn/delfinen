import {showUsers, userArr} from "./display.js";

export function inputSearchChanged(event){
	const searchValue = event.target.value;
	const filteredUsers = userArr
		.filter(user => user["name"].toLowerCase().includes(searchValue.toLowerCase()));
	showUsers(filteredUsers);
}