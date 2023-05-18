import {getAllUsers, getAlreadyExistingUserPayments, getPriceData,} from "../../rest/fetch.js";
import {displayUsers} from "./display.js";
import {calculateAndDisplayPayments} from "./calculation.js";
import {sortUsersNameAlphabetically} from "../helpers/formatting";

window.addEventListener('load', main);

async function main(){
    const users = await getAllUsers();
    const payments = await getAlreadyExistingUserPayments();
    sortUsersNameAlphabetically(users);
    displayUsers(users);
    calculateAndDisplayPayments(users, payments);
}