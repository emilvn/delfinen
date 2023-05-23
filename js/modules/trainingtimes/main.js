import {displayTrainingTimes, setGlobalDisplayArray, globalDisplayArray} from "./display.js"
import { searchForName } from "./search.js";

window.addEventListener("load", main);

async function main() {
    await setGlobalDisplayArray();
    displayTrainingTimes();
    setEventListeners();
}

function setEventListeners() {
    document.querySelector("#training-category__select").addEventListener("change", async () => {
        await setGlobalDisplayArray();
        displayTrainingTimes();
    });
    document.querySelectorAll("input[name='teamselect']").forEach((input) => {
        input.addEventListener('change', displayTrainingTimes);
    });
    document.querySelector("#training-time-search").addEventListener("change", (event) => searchForName(event, globalDisplayArray))
}