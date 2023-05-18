import { getAllUsers, getPriceData, getAlreadyExistingUserPayments} from "../rest/fetch.js";

window.addEventListener('load', main);

async function main(){
    const users = await getAllUsers();
    const payments = await getAlreadyExistingUserPayments();
    sortUsersNameAlphabetically(users);
    displayUsers(users);
    calculateAndDisplayPayments(users, payments);
}

function displayUsers(users) {
    for (const user of users) {
        const html = /*html*/`
            <tr class="name"> 
                <td> ${user.name}: </td> 
                <td>  <input type="number" class="restance" name="restance" data-user="${user.id}"> </td>   
            </tr>
        `;
        document.querySelector('#user-name').insertAdjacentHTML('beforeend', html);
    }
}

async function calculateAndDisplayPayments(users, payments) {
    const prices = await getPriceData();
    for (const user of users) {
        const userPrice = calculateUserPrice(user.birthdate, user.membershipPassive, prices);
        const inputElement = document.querySelector(`input[name="restance"][data-user="${user.id}"]`);
        const userPayment = payments[user.id] ? payments[user.id]["payment"] : 0;
        inputElement.value = userPrice - userPayment;
    }
}

function calculateUserPrice(birthdate, membershipPassive, pricesData) {
    if (membershipPassive) {
        return pricesData.passive;
    }
    const currentDate = new Date();
    const dateOfBirth = new Date(birthdate);
    const age = currentDate.getFullYear() - dateOfBirth.getFullYear();

    if(age > 60){
        return pricesData.over60
    } else if(age >= 18){
        return pricesData.over18
    } else{
        return pricesData.under18
    }
}

function sortUsersNameAlphabetically(users) {
  users.sort((a, b) => a.name.localeCompare(b.name));
}



