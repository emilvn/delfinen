import {updateUserGrid} from "../modules/userview/display.js";
import {prepareData} from "../modules/helpers/preparedata.js";
import {showToastMessage} from "../modules/helpers/toastmessages.js";

const endpoint = "https://delfinen-4e935-default-rtdb.europe-west1.firebasedatabase.app/";

async function sendFetchToDB(uri, method, data) {
    const options = {
        method,
    }
    
    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(endpoint + uri, options);

    return response;  
}

/* ========== MEMBERS ========== */
async function getAllUsers(){
    const response = await sendFetchToDB("users.json", "GET");
    if (response.ok){
        return prepareData(await response.json());
    }
    else {
        throw new Error(`Bad response at getAllUsers: ${response.status} ${response.statusText}`);
    }
}
async function getOneUser(uid){
    const response = await sendFetchToDB(`users/${uid}.json`, "GET");
    if(response.ok){
        return await response.json();
    }
    else {
        throw new Error(`Bad response at getOneUser: ${response.status} ${response.statusText}`);
    }
}
async function createUser(userData) {
    const postUserURI = `users.json`
    const response = await sendFetchToDB(postUserURI, "POST", userData);
    if(response.ok){
        console.log("User created successfully!");
        showToastMessage("Medlem oprettet!", "success");
        updateUserGrid();
    }
    else{
        console.error(`Bad response at createUser: ${response.status} ${response.statusText}`);
        showToastMessage(`Kunne ikke oprette medlem. ${response.status} ${response.statusText}`, "error");
    }
}
async function deleteUser(uid) {
    const response = await sendFetchToDB(`users/${uid}.json`, "DELETE")
    if (response.ok) {
        console.log("User deleted successfully!");
        showToastMessage("Medlem slettet.", "success");
        updateUserGrid();
    } else {
        console.error(`Bad response at deleteUser: ${response.status} ${response.statusText}`);
        showToastMessage(`Kunne ikke slette medlem. ${response.status} ${response.statusText}`, "error");
    }
}
async function updateUser(uid, userData){
    const response = await sendFetchToDB(`users/${uid}.json`, "PUT", userData);
    if(response.ok){
        console.log("User updated successfully!");
        showToastMessage("Medlem opdateret!", "success");
        updateUserGrid();
    }
    else{
        console.error(`Bad response at updateUser: ${response.status} ${response.statusText}`);
        showToastMessage(`Kunne ikke opdatere medlem. ${response.status} ${response.statusText}`, "error");
    }
}

/* ========== TRAINING TIMES ========== */
async function addTrainingtime (category, trainingtimeData, id){
    const uri = `trainingstimes/${category}/${id}.json`;
    const response = await sendFetchToDB(uri, 'PUT', trainingtimeData);
    if (response.ok){
        console.log('Training time added');
        showToastMessage("Trænings tid tilføjet!", "success");
    }
    else {
        console.error(`Bad response at addTrainingtime: ${response.status} ${response.statusText}`);
        showToastMessage(`Kunne ikke tilføje træningstid. ${response.status} ${response.statusText}`, "error");
    }
}


/* ======== COACHES ========== */
async function getCoaches(){
    const uri = "coaches.json";
    const response = await sendFetchToDB(uri, "GET");
    if(response.ok){
        console.log("Coaches retrieved successfully!");
        return prepareData(await response.json());
    }
    else{
        throw new Error(`Bad response at getCoaches: ${response.status} ${response.statusText}`);
    }
}

/* ========== COMPETITIVE TIMES ========== */
async function postCompetitiveTime(eventName, discipline, timeData, id) {
    const postCompetitiveTimeURL = `competitiontimes/${eventName}/${discipline}/${id}.json`;

    const eventResponse = await sendFetchToDB(postCompetitiveTimeURL, "PUT", timeData);
    return eventResponse;
}

async function getCompetitionData(){
    const uri = `competitiontimes.json`;
    const response = await sendFetchToDB(uri, "GET");
    if(response.ok){
        console.log("competition data retrieved successfully!");
        return await response.json();
    }
    else {
        throw new Error(`Bad response at getCompetitionTimes: ${response.status} ${response.statusText}`);
    }
}

/* ========== PRICE AND PAYMENT ========== */
async function getPriceData() {
    const getPricesURI = `memberships.json`;
    const response = await sendFetchToDB(getPricesURI, "GET");

    if (response.ok) {
        const pricesData = await response.json();

        return pricesData;
    }

    return {};
}

async function getAlreadyExistingUserPayments() {
  const paymentsURI = `payments.json`;
  const response = await sendFetchToDB(paymentsURI, "GET");

  if (response.ok) {
    const paymentsData = await response.json();
    return paymentsData;
  }

  return {};
}

export {createUser, deleteUser, getAllUsers, updateUser, getOneUser, addTrainingtime, getCoaches, postCompetitiveTime, getPriceData, getAlreadyExistingUserPayments, getCompetitionData};