import {findTop5Competitors} from "./filter.js";


export async function displayTop5Competitors(category, competition){
    const competitors = await findTop5Competitors(category, competition);
    console.log(competitors);
}