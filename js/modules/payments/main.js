import {getAllUsers, getAlreadyExistingUserPayments} from "../../rest/fetch.js";
import {displayUsers} from "./display.js";
import {calculateAndDisplayPayments} from "./calculation.js";
import {sortUsersNameAlphabetically} from "../helpers/formatting.js";
import {paymentSearchChanged} from "./search.js";

window.addEventListener('load', main);

export let users;

async function main(){
    users = await getAllUsers();
    const payments = await getAlreadyExistingUserPayments();
    sortUsersNameAlphabetically(users);
    displayUsers(users);
    calculateAndDisplayPayments(users, payments);
    setEventListeners();
}

function setEventListeners(){
    const searchBar = document.querySelector("#paymentSearch");
    searchBar.addEventListener("search", paymentSearchChanged);
    searchBar.addEventListener("keyup", paymentSearchChanged);
}
