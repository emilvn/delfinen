"use strict";
import {submitDelete} from "./submit.js";

export function showDeleteDialog(event) {
  const deleteBtn = event.target;
  const deleteForm = document.querySelector("#form_delete_post");
  deleteForm.dataset.id = deleteBtn.dataset.id;

  document.querySelector("#dialog_delete_user").showModal();

  deleteForm.addEventListener("submit", submitDelete);
  document.querySelector("#deleteCanceled").addEventListener("click", closeDelete);
  function closeDelete() {
    deleteForm.removeEventListener("submit", submitDelete);
    document.querySelector("#dialog_delete_user").close();
  }
}
