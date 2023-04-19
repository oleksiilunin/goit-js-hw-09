// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputDateEl = document.querySelector('#datetime-picker');
const buttonStartEl = document.querySelector('[data-start]');
const daysSpanEl = document.querySelector('[data-days]');
const hoursSpanEl = document.querySelector('[data-hours]');
const minutesSpanEl = document.querySelector('[data-minutes]');
const secondsSpanEl = document.querySelector('[data-seconds]');

let timerId = null;

buttonStartEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDateUponSelection = new Date();
    const selectedDate = selectedDates[0];

    if (selectedDate <= currentDateUponSelection) {
      Notiflix.Notify.warning('Please choose a date in the future');
      buttonStartEl.disabled = true;
      return;
    }
    buttonStartEl.disabled = false;
  },
};

const fp = flatpickr(inputDateEl, options);

buttonStartEl.addEventListener('click', onClickButtonStart);

function onClickButtonStart() {
  buttonStartEl.disabled = true;

  const selectedDateInInput = new Date(inputDateEl.value);
  const currentDateUponClickButton = new Date();

  let differenceInTime = selectedDateInInput - currentDateUponClickButton;
  let countTime = Math.floor(differenceInTime / 1000) * 1000;

  if (differenceInTime <= 0) {
    Notiflix.Notify.warning('Please choose a date in the future');
    buttonStartEl.disabled = true;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(differenceInTime);

  daysSpanEl.textContent = addLeadingZero(days);
  hoursSpanEl.textContent = addLeadingZero(hours);
  minutesSpanEl.textContent = addLeadingZero(minutes);
  secondsSpanEl.textContent = addLeadingZero(seconds);

  timerId = setInterval(onStart, 1000);

  function onStart() {
    countTime -= 1000;

    const { days, hours, minutes, seconds } = convertMs(countTime);

    daysSpanEl.textContent = addLeadingZero(days);
    hoursSpanEl.textContent = addLeadingZero(hours);
    minutesSpanEl.textContent = addLeadingZero(minutes);
    secondsSpanEl.textContent = addLeadingZero(seconds);

    if (!countTime) {
      clearInterval(timerId);
      Notiflix.Notify.success('The time is over');
      return;
    }
  }

  fp.set('readonly', true);
  // inputDateEl.setAttribute('readonly', 'readonly');
  inputDateEl.style.opacity = '0.5';
  inputDateEl.style.pointerEvents = 'none';
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
