import {findTop5Competitors} from "./filter.js";
import {capitalize} from "../helpers/formatting.js";
import {categoriesInDanish} from "../helpers/helpers.js";


export async function displayTop5Competitors(category, competition, team){
    const competitors = await findTop5Competitors(category, competition, team);
    /* creating header */
    document.querySelector("#competition-category__header")
        .textContent = capitalize(competition) + " - " + capitalize(categoriesInDanish[category]) + " - " + capitalize(team);

    /* Clearing competitor info before inserting new */
    const competitorContainers = document.querySelectorAll(".competitor");
    competitorContainers.forEach(container => container.innerHTML = "");

    /* inserting competitor info */
    for(let i = 0; i<competitors.length; i++){
        const competitorContainer = document.querySelector(`#competitor-number-${i+1}__competitor`);
        competitorContainer.innerHTML = /*html*/`
            <h3>${competitors[i]["name"]}</h3>
            <ul>
                <li>Placering: ${competitors[i]["position"]}</li>
                <li>Tid: ${competitors[i]["time"]}</li>
            </ul>
            `;
    }
}