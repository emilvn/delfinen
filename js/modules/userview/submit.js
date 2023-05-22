import {addTrainingtime, createUser, deleteUser, postCompetitiveTime, updateUser} from "../../rest/fetch.js";
import {checkTrainingTimeFields} from "./validate.js";
import {closeCompetitiveDialog, closeCreateDialog} from "./dialogs.js";

async function submitUser(event) {
    event.preventDefault();
    const form = event.target;
    form.removeEventListener("submit", submitUser);

    const userData = {
        name: event.target.post_user_name.value,
        email: event.target.post_user_email.value,
        phone: event.target.post_user_phone.value,
        birthdate: event.target.post_user_birthdate.value,
        membershipPassive: false,
        competitive: event.target.post_user_competitive.checked,
    }

    if (event.target.post_user_competitive.checked) {
        const categories = document.querySelectorAll("input[name='post_user_categories']");
        userData.categories = [];
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].checked) {
                const category = categories[i].value;
                userData.categories.push(category);
            }
        }
    }

    createUser(userData);
    closeCreateDialog();
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
        birthdate: form["birthdate"].value,
        competitive: form["competitive"].checked,
        membershipPassive: form["membershippassive"].checked
    }
    if (form["competitive"].checked) {
        const categories = form.querySelectorAll("input[name='categories']");
        user.categories = [];
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].checked) {
                const category = categories[i].value;
                user.categories.push(category);
            }
        }
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
            date: datetime,
            time: Number(seconds)
        };
        addTrainingtime(category, newTrainingTime, uid);
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
        time: Number(event.target.competitive_time.value),
        position: Number(event.target.competitive_position.value)
    }
    console.log(event.target.dataset.id);
    postCompetitiveTime(eventName.toLowerCase(), discipline, timeData, event.target.dataset.id);

    closeCompetitiveDialog();
}

export {submitUser, submitDelete, submitUpdate, submitNewTrainingTime, submitCompetitiveTime}