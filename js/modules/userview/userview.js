import { sendFetchToDB } from "../../rest/fetch.js";

window.addEventListener('load', main)

async function main(){
    setEventListeners();
}

function setEventListeners() {
  document
    .querySelector("#btn_submit")
    .addEventListener("mouseup", btnSendData);

  document
    .querySelector("#add_training_time")
    .addEventListener("keydown", function (event) {
      if (event.keyCode === 13) {
        btnSendData();
      }
    });
}

async function btnSendData() {
  const disciplin = document.getElementById("disciplin").value;
  const datetime = document.getElementById("date-time").value;
  const seconds = document.getElementById("seconds").value;
  const newTrainingTime = {disciplin, datetime, seconds};
  const url = `trainingtimes/${disciplin}.json`;
  const res = await sendFetchToDB(url, 'POST', newTrainingTime);
  const data = await res.json();
    console.info('info sendt');
  return data;

}
