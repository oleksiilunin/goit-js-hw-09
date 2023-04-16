const bodyEl = document.querySelector('body');
const buttonEl = document.querySelector('button');
const dataAttrStart = "data-start";
const dataAttrStop = "data-stop";

let intervalId = null;

const bodyChangeColor = addEventListener('click', onClickButton);

function onClickButton(evt) {
	const target = evt.target;
	console.log(target);
	if (target.hasAttribute(dataAttrStart)) {
		target.disabled = true;
		intervalId = setInterval(() => {
			const randomColor = getRandomHexColor();
			bodyEl.style.backgroundColor = randomColor;
		}, 1000);
	}
	if (target.hasAttribute(dataAttrStop)) {
		clearInterval(intervalId);
		buttonEl.disabled = false;
	}
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
