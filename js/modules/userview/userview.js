import { sendFetchToDB } from "../../rest/fetch.js";

window.addEventListener('load', main)

function main(){
    setEventListeners();
}

function setEventListeners() {
  document
    .querySelector("#add_training_time_form")
    .addEventListener("submit", function (event) {submitNewTrainingTime(event)});

  document
    .querySelector("#add_training_time_form")
    .addEventListener("keydown",  function (event) {
      if (event.keyCode === 13) {
         submitNewTrainingTime(event);
      }
    });

     document
      .querySelector("#close_button")
      .addEventListener("click", function () {
        const dialog = document.getElementById("add_training_time");
        dialog.close();
      });
}

 function checkTrainingTimeFields(disciplin, datetime, seconds) {
  if (!disciplin || !datetime || !seconds) {
    const completedMessage = document.querySelector("#add_training_time_form");
    completedMessage.classList.remove('valid');
    completedMessage.classList.add('invalid');
    return false;
  } else {
    const completedMessage = document.querySelector("#add_training_time_form");
    completedMessage.classList.remove('invalid');
    completedMessage.classList.add('valid');
    return true;
  }
}

async function submitNewTrainingTime(event) {
  event.preventDefault();
  const disciplin = document.getElementById("disciplin").value;
  const datetime = document.getElementById("date-time").value;
  const seconds = document.getElementById("seconds").value;

  const fieldsValid = await checkTrainingTimeFields(disciplin, datetime, seconds);

  if (!fieldsValid) {
    return;
  }

  const newTrainingTime = {disciplin, datetime, seconds};
  const url = `trainingtimes/${disciplin}.json`;
  const res = await sendFetchToDB(url, 'POST', newTrainingTime);

  if (res.ok) {
    const data = await res.json();
    return data;
  }
}


