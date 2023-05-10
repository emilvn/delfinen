"use strict";
import {submitDelete} from "./submit.js";
import {getOneUser} from "../../rest/fetch.js";

export function showDeleteDialog(event) {
  const deleteBtn = event.target;
  const deleteForm = document.querySelector("#form_delete_user");
  deleteForm.dataset.id = deleteBtn.dataset.id;

  document.querySelector("#dialog_delete_user").showModal();

  deleteForm.addEventListener("submit", submitDelete);
  document.querySelector("#deleteCanceled").addEventListener("click", closeDelete);
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
}

async function fillUpdateForm(uid){
  const user = await getOneUser(uid);
  const form = document.querySelector("#update_user_form");

  form["name"].value = user["name"];
  form["email"].value = user["email"];
  form["phone"].value = user["phone"]?user["phone"]:"";
  form["age"].value = user["age"];
  form["competitive"].checked = user["competitive"];
  form["membershippassive"].checked = user["membershippassive"];
}
