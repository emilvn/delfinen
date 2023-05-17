import {getCompetitionTimesByCategory} from "../../rest/fetch.js";

export let competitionTimes;

async function updateCompetitionTimesView(){
    competitionTimes = await getCompetitionTimesByCategory();
    showTop5CompetitionTimes(competitionTimes);
}

function showTop5CompetitionTimes(competitionTimes){

}

function sortCompetitionTimesByTime(competitionTimes){
    competitionTimes.sort((a, b) => b.time - a.time)
}
