import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';


const startBtn = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
let chosenDate = 0;
let intervalId = null;

startBtn.disabled = true;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      startBtn.disabled = true;
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    chosenDate = selectedDates[0];
    startBtn.disabled = false;

    startBtn.addEventListener('click', () => {
      intervalId = setInterval(() => {
        const difference = chosenDate - Date.now();
        startBtn.disabled = true;
        if (difference < 1000) {
          clearInterval(intervalId);
          startBtn.disabled = false;
        }
        const resultTime = convertMs(difference);
        daysValue.textContent = resultTime.days;
        hoursValue.textContent = resultTime.hours;
        minutesValue.textContent = resultTime.minutes;
        secondsValue.textContent = resultTime.seconds;
      }, 1000);
    });
  },
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
