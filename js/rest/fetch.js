const endpoint = "https://delfinen-4e935-default-rtdb.europe-west1.firebasedatabase.app/"; 

async function sendFetchToDB(url, method, data) {
    const options = {
        method,
    }
    
    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(endpoint + url, options);

    return response;  
}

export {sendFetchToDB};