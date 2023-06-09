import {updatePayment} from "../../rest/fetch.js";

export async function submitArrears(event) {
    event.preventDefault();
    debugger;
    const payment = event.target["restance"].dataset.price - event.target["restance"].value;
    const uid = event.target["restance"].dataset.user;
    const paymentData = {
        payment
    }
    const response = await updatePayment(paymentData, uid);

    if(response) {
        event.target["restance"].dataset.arrears = event.target["restance"].value;
        event.target.querySelector("input[type='button']").disabled = true;
        event.target.querySelector("input[type='submit']").disabled = true;
    }
}