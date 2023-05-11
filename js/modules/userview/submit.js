import {createUser, deleteUser, updateUser} from "../../rest/fetch.js";

async function submitUser(event) {
    event.preventDefault();
    const form = event.target;
    form.removeEventListener("submit", submitUser);

    const userData = {
        name: event.target.post_user_name.value,
        email: event.target.post_user_email.value,
        phone: event.target.post_user_phone.value,
        age: Number(event.target.post_user_age.value),
        membershipPassive: false,
        competitive: event.target.post_user_competitive.checked,
    }
    createUser(userData);
    event.target.parentElement.close();
}

function submitDelete(event) {
    event.preventDefault();
    const deleteForm = event.target;
    const userID = deleteForm.dataset.id;
    deleteForm.removeEventListener("submit", submitDelete);
    deleteUser(userID);
    document.querySelector("#dialog_delete_user").close();
}

function submitUpdate(event){
    event.preventDefault();
    const form = event.target;
    form.removeEventListener("submit", submitUpdate);

    const uid = form.dataset.id;
    const user = {
        name: form["name"].value,
        email: form["email"].value,
        phone: form["phone"].value,
        age: Number(form["age"].value),
        competitive: form["competitive"].checked,
        membershipPassive: form["membershippassive"].checked
    }
    updateUser(uid, user);
    form.parentElement.close();
}

export {submitUser, submitDelete, submitUpdate}