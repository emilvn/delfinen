import { getOneUser, getTrainingTimesByCategory } from "../../rest/fetch.js";
import { calculateAge, categoriesInDanish } from "../helpers/helpers.js";
import { capitalize } from "../helpers/formatting.js";

let globalDisplayArray = [];

export async function setGlobalDisplayArray() {
    globalDisplayArray = [];
    const category = document.querySelector("#training-category__select").value;
    const trainingTimesArray = await getTrainingTimesByCategory(category);
    for (let i = 0; i < trainingTimesArray.length; i++) {
        const user = await getOneUser(trainingTimesArray[i].id);
        globalDisplayArray[i] = {
            name: user.name,
            age: calculateAge(user.birthdate),
            time: trainingTimesArray[i].time,
            date: new Date(trainingTimesArray[i].date).toLocaleDateString("en-GB"),
        };
    }
}

export function displayTrainingTimes() {
    displayHeaderText();
    const displayArray = getDisplayArray();
    console.log(displayArray);

    document.querySelector(".training-grid-container").innerHTML = /* html */ `
        <div id="training-grid-header">
            <span>Navn</span>
            <span>Dato</span>
            <span>Tid</span>
        </div>
    `

    for (let i = 0; i < displayArray.length; i++) {
        const timeHTML = /* html */ `
            <div>
                <span>${displayArray[i].name}</span>
                <span>${displayArray[i].date}</span>
                <span>${displayArray[i].time} sek.</span>        
            </div>
        `
        document.querySelector(".training-grid-container").insertAdjacentHTML("beforeend", timeHTML);
    }
}

function displayHeaderText() {
    const category = document.querySelector("#training-category__select").value;
    const team = capitalize(document.querySelector('input[name="teamselect"]:checked').value);
    const categoryInDanish = capitalize(categoriesInDanish[category]);

    document.querySelector("#training-category__header").innerHTML = `${categoryInDanish} - ${team}`;
}

function getDisplayArray() {
    const team = document.querySelector('input[name="teamselect"]:checked').value;
    const displayArray = [];
    for (let i = 0; i < globalDisplayArray.length; i++) {
        if (team === "junior" && globalDisplayArray[i].age <= 18) {
            displayArray.push(globalDisplayArray[i]);
        } else if (team === "senior" && globalDisplayArray[i].age > 18) {
            displayArray.push(globalDisplayArray[i]);
        }
    }
    return displayArray;
}
