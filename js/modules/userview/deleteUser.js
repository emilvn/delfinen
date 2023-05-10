"use strict";
import { sendFetchToDB } from "../../rest/fetch.js";
import { updateUserGrid } from "./display.js";


async function deleteUser(id) {
  const response = await sendFetchToDB(`users/${id}.json`, "DELETE")
  if (response.ok) {
    console.log("Det er slettet");
    updateUserGrid();
  } else {
    console.error(`bad response : ${response.status} ${response.statusText}`);
  }
}

export function showDeleteDialog(event) {
  const deleteBtn = event.target;

  const userId = deleteBtn.dataset.id;

  document.querySelector("#dialog_delete_user").showModal();

  document.querySelector("#form_delete_post").addEventListener("submit", submitDelete);
  document.querySelector("#deleteCanceled").addEventListener("click", closeDelete);

  function submitDelete(event) {
    
    event.preventDefault();
    document.querySelector("#form_delete_post").removeEventListener("submit", submitDelete);

    deleteUser(userId);

    document.querySelector("#dialog_delete_user").close();

  }

  function closeDelete() {
    document.querySelector("#form_delete_post").removeEventListener("submit", submitDelete);

    document.querySelector("#dialog_delete_user").close();
  }
}
