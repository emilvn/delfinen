import { getPriceData, getMemberData } from "../../rest/fetch.js";
import { prepareData } from "../preparation/preparedata.js";

async function updateIncomeGrid() {
    const pricesData = await getPriceData();
    const membersData = await getMemberData();

    const expectedIncomeObject = calculateExpectedIncomePerMembershipType(pricesData, membersData);
    showExpectedIncome(pricesData, expectedIncomeObject);
}

function calculateExpectedIncomePerMembershipType(pricesData, membersData) {
    const expectedIncomeObject = {
        under18: 0,
        over18: 0,
        over60: 0,
        passive: 0,
    };
    const membersArray = prepareData(membersData);

    for (let i = 0; i < membersArray.length; i++) {
        if (membersArray[i].membershipPassive) {
            expectedIncomeObject.passive += pricesData.passive;
        } else {
            switch (true) {
                case (membersArray[i].age > 60):
                    expectedIncomeObject.over60 += pricesData.over60;
                    break;
                case (membersArray[i].age > 18):
                    expectedIncomeObject.over18 += pricesData.over18;
                    break;
                case (membersArray[i].age <= 18):
                    expectedIncomeObject.under18 += pricesData.under18;
                    break;
                default:
                    //nothing
                    break;
            }
        }
    }
    return expectedIncomeObject;
}

function showExpectedIncome(pricesData, expectedIncomeObject) {
    document.querySelector("#under18-text").innerHTML = `Medlemmer under 18 år`;
    document.querySelector("#under18-amount").innerHTML = `${expectedIncomeObject.under18},-`;
    document.querySelector("#over18-text").innerHTML = `Medlemmer over 18 år (Hjælp med at formulere dette bedre)`;
    document.querySelector("#over18-amount").innerHTML = `${expectedIncomeObject.over18},-`;
    document.querySelector("#over60-text").innerHTML = `Medlemmer over 60 år`;
    document.querySelector("#over60-amount").innerHTML = `${expectedIncomeObject.over60},-`;
    document.querySelector("#passive-text").innerHTML = `Passive medlemskaber`;
    document.querySelector("#passive-amount").innerHTML = `${expectedIncomeObject.passive},-`;
    document.querySelector("#sum-text").innerHTML = `Sum (i alt)`;
    document.querySelector("#sum-amount").innerHTML = `${expectedIncomeObject.under18 + expectedIncomeObject.over18 + expectedIncomeObject.over60 + expectedIncomeObject.passive},-`;
}

export {updateIncomeGrid}