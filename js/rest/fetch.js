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

async function createUser(userData) {
    const postUserURL = `users.json`

    const userResponse = await sendFetchToDB(postUserURL, "POST", userData);
    return userResponse;
}

async function postCompetitiveTime(eventName, discipline, timeData) {
    const postCompetitiveTimeURL = `competitiontimes/${eventName}/${discipline}.json`;

    const eventResponse = await sendFetchToDB(postCompetitiveTimeURL, "POST", timeData);
    return eventResponse;
}

export {sendFetchToDB, createUser, postCompetitiveTime};