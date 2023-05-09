"use strict";

window.addEventListener("load", main)

const endpoint = "https://delfinen-4e935-default-rtdb.europe-west1.firebasedatabase.app/";

function main () {
  console.log("Hello");

  // deletePost("aefaefaef");
}

async function deletePost(id) {
  const response = await fetch(`${endpoint}/users/${id}.json`, {
    method: "DELETE",
  });
  if (response.ok) {
    console.log("Det er slettet");
    
  }
  // update the post grid to display posts
}


