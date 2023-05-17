import {categorySelectChanged, competitionSelectChanged, generateCompetitionOptions} from "./options.js";

window.addEventListener("load", main);

function main(){
    generateCompetitionOptions();
    setEventListeners()
}

function setEventListeners(){
    document.querySelector("#competition-competition__select").addEventListener("change", competitionSelectChanged);
    document.querySelector("#competition-category__select").addEventListener("change", categorySelectChanged);
}