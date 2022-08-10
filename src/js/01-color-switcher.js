const startBtn = document.querySelector(['[data-start]']);
const stoptBtn = document.querySelector(['[data-stop]']);
let timerId = null;
stoptBtn.disabled = true;

startBtn.addEventListener('click', onStartBtnClick);
stoptBtn.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick() {
  timerId = setInterval(changeBgColor, 1000);

  startBtn.disabled = true;
  stoptBtn.disabled = false;
}

function onStopBtnClick() {
  clearInterval(timerId);

  stoptBtn.disabled = true;
  startBtn.disabled = false;
}

function changeBgColor() {
  const color = getRandomHexColor();
  document.body.style.backgroundColor = color;
}
