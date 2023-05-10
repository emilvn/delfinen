function generateNavHTML() {
	const navHTML = /* html */ `
        <nav>
            <div class="siteTitle">
                <div class="siteLogo"></div>
                <a href="../index.html">Svømmeklubben <br> Delfinen</a>
            </div>
            <div id="navExpandButton"></div>
            <div class="navGrid">
                <div class="navButton">
                    <a href="userview.html">BRUGERE</a>
                </div>
                <div class="navButton">
                    <a href="payments.html">BETALING</a>
                </div>
                <div class="navButton">
                    <a href="income.html">INDTJENING</a>
                </div>
                <div class="navButton">
                    <a href="coaches.html">TRÆNERE</a>
                </div>
                <div class="navButton">
                    <a href="trainingtimes.html">TRÆNING</a>
                </div>
                <div class="navButton">
                    <a href="competitiontimes.html">KONKURRENCE</a>
                </div>
                <div class="navButton" id="loginButton">
                    <a href="login.html">LOG IND</a>
                </div>
            </div>
        </nav>
    `;
	document.querySelector("body").insertAdjacentHTML("afterbegin", navHTML);
}

export { generateNavHTML };