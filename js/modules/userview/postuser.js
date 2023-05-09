import { sendFetchToDB } from "../../rest/fetch.js";

async function postUser(event) {
    const userData = {
        name: event.target.post_user_name.value,
        email: event.target.post_user_email.value,
        phone: event.target.post_user_phone.value,
        age: event.target.post_user_age.value,
        membershipPassive: false,
        competitive: event.target.post_user_competitive.checked,
    }

    const postUserURL = `users.json`

    const userResponse = await sendFetchToDB(postUserURL, "POST", userData);
    if (userResponse.ok) {
        console.log("POSTED A USER!");
    } else {
        event.preventDefault();
        console.log(userResponse.status);
    }
} 

export {postUser}