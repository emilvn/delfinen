import { getOneUser, getTrainingTimesByCategory } from "../../rest/fetch.js";
import { calculateAge } from "../helpers/helpers.js";

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
        };
    }
}

export function displayTrainingTimes() {
    const displayArray = getDisplayArray();
    console.log(displayArray);
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
