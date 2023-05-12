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
        <div class="coach-image" style="background-image: url(${coach["image"]})"></div>
        <div class="coach-contact-info">
            <div>
                <h3>Kontaktinformation</h3>
                <ul>
                    <li>Tlf. - <a href="tel:+45${coach["phone"]}">${coach["phone"]}</a></li>
                    <li>Email - <a href="mailto:${coach["email"]}">${coach["email"]}</a></li>
                </ul>
            </div>
        </div>
        <div class="coach-about">
            <h2>${coach["name"]} - ${capitalize(coach["team"])} træner</h2>
            <h3>Om mig</h3>
            <p>${coach["about"]}</p>
        </div>
    </article>
    `;
    coachContainer.insertAdjacentHTML("beforeend", myHTML);
}