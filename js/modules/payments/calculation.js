import {getPriceData} from "../../rest/fetch.js";


export async function calculateAndDisplayPayments(users, payments) {
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