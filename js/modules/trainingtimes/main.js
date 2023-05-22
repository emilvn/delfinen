import {displayTrainingTimes, setGlobalDisplayArray} from "./display.js"

window.addEventListener("load", main);

async function main() {
    setEventListeners();
    await setGlobalDisplayArray();
    displayTrainingTimes();
}

function setEventListeners() {
    document.querySelector("#training-category__select").addEventListener("change", async () => {
        await setGlobalDisplayArray();
        displayTrainingTimes();
    });
    document.querySelectorAll("input[name='teamselect']").forEach((input) => {
        input.addEventListener('change', displayTrainingTimes);
    });
}