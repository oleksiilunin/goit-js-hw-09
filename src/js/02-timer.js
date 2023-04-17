// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

const buttonStartEl = document.querySelector('[data-start]');
const daysSpanEl = document.querySelector('[data-days]');
const hoursSpanEl = document.querySelector('[data-hours]');
const minutesSpanEl = document.querySelector('[data-minutes]');
const secondsSpanEl = document.querySelector('[data-seconds]');

buttonStartEl.disabled = true;

const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
	
		const currentDate = new Date();

		differenceInTime = selectedDates[0] - currentDate;

		if (differenceInTime <= 0) {

			window.alert("Please choose a date in the future")
			return;
		}

		const { days, hours, minutes, seconds } = convertMs(differenceInTime);

		daysSpanEl.textContent = days.toString().padStart(2, "0");
		hoursSpanEl.textContent = hours.toString().padStart(2, "0");
		minutesSpanEl.textContent = minutes.toString().padStart(2, "0");
		secondsSpanEl.textContent = seconds.toString().padStart(2, "0");

		console.log(daysSpanEl);
		console.log(hoursSpanEl);
		console.log(minutesSpanEl);
		console.log(secondsSpanEl);
		
	},
};

const fp = flatpickr('#datetime-picker', options);

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}