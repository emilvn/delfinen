import { sendFetchToDB } from "../../rest/fetch.js";

window.addEventListener('load', main)

function main(){
    setEventListeners();
}

function showTrainingTimeDialog(event) {
  const form = document.querySelector("#add_training_time_form");
  form.dataset.id = event.target.dataset.id;
  const dialog = document.querySelector("#add_training_time");
  dialog.showModal();
}


function setEventListeners() {
  
  document
    .querySelector("#add_training_time_form")
    .addEventListener("submit", submitNewTrainingTime);

  document
    .querySelector("#close_button")
    .addEventListener("click", function () {
      const dialog = document.querySelector("#add_training_time");
      dialog.close();
    });

  document
  .querySelector("#open_training_time_dialog_button")
  .addEventListener("click", showTrainingTimeDialog);


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

function submitNewTrainingTime(event) {
  event.preventDefault();
  const form = event.target;
  const uid = form.dataset.id;
  
  const category = form['category'].value; 
  const datetime = form['date-time'].value; 
  const seconds = form['seconds'].value;
  const fieldsValid = checkTrainingTimeFields(category, datetime, seconds);

  if (fieldsValid) {
    const newTrainingTime = {
      uid: uid,
      date: datetime,
      time: seconds
    };
    addTrainingtime(category, newTrainingTime);
  }
}


async function addTrainingtime (category, trainingtimeData){
  const uri = `trainingstimes/${category}.json`;
  const res = await sendFetchToDB(uri, 'POST', trainingtimeData);
  if (res.ok){
    console.log('Training time added');
  }
  else {
    console.error(`Bad response at addTrainingtime: ${res.status} ${res.statusText}`)
  }
}
