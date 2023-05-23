window.addEventListener('load', main);

function main(){
    addEventListener();
}

function addEventListener(){
    const startAnimationButton = document.querySelector('#startTimeLineAnimationButton');
    startAnimationButton.addEventListener('click', addAnimation);
}

function addAnimation() {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `
    .timeline::before {
      animation: timeline-animation 10s 1 linear;
    }
  `;
  document.head.appendChild(styleElement);
}

