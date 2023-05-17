import {findTop5Competitors} from "./filter.js";
import {capitalize} from "../helpers/formatting.js";


export async function displayTop5Competitors(category, competition, team){
    const competitors = await findTop5Competitors(category, competition, team);
    document.querySelector("#competition-category__header")
        .textContent = capitalize(competition) + " - " + capitalize(category)
    for(let i = 0; i<competitors.length; i++){
        document.querySelector(`#competitor-number-${i+1}__competitor`)
            .innerHTML = /*html*/`
            <h3>${competitors[i]["name"]}</h3>
            <ul>
                <li>Placering: ${competitors[i]["position"]}</li>
                <li>Tid: ${competitors[i]["time"]}</li>
            </ul>
            `;
    }
}