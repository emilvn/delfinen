import {createUser, deleteUser} from "../../rest/fetch.js";

async function submitUser(event) {
    const userData = {
        name: event.target.post_user_name.value,
        email: event.target.post_user_email.value,
        phone: event.target.post_user_phone.value,
        age: event.target.post_user_age.value,
        membershipPassive: false,
        competitive: event.target.post_user_competitive.checked,
    }

    createUser(userData);
}

function submitDelete(event) {
    event.preventDefault();
    const deleteForm = event.target;
    const userID = deleteForm.dataset.id;
    deleteForm.removeEventListener("submit", submitDelete);
    deleteUser(userID);
    document.querySelector("#dialog_delete_user").close();
}

export {submitUser, submitDelete}