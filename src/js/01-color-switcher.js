// TODO: Version 1

// const bodyEl = document.querySelector('body');
// const buttonEl = document.querySelector('button');
// const dataAttrStart = "data-start";
// const dataAttrStop = "data-stop";

// let intervalId = null;

// bodyEl.addEventListener('click', onClickButton);

// function onClickButton(evt) {
// 	const target = evt.target;
// 	if (target.hasAttribute(dataAttrStart)) {
// 		target.disabled = true;
// 		intervalId = setInterval(() => {
// 			const randomColor = getRandomHexColor();
// 			bodyEl.style.backgroundColor = randomColor;
// 		}, 1000);
// 	}
// 	if (target.hasAttribute(dataAttrStop)) {
// 		clearInterval(intervalId);
// 		buttonEl.disabled = false;
// 	}
// }

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
// }

//TODO: Version 2

const bodyEl = document.querySelector('body');
const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');

let intervalId = null;

buttonStart.addEventListener('click', onClickButtonStart);
buttonStop.addEventListener('click', onClickButtonStop);

function onClickButtonStart() {
  buttonStart.disabled = true;
  intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    bodyEl.style.backgroundColor = randomColor;
  }, 1000);
}

function onClickButtonStop() {
  clearInterval(intervalId);
  buttonStart.disabled = false;
  buttonStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
