import {addTrainingtime, createUser, deleteUser, postCompetitiveTime, updateUser} from "../../rest/fetch.js";
import {checkTrainingTimeFields} from "./validate.js";
import {closeCompetitiveDialog} from "./dialogs.js";

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

/* ========== Training time ========== */
function submitNewTrainingTime(event) {
    event.preventDefault();
    const form = event.target;
    const uid = form.dataset.id;


    const category = form['category'].value;
    const datetime = form['date-time'].value;
    const seconds = form['seconds'].value;
    const fieldsValid = checkTrainingTimeFields(category, datetime, seconds);

    if (fieldsValid) {
        form.removeEventListener("submit", submitNewTrainingTime);
        const newTrainingTime = {
            uid: uid,
            date: datetime,
            time: seconds
        };
        addTrainingtime(category, newTrainingTime);
        form.reset();
        form.parentElement.close();
    }
}

/* ========== Competitive time ========== */
function submitCompetitiveTime(event) {
    event.preventDefault();

    const discipline = event.target.competitive_discipline.value;
    const eventName = event.target.competitive_event.value;
    const timeData = {
        uid: event.target.dataset.id,
        time: event.target.competitive_time.value,
        position: event.target.competitive_position.value,
    }

    postCompetitiveTime(eventName.toLowerCase(), discipline, timeData);

    closeCompetitiveDialog();
}

export {submitUser, submitDelete, submitUpdate, submitNewTrainingTime, submitCompetitiveTime}