import {payments, users} from "./main.js";
import {displayUsers} from "./display.js";
import {calculateAndDisplayPayments} from "./calculation.js";

export function paymentSearchChanged(event){
	const searchValue = event.target.value;
	const filteredUsers = users
		.filter(user => user["name"].toLowerCase().includes(searchValue.toLowerCase()));
	displayUsers(filteredUsers);
	calculateAndDisplayPayments(filteredUsers, payments);
}