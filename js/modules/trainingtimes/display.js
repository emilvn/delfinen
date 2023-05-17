import {getCompetitionTimes} from "../../rest/fetch.js";

export let competitionTimes;

async function updateCompetitionTimesView(){
    competitionTimes = await getCompetitionTimes();
    showTop5CompetitionTimes(competitionTimes);
}

function showTop5CompetitionTimes(competitionTimes){

}