"use strict";
import {submitCompetitiveTime, submitDelete, submitNewTrainingTime, submitUpdate} from "./submit.js";
import {getOneUser} from "../../rest/fetch.js";

export function showDeleteDialog(event) {
  const deleteBtn = event.target;
  const deleteForm = document.querySelector("#form_delete_user");
  deleteForm.dataset.id = deleteBtn.dataset.id;

  document.querySelector("#dialog_delete_user").showModal();

  deleteForm.addEventListener("submit", submitDelete);
  document.querySelector("#deleteCanceled").addEventListener("click", closeDelete);
  window.addEventListener("keydown", event => {
    if(event.key === "Escape") closeDelete()
  });
  function closeDelete() {
    deleteForm.removeEventListener("submit", submitDelete);
    document.querySelector("#dialog_delete_user").close();
}
}

export function showUpdateDialog(event){
  const updateBtn = event.target;
  const uid = updateBtn.dataset.id;
  const form = document.querySelector("#update_user_form");
  form.dataset.id = uid;
  fillUpdateForm(uid);
  form.parentElement.showModal();

  form.addEventListener("submit", submitUpdate);

  window.addEventListener("keydown", event => {
    if(event.key === "Escape") form.removeEventListener("submit", submitUpdate);
  });
}

async function fillUpdateForm(uid){
  const user = await getOneUser(uid);
  const form = document.querySelector("#update_user_form");

  form["name"].value = user["name"];
  form["email"].value = user["email"];
  form["phone"].value = user["phone"]?user["phone"]:"";
  form["age"].value = user["age"];
  form["competitive"].checked = user["competitive"];
  form["membershippassive"].checked = user["membershipPassive"];
}

/* =========== Training time ========== */
export function showTrainingTimeDialog(event) {
  const form = document.querySelector("#add_training_time_form");
  form.dataset.id = event.target.dataset.id;
  const dialog = document.querySelector("#add_training_time");

  form.addEventListener("submit", submitNewTrainingTime);
  document.querySelector("#training-time-close-button").addEventListener("click", close);

  function close(){
    document.querySelector("#training-time-close-button").removeEventListener("click", close);
    form.removeEventListener("submit", submitNewTrainingTime);
    const dialog = document.querySelector("#add_training_time");
    dialog.close();
    form.reset();
  }
  dialog.showModal();
}

/* ========== Comp time ========== */
export function showCompetitionDialog(event) {
  const competitionBtn = event.target;
  const competitionForm = document.querySelector("#post_competitive_form");

  const userId = competitionBtn.dataset.id;
  competitionForm.dataset.id = userId;

  document.querySelector("#post_competitive_dialog").showModal();

  document.querySelector("#post_competitive_form").addEventListener("submit", submitCompetitiveTime);
  document.querySelector("#competitive_close_btn").addEventListener("mouseup", closeDialog);
}

export function closeDialog() {
  document.querySelector("#post_competitive_form").reset();
  document.querySelector("#post_competitive_form").removeEventListener("submit", submitCompetitiveTime);
  document.querySelector("#competitive_close_btn").removeEventListener("mouseup", closeDialog);

  document.querySelector("#post_competitive_dialog").close();
}