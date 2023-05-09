"use strict";
import { updateUserGrid } from "./display.js";

// window.addEventListener("load", main)

const endpoint = "https://delfinen-4e935-default-rtdb.europe-west1.firebasedatabase.app/";

function main() {
  console.log("Hello");
}

async function deletePost(id) {
  const response = await fetch(`${endpoint}users/${id}.json`, {
    method: "DELETE",
  });
  if (response.ok) {
    console.log("Det er slettet");
    updateUserGrid();
  } else {
    console.error(`bad response : ${response.status} ${response.statusText}`);
  }
  // update the post grid to display posts
}

export function showDeleteDialog(event) {
  const deleteBtn = event.target;

  const userId = deleteBtn.dataset.id;

  console.log(userId);

  document.querySelector("#dialog_delete_user").showModal();

  document.querySelector("#form_delete_post").addEventListener("submit", submitDelete);
  document.querySelector("#deleteCanceled").addEventListener("click", closeDelete);

  function submitDelete(event) {
    console.log("Hej");
    event.preventDefault();
    document.querySelector("#form_delete_post").removeEventListener("submit", submitDelete);

    deletePost(userId);

    document.querySelector("#dialog_delete_user").close();

    console.log("Det virker her til");
  }

  function closeDelete() {
    document.querySelector("#form_delete_post").removeEventListener("submit", submitDelete);

    document.querySelector("#dialog_delete_user").close();
  }
}
