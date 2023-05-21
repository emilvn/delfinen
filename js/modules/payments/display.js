import {submitArrears} from "./submit.js";
import {toggleButtons, resetArrears} from "./buttons.js";

export function displayUsers(users) {
    for (const user of users) {
        const html = /*html*/`
            <form>
                <span>${user.name}</span>
                <input type="number" class="restance" name="restance" data-user="${user.id}">
                <input type="button" value="Nulstil restance felt" disabled>
                <input type="submit" value="Opdatér restance" disabled>
            </form>
        `;
        document.querySelector("#grid-container").insertAdjacentHTML("beforeend", html);
        const forms = document.querySelectorAll("form");
        forms[forms.length - 1].addEventListener("submit", submitArrears);
        forms[forms.length - 1].querySelector("input[type='button'").addEventListener("mouseup", resetArrears);
        forms[forms.length - 1].querySelector("input[type='number'").addEventListener("keyup", toggleButtons);
        forms[forms.length - 1].querySelector("input[type='number'").addEventListener("change", toggleButtons);
    }
}