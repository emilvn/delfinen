export function addEventListener(){
    const startAnimationButton = document.querySelector('#startTimeLineAnimationButton');
    startAnimationButton.addEventListener('click', addAnimation);
}

function addAnimation() {
    const timeline = document.querySelector(".timeline__line");
    const anchor = document.querySelector(".anchor");
    timeline.classList.add("timeline-animation");
    anchor.classList.add("anchor-animation");
}