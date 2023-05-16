import { getAllUsers } from "../rest/fetch.js";
import { prepareData } from "../modules/helpers/preparedata.js";

window.addEventListener('load', main);

async function main(){
    const users = await getAllUsers();
    displayUsers(users);
    console.log(users);
}

function displayUsers (users){
    for(const user of users){
        const html = /*html*/`
        <div>${user.name}</div>
        `
        document.querySelector('body').insertAdjacentHTML('beforeend', html)
    }
}