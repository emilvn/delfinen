import { sendFetchToDB } from "../../rest/fetch.js";

window.addEventListener('load', main)

async function main(){
    setEventListeners();
}

function setEventListeners() {
  document
    .querySelector("#add_training_time_form")
    .addEventListener("submit", async function (event) {submitNewTrainingTime(event)});

  document
    .querySelector("#add_training_time_form")
    .addEventListener("keydown", async function (event) {
      if (event.keyCode === 13) {
        await submitNewTrainingTime(event);
      }
    });
}

async function submitNewTrainingTime(event) {
    event.preventDefault();
    const disciplin = document.getElementById("disciplin").value;
    const datetime = document.getElementById("date-time").value;
    const seconds = document.getElementById("seconds").value;
    const newTrainingTime = {disciplin, datetime, seconds};
    const url = `trainingtimes/${disciplin}.json`;
    const res = await sendFetchToDB(url, 'POST', newTrainingTime);
    if(res.ok) {
        const data = await res.json();
        return data;
  }
} 
