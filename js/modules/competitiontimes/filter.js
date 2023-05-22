import {getAllUsers} from "../../rest/fetch.js";
import {competitionsObj} from "./options.js";
import {calculateAge, getTeamFromAge} from "../helpers/helpers.js";


export async function findTop5Competitors(category, competition, team){
    const competitors = await getCompetitorsInCompetition(category, competition, team);
    competitors.sort((a,b) => a.position - b.position);
    competitors.splice(5);
    return competitors;
}


async function getCompetitorsInCompetition(category, competition, team){
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
    return competitors.filter(competitor => {
            const competitorAge = calculateAge(competitor["birthdate"]);
            return getTeamFromAge(competitorAge) === team;
        });
}