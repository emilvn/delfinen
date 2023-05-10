import {updateUserGrid} from "../modules/userview/display.js";
import {prepareData} from "../modules/preparation/preparedata.js";

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
        updateUserGrid();
    }
    else{
        console.error(`Bad response at createUser: ${response.status} ${response.statusText}`);
    }
}
async function deleteUser(uid) {
    const response = await sendFetchToDB(`users/${uid}.json`, "DELETE")
    if (response.ok) {
        console.log("User deleted successfully!");
        updateUserGrid();
    } else {
        console.error(`Bad response at deleteUser: ${response.status} ${response.statusText}`);
    }
}

async function updateUser(uid, userData){
    const response = await sendFetchToDB(`users/${uid}.json`, "PUT", userData);
    if(response.ok){
        console.log("User updated successfully!");
        updateUserGrid();
    }
    else{
        console.error(`Bad response at updateUser: ${response.status} ${response.statusText}`);
    }
}

export {createUser, deleteUser, getAllUsers, updateUser, getOneUser};