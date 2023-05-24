import { showUser } from "../userview/display.js";

function generateNavHTML() {
  const currentUser = localStorage.getItem("username");
  const navHTML = /* html */ `
        <nav>
            <div class="siteTitle">
                <div class="siteLogo"></div>
                <a href="../index.html">Svømmeklubben <br> Delfinen</a>
            </div>
            <div id="navExpandButton"></div>
            <div class="navGrid">
                <div id="userview-html" class="navButton">
                    <a href="userview.html">MEDLEMMER</a>
                </div>
                <div id="payments-html" class="navButton">
                    <a href="payments.html">BETALING</a>
                </div>
                <div id="income-html" class="navButton">
                    <a href="income.html">INDTJENING</a>
                </div>
                <div id="coaches-html" class="navButton">
                    <a href="coaches.html">TRÆNERE</a>
                </div>
                <div id="trainingtimes-html" class="navButton">
                    <a href="trainingtimes.html">TRÆNING</a>
                </div>
                <div id="competitiontimes-html" class="navButton">
                    <a href="competitiontimes.html">KONKURRENCE</a>
                </div>
                <div class="navButton" id="login-html">
                    <a href="login.html">LOG IND</a>
                </div>
            </div>
        </nav>
    `;
  document.querySelector("body").insertAdjacentHTML("afterbegin", navHTML);
  const activePage = window.location.href.split("/")[window.location.href.split("/").length - 1];
  document.querySelector(`#${activePage.replace(".", "-")}`).classList.add("active");
}

function displayOrdinaryUserNav() {
  document.querySelector("#userview-html").style.display = "none";
  document.querySelector("#payments-html").style.display = "none";
  document.querySelector("#income-html").style.display = "none";
}

function displayCoachNav() {
  document.querySelector("#payments-html").style.display = "none";
  document.querySelector("#income-html").style.display = "none";
  if (document.URL.includes("userview.html")) {
    removeButtonsInUserviewForTrainer();
  }
}

function removeButtonsInUserviewForTrainer() {
  const deleteBtns = document.querySelectorAll(".delete-user-btn");
  const editBtns = document.querySelectorAll(".edit-user-btn");
  const createBtn = document.querySelector("#post_user_dialog_open");

  createBtn.style.display = "none";

  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].style.display = "none";
    editBtns[i].style.display = "none";
  }
}

export { generateNavHTML, displayCoachNav, displayOrdinaryUserNav };
