import {countrys} from './countries.js'


function createElement(tag = 'div', text = '', classList = [], attrs = {}) {
    let element = document.createElement(tag)
    element.classList.add(...classList)
    element.textContent = text
    for (const prop in attrs) {
        element[prop] = attrs[prop]
    }
    return element
}

function dataToJson(data) {
    return JSON.stringify(data)
}

function jsonToData(data) {
    return JSON.parse(data)
}

function getData(name) {
    return localStorage.getItem(name)
}

function setData(name, data) {
    localStorage.setItem(name, data)
}

let timerTime = localStorage.getItem('timerTime');

let intervalId;
let timerRunning = false;
let timeLeft = timerTime;

function startTimer() {
  if (!timerRunning) {
    intervalId = setInterval(() => {
      timeLeft--;
      console.log(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(intervalId);
        console.log('Таймер завершен');
      }
    }, 1000);
    timerRunning = true;
  }
}

function stopTimer() {
  clearInterval(intervalId);
  timeLeft = timerTime;
  timerRunning = false;
  console.log('Таймер остановлен');
}

function pauseTimer() {
  clearInterval(intervalId);
  timerRunning = false;
  console.log('Таймер приостановлен');
}



document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer);
document.getElementById('pauseButton').addEventListener('click', pauseTimer);
