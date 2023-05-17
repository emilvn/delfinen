import {getCompetitionData} from "../../rest/fetch.js";
import {capitalize} from "../helpers/formatting.js";
import {displayTop5Competitors} from "./display.js";

export let competitionsObj;

/* =========== COMPETITION SELECT =========== */
export async function generateCompetitionOptions(){
    competitionsObj = await getCompetitionData();
    document.querySelector("#competition-competition__select").innerHTML = "<option value='none' selected></option>";
    for(const competition in competitionsObj){
        generateCompetitionOption(competition);
    }
}
function generateCompetitionOption(competition){
    const myHTML = /*html*/`<option value="${competition}">${capitalize(competition)}</option>`;
    const competitionSelect = document.querySelector("#competition-competition__select");
    competitionSelect.insertAdjacentHTML("beforeend", myHTML);
}
export function competitionSelectChanged(event){
    const competition = event.target.value;
    const categorySelect = document.querySelector("#competition-category__select");
    if(competition !== "none"){
        generateCategoryOptions(competition);
    }
    else{
        categorySelect.disabled = true;
        categorySelect.innerHTML = "";
        document.querySelector("#competition-category__header").textContent ="";
        for(let i = 1; i<6; i++){
            document.querySelector(`#competitor-number-${i}__competitor`).innerHTML = "";
        }
        document.querySelector("#competition-team-select__junior").disabled = true;
        document.querySelector("#competition-team-select__senior").checked = true;
    }
}

/* =========== CATEGORY SELECT =========== */
function generateCategoryOptions(competition){
    const categories =  competitionsObj[competition];
    const categorySelect = document.querySelector("#competition-category__select");
    const team = document.querySelector("#competition-team-select").teamselect.value;
    categorySelect.disabled = false;
    categorySelect.innerHTML = "";
    document.querySelector("#competition-team-select__junior").disabled = false;
    for(const category in categories){
        generateCategoryOption(category);
    }
    displayTop5Competitors(categorySelect.value, competition, team);
}

function generateCategoryOption(category){
    const myHTML = /*html*/`<option value="${category}">${capitalize(category)}</option>"`;
    const categorySelect = document.querySelector("#competition-category__select");
    categorySelect.insertAdjacentHTML("beforeend", myHTML);
}

export function categorySelectChanged(event){
    const category = event.target.value;
    const competition = document.querySelector("#competition-competition__select").value;
    const team = document.querySelector("#competition-team-select").teamselect.value;
    displayTop5Competitors(category, competition, team);
    document.querySelector("#competition-team-select__junior").disabled = false;
}

/* =========== TEAM SELECT =========== */
export function teamSelectChanged(){
    const team = document.querySelector("#competition-team-select").teamselect.value;
    const category = document.querySelector("#competition-category__select").value;
    const competition = document.querySelector("#competition-competition__select").value;

    displayTop5Competitors(category, competition, team);
}