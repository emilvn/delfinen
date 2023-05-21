export function toggleButtons(event) {
    const submitButton = event.target.parentNode.querySelector("input[type='submit']");
    const resetButton = event.target.parentNode.querySelector("input[type='button']");

    if(event.target.value != event.target.dataset.arrears) { 
        submitButton.disabled = false;
        resetButton.disabled = false;
    } else {
        submitButton.disabled = true;
        resetButton.disabled = true;
    }
}

export function resetArrears(event) {
    const arrearsInput = event.target.parentNode.querySelector("input[type='number']");
    const submitButton = event.target.parentNode.querySelector("input[type='submit']");
    const resetButton = event.target;
    
    arrearsInput.value = arrearsInput.dataset.arrears;
    submitButton.disabled = true;
    resetButton.disabled = true;
}