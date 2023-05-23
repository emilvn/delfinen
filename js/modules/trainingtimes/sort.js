import { sortArrayByKeyAscending, sortArrayByKeyDescending } from "../helpers/helpers.js";
import { displayGridBody, displayGridHeader, displaySortingArrow } from "./display.js";

export function sortTrainingTimesByHeader(arr, header, order) {
    let nextOrder;
    if (order === "ascending") {
        arr = sortArrayByKeyAscending(arr, header);
        nextOrder = "descending";
    } else {
        arr = sortArrayByKeyDescending(arr, header);
        nextOrder = "ascending";
    }
    
    switch(header) {
        case "name":
            console.log("switch name");
            displayGridHeader(nextOrder, "ascending", "ascending", arr);
            break;
        case "isodate":
            console.log("switch date");
            displayGridHeader("ascending", nextOrder, "ascending", arr);
            break;
        case "time":
            console.log("switch time");
            displayGridHeader("ascending", "ascending", nextOrder, arr);
            break;
        default:
            break;
    }
    displaySortingArrow(header, order);
    displayGridBody(arr);
}