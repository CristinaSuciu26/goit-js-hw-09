const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let colorInterval;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startButton.addEventListener('click', function () {
  if (!colorInterval) {
    colorInterval = setInterval(function () {
      const color = getRandomHexColor();
      document.body.style.background = color;
    }, 1000);

    startButton.disabled = true;
    stopButton.disabled = false;
  }
});

stopButton.addEventListener('click', function () {
  if (colorInterval) {
    clearInterval(colorInterval);
    colorInterval = null;
  }

  startButton.disabled = false;
  stopButton.disabled = true;
});
