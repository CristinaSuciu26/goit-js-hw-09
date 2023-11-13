import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
const startButton = document.querySelector('[data-start]');
const input = document.querySelector('input[type="text"]');

const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownInterval;
let selectedDate;

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    clearInterval(countdownInterval);

    if (selectedDate > new Date()) {
      startButton.disabled = false;
    } else {
        Notiflix.Notify.failure('Please choose a date in the future.');
    }
  },
};

flatpickr(input, options);

startButton.addEventListener('click', startCountdown);

function startCountdown() {
  startButton.disabled = true;
  updateCountdown(selectedDate);
  countdownInterval = setInterval(function () {
    updateCountdown(selectedDate);
  }, 1000);
}

function updateCountdown(targetTime) {
  const currentTime = new Date().getTime();
  const timeRemaining = targetTime - currentTime;

  if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    resetTimer();
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeRemaining);

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

function resetTimer() {
  daysElement.textContent = '00';
  hoursElement.textContent = '00';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
  startButton.disabled = true;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}
