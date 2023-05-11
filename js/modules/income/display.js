import { getPriceData, getMemberData } from "../../rest/fetch.js";
import { prepareData } from "../preparation/preparedata.js";

async function updateIncomeGrid() {
    const pricesData = await getPriceData();
    const membersData = await getMemberData();

    const expectedIncomeObject = calculateExpectedIncomePerMembershipType(pricesData, membersData);
    showExpectedIncome(expectedIncomeObject);
    setTooltipHTML(pricesData, expectedIncomeObject);
    setTooltipEventListeners();
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

function showExpectedIncome(expectedIncomeObject) {
    document.querySelector("#under18-text").innerHTML = `Medlemmer under 18 år`;
    document.querySelector("#under18-amount").innerHTML = `${expectedIncomeObject.under18},-`;
    document.querySelector("#over18-text").innerHTML = `Medlemmer over 18 år (Formulering?)`;
    document.querySelector("#over18-amount").innerHTML = `${expectedIncomeObject.over18},-`;
    document.querySelector("#over60-text").innerHTML = `Medlemmer over 60 år`;
    document.querySelector("#over60-amount").innerHTML = `${expectedIncomeObject.over60},-`;
    document.querySelector("#passive-text").innerHTML = `Passive medlemskaber`;
    document.querySelector("#passive-amount").innerHTML = `${expectedIncomeObject.passive},-`;
    document.querySelector("#sum-text").innerHTML = `Sum (i alt)`;
    document.querySelector("#sum-amount").innerHTML = `${expectedIncomeObject.under18 + expectedIncomeObject.over18 + expectedIncomeObject.over60 + expectedIncomeObject.passive},-`;
}

function setTooltipEventListeners() {
    const under18Container = document.querySelector("#under18-amount-container");
    const over18Container = document.querySelector("#over18-amount-container");
    const over60Container = document.querySelector("#over60-amount-container");
    const passiveContainer = document.querySelector("#passive-amount-container");

    under18Container.addEventListener("mouseleave", hideTooltip);      
    under18Container.addEventListener("mouseover", event => {
        if (event.target === under18Container) {
            showTooltip(event);
        }
    });
    
    over18Container.addEventListener("mouseleave", hideTooltip);
    over18Container.addEventListener("mouseover", event => {
        if (event.target === over18Container) {
            showTooltip(event);
        }
    });
    
    over60Container.addEventListener("mouseleave", hideTooltip);
    over60Container.addEventListener("mouseover", event => {
        if (event.target === over60Container) {
            showTooltip(event);
        }
    });
    
    passiveContainer.addEventListener("mouseleave", hideTooltip);
    passiveContainer.addEventListener("mouseover", event => {
        if (event.target === passiveContainer) {
            showTooltip(event);
        }
    });
}

function setTooltipHTML(pricesData, expectedIncomeObject) {
    for (const key in pricesData) {
        if (expectedIncomeObject.hasOwnProperty(key)) {
            const tooltipHTML = /* html */ `
                <div>Antal medlemmer: ${expectedIncomeObject[key] / pricesData[key]}</div>
                <div>Pris pr. medlem: ${pricesData[key]}</div>
            `
            console.log(`#${key}-amount`);
            document.querySelector(`#${key}-amount-container`).lastElementChild.insertAdjacentHTML("afterbegin", tooltipHTML);
        }
    }
}

function showTooltip(event) {
    event.target.lastElementChild.style.display = "block";
}   

function hideTooltip(event) {
    event.target.lastElementChild.style.display = "none";
}

export {updateIncomeGrid}