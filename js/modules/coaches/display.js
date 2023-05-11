import {getCoaches} from "../../rest/fetch.js";
import {capitalize} from "../preparation/formatting.js";

let coachArr;

export async function updateCoachesGrid(){
    coachArr = await getCoaches();
    showCoaches(coachArr);
}

function showCoaches(coaches){
    document.querySelector("#coach-grid").innerHTML = "";
    for(const coach of coaches){
        showCoach(coach);
    }
}

function showCoach(coach){
    const coachContainer = document.querySelector("#coach-grid");
    const myHTML = /*html*/`
    <article>
        <div class="coach-image">
            <img src="${coach["image"]}" alt="">    
        </div>
        <div class="coach-contact-info">
            <div>
                <h3>Kontaktinformation:</h3>
                <ul>
                    <li>Tlf: ${coach["phone"]}</li>
                    <li>Email: ${coach["email"]}</li>
                </ul>
            </div>
        </div>
        <div class="coach-about">
            <h2>${coach["name"]} - ${capitalize(coach["team"])} træner</h2>
            <h3>Om mig:</h3>
            <p>${coach["about"]}</p>
        </div>
    </article>
    `;
    coachContainer.insertAdjacentHTML("beforeend", myHTML);
}