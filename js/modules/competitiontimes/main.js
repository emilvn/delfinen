import {categorySelectChanged, competitionSelectChanged, generateCompetitionOptions, teamSelectChanged} from "./options.js";

window.addEventListener("load", main);

function main(){
    generateCompetitionOptions();
    setEventListeners()
}

function setEventListeners(){
    document.querySelector("#competition-competition__select").addEventListener("change", competitionSelectChanged);
    document.querySelector("#competition-category__select").addEventListener("change", categorySelectChanged);
    document.querySelector("#competition-team-select__junior").addEventListener("change", teamSelectChanged);
    document.querySelector("#competition-team-select__senior").addEventListener("change", teamSelectChanged);
}