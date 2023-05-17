"use strict";
import { submitCompetitiveTime, submitDelete, submitNewTrainingTime, submitUpdate, submitUser } from "./submit.js";
import { getOneUser, getTrainingTime } from "../../rest/fetch.js";

export function showCreateDialog() {
  const form = document.querySelector("#post_user_form");
  form.addEventListener("submit", submitUser);
  document.querySelector("#post-close-button").addEventListener("click", closeCreateDialog);
  window.addEventListener("keydown", event => {
    if (event.key === "Escape") closeCreateDialog();
  });

  form.parentElement.showModal();
}

export function closeCreateDialog() {
  const form = document.querySelector("#post_user_form");
  document.querySelector("#post-close-button").removeEventListener("click", closeCreateDialog);
  form.removeEventListener("submit", submitUser);
  form.querySelector("fieldset").style.display = "none";
  form.parentElement.close();
  form.reset();
}

export function showDeleteDialog(event) {
  const deleteBtn = event.target;
  const deleteForm = document.querySelector("#form_delete_user");
  deleteForm.dataset.id = deleteBtn.dataset.id;

  document.querySelector("#dialog_delete_user").showModal();

  deleteForm.addEventListener("submit", submitDelete);
  document.querySelector("#deleteCanceled").addEventListener("click", closeDelete);
  window.addEventListener("keydown", event => {
    if (event.key === "Escape") closeDelete();
  });
}

export function toggleCategoryFieldset(event) {
  if (event.target.checked) {
    event.target.parentElement.querySelector("fieldset").style.display = "grid";
  } else {
    event.target.parentElement.querySelector("fieldset").style.display = "none";
  }
}

function closeDelete() {
  const form = document.querySelector("#form_delete_user");
  document.querySelector("#deleteCanceled").removeEventListener("click", closeDelete);
  form.removeEventListener("submit", submitDelete);
  form.parentElement.close();
}

export function showUpdateDialog(event) {
  const updateBtn = event.target;
  const uid = updateBtn.dataset.id;
  const form = document.querySelector("#update_user_form");
  form.dataset.id = uid;
  fillUpdateForm(uid);
  form.parentElement.showModal();

  form.addEventListener("submit", submitUpdate);
  document.querySelector("#update-close-button").addEventListener("click", closeUpdateDialog);
  window.addEventListener("keydown", event => {
    if (event.key === "Escape") closeUpdateDialog();
  });
}
function closeUpdateDialog() {
  const form = document.querySelector("#update_user_form");
  document.querySelector("#update-close-button").removeEventListener("click", closeUpdateDialog);
  form.removeEventListener("submit", submitUpdate);
  form.parentElement.close();
  form.reset();
}

async function fillUpdateForm(uid) {
  const user = await getOneUser(uid);
  const form = document.querySelector("#update_user_form");

  form["name"].value = user["name"];
  form["email"].value = user["email"];
  form["phone"].value = user["phone"] ? user["phone"] : "";
  form["birthdate"].value = user["birthdate"];
  form["membershippassive"].checked = user["membershipPassive"];
  form["competitive"].checked = user["competitive"];

  if (user["competitive"]) {
    form.querySelector("fieldset").style.display = "grid";
    for (const category in user["categories"]) {
      for (let i = 0; i < form["categories"].length; i++) {
        if (user["categories"][category] === form["categories"][i].value) {
          form["categories"][i].checked = true;
        }
      }
    }
  }
}

/* =========== Training time ========== */
export function showTrainingTimeDialog(event) {
  const form = document.querySelector("#add_training_time_form");
  form.dataset.id = event.target.dataset.id;
  const dialog = document.querySelector("#add_training_time");

  form.addEventListener("submit", submitNewTrainingTime);
  document.querySelector("#training-time-close-button").addEventListener("click", closeTrainingDialog);
  window.addEventListener("keydown", event => {
    if (event.key === "Escape") closeTrainingDialog();
  });
  dialog.showModal();
}
function closeTrainingDialog() {
  const form = document.querySelector("#add_training_time_form");
  document.querySelector("#training-time-close-button").removeEventListener("click", closeTrainingDialog);
  form.removeEventListener("submit", submitNewTrainingTime);
  form.parentElement.close();
  form.reset();
}

async function getMembersTrainingTimeForEach() {
  const membersTrainingTime = await getTrainingTime();

  membersTrainingTime.ForEach(showMembersTrainingTime);
}

export function showMembersTrainingTime(category, id) {
  const myHtml = /*html*/ `
    <hr>
    <br>
    <br>
    <table>
    <tr>
    <th>Diciplin</th>
    <th>Dato</th>
    <th>Tid</th>
    </tr>
    <td>${category}</td>
    <td>${id.date}</td>
    <td>Sek: ${id.time}</td>
    </table>
    `;

  document.querySelector("#add_training_time").insertAdjacentHTML("beforeend", myHtml);
}

/* ========== Comp time ========== */
export function showCompetitionDialog(event) {
  const competitionBtn = event.target;
  const competitionForm = document.querySelector("#post_competitive_form");

  competitionForm.dataset.id = competitionBtn.dataset.id;

  document.querySelector("#post_competitive_dialog").showModal();

  competitionForm.addEventListener("submit", submitCompetitiveTime);
  document.querySelector("#competitive-time-close-button").addEventListener("click", closeCompetitiveDialog);
  window.addEventListener("keydown", event => {
    if (event.key === "Escape") closeCompetitiveDialog();
  });
}
export function closeCompetitiveDialog(event) {
  const form = document.querySelector("#post_competitive_form");
  document.querySelector("#competitive-time-close-button").removeEventListener("click", closeCompetitiveDialog);
  form.removeEventListener("submit", submitCompetitiveTime);
  form.parentElement.close();
  form.reset();
}
