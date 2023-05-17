import {findTop5Competitors} from "./filter.js";


export async function displayTop5Competitors(category, competition){
    const competitors = await findTop5Competitors(category, competition);

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