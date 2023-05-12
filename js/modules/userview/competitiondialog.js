import { postCompetitiveTime } from "../../rest/fetch.js";

function showCompetitionDialog(event) {
  const competitionBtn = event.target;
  const competitionForm = document.querySelector("#post_competitive_form");

  const userId = competitionBtn.dataset.id;
  competitionForm.dataset.id = userId;

  document.querySelector("#post_competitive_dialog").showModal();

  document.querySelector("#post_competitive_form").addEventListener("submit", submitCompetitiveTime);
  document.querySelector("#competitive_close_btn").addEventListener("mouseup", closeDialog);
}

function submitCompetitiveTime(event) {
    event.preventDefault();

    const discipline = event.target.competitive_discipline.value;
    const eventName = event.target.competitive_event.value;
    const timeData = {
        uid: event.target.dataset.id,
        time: event.target.competitive_time.value,
        position: event.target.competitive_position.value,
    }

    postCompetitiveTime(eventName.toLowerCase(), discipline, timeData);

    closeDialog();
}

function closeDialog() {
  document.querySelector("#post_competitive_form").reset();
  document.querySelector("#post_competitive_form").removeEventListener("submit", submitCompetitiveTime);
  document.querySelector("#competitive_close_btn").removeEventListener("mouseup", closeDialog);
  
  document.querySelector("#post_competitive_dialog").close();
}

export {showCompetitionDialog};