import {getAllUsers} from "../../rest/fetch.js";
import {competitionsObj} from "./options.js";


export async function displayTop5Competitors(category, competition){
    const competitors = await getCompetitorsInCompetition(category, competition);
    competitors.sort((a,b) => a.position - b.position);
    competitors.splice(5);
    console.log(competitors);
}


async function getCompetitorsInCompetition(category, competition){
    const members = await getAllUsers();
    const memberIdsInCompetition = [];
    const competitionCategory = competitionsObj[competition][category];

    for(const memberID in competitionCategory){
        memberIdsInCompetition.push(memberID);
    }
    const competitors = members.filter(member => memberIdsInCompetition.includes(member.id));
    for(const competitor of competitors){
        const competitorCompetitionData = competitionCategory[competitor["id"]];
        competitor["position"] = competitorCompetitionData["position"];
        competitor["time"] = competitorCompetitionData["time"];
    }
    return competitors;
}