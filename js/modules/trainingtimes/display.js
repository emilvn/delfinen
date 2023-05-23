import { getOneUser, getTrainingTimesByCategory } from "../../rest/fetch.js";
import { calculateAge, categoriesInDanish, sortArrayByKeyAscending, sortArrayByKeyDescending} from "../helpers/helpers.js";
import { capitalize } from "../helpers/formatting.js";
import { sortTrainingTimesByHeader } from "./sort.js";

export let globalDisplayArray = [];

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
            isodate: new Date(trainingTimesArray[i].date).toISOString(),
        };
    }
}

export function displayTrainingTimes() {
    const displayArray = sortArrayByKeyAscending(getDisplayArray(), "time");
    displayHeaderText();
    displayGridHeader("ascending", "ascending", "ascending", displayArray);
    displayGridBody(displayArray);
    globalDisplayArray = displayArray;
}

function displayHeaderText() {
    const category = document.querySelector("#training-category__select").value;
    const team = capitalize(document.querySelector('input[name="teamselect"]:checked').value);
    const categoryInDanish = capitalize(categoriesInDanish[category]);

    document.querySelector("#training-category__header").innerHTML = `${categoryInDanish} - ${team}`;
}

export function displayGridHeader(nameOrder, dateOrder, timeOrder, displayArray) {
    document.querySelector(".training-grid-container").innerHTML = /* html */ `
        <div id="training-grid-header">
            <span class="training-grid-header__span" data-key="name" data-order=${nameOrder}>Navn </span>
            <span class="training-grid-header__span" data-key="isodate" data-order=${dateOrder}>Dato </span>
            <span class="training-grid-header__span" data-key="time" data-order=${timeOrder}>Tid </span>
        </div>
    `;
    document.querySelectorAll(".training-grid-header__span").forEach((span) => {
        span.addEventListener('mouseup', () => {    
            sortTrainingTimesByHeader(displayArray, span.dataset.key, span.dataset.order);
        });
    });
}

export function displayGridBody(displayArray) {
    for (let i = 0; i < displayArray.length; i++) {
        const timeHTML = /* html */ `
            <div>
                <span>${displayArray[i].name}</span>
                <span>${displayArray[i].date}</span>
                <span>${displayArray[i].time} sek.</span>        
            </div>
        `;
        document.querySelector(".training-grid-container").insertAdjacentHTML("beforeend", timeHTML);
    }
}

function getDisplayArray() {
    const selectedTeam = document.querySelector('input[name="teamselect"]:checked').value;
    const displayArray = [];
    for (let i = 0; i < globalDisplayArray.length; i++) {
        if (selectedTeam === "junior" && globalDisplayArray[i].age <= 18) {
            displayArray.push(globalDisplayArray[i]);
        } else if (selectedTeam === "senior" && globalDisplayArray[i].age > 18) {
            displayArray.push(globalDisplayArray[i]);
        }
    }
    console.log(displayArray);
    return displayArray;
}

export function displaySortingArrow(header, order) {
    let sortingArrowHTML;
    
    if(document.querySelector("#sorting-arrow")) {
        document.querySelector("#sorting-arrow").remove();
    }

    const headers = document.querySelectorAll(".training-grid-header__span");

    if (order === "ascending") {
        sortingArrowHTML = /* html */ `<span id="sorting-arrow">↓</span>`;
    } else {
        sortingArrowHTML = /* html */ `<span id="sorting-arrow">↑</span>`;
    }

    for (let i = 0; i < headers.length; i++) {
        if (headers[i].dataset.key === header) {
            headers[i].insertAdjacentHTML("beforeend", sortingArrowHTML);
        }
    }

}