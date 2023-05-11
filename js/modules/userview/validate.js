export function checkTrainingTimeFields(category, datetime, seconds) {
    const completedMessage = document.querySelector("#add_training_time_form");
    if (!category || !datetime || !seconds) {
        completedMessage.classList.remove('valid');
        completedMessage.classList.add('invalid');
        return false;
    } else {
        completedMessage.classList.remove('invalid');
        completedMessage.classList.add('valid');
        return true;
    }
}