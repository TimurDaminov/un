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

function finishDebate() {
    const modal = document.getElementById('modal')
    modal.classList.add('open')
    hero.remove()
    document.querySelector('.modal__box').addEventListener('click', (event) => {
        event._isClickOnWhite = true
    })
    modal.addEventListener('click', event => {
        if (event._isClickOnWhite) return;
        modal.classList.remove('open')
    })
}

function checkStatus() {
    let membersValue = jsonToData(getData('members'))
    for (const user of membersValue) {
        if (user.countriStatus != true) {
            user.countriStatus = true
            setData('members', dataToJson(membersValue))
            startDelegate(user)
            return
        }
    }
    finishDebate()
    return
}

function getRandomCountry() {
    let membersValue = jsonToData(getData('members'))
    let randomIndex = Math.floor(Math.random() * lengthArr);
    if (membersValue[randomIndex].countriStatus === false) {
        membersValue[randomIndex].countriStatus = true
        setData('members', dataToJson(membersValue))
        startDelegate(membersValue[randomIndex])
        return
    }
    checkStatus()
}

function startTimer(duration, display, timerCont) {
    let time = duration, minutes, seconds;
    time = null
    time = duration, minutes, seconds;
    const timerStopBtn = createElement('button', 'Стоп', ['btn-reset', 'btn-2'])
    timerCont.append(timerStopBtn)
    timer = setInterval(function () {
        minutes = parseInt(time / 60, 10);
        seconds = parseInt(time % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        if (--time < 0) {
            timerStopBtn.remove()
            time = duration;
            clearInterval(timer);
            timer = null
            const nextDelegatBtn = createElement('button', 'Далее', ['btn-reset', 'btn-2'])
            timerCont.append(nextDelegatBtn)
            nextDelegatBtn.addEventListener('click', () => {
                hero.innerHTML = ''
                nextDelegat()
            })
            return true
        }
        timerStopBtn.addEventListener('click', () => {
            timerStopBtn.remove()
            display.remove()
            time = 0;
        });
    }, 1000);
}

function createDelegatCard(user) {
    const cont = createElement('div', '', ['delegat__item'])
    const flag = createElement('img', '', ['delegat__flag-img'], {src: `https://timurdaminov.github.io/un/img/flags/${user.countriFlag}.svg`, alt: `Флаг: ${user.countryName}`})
    const country = createElement('h2', `Государство: ${user.countryName}`, ['delegat__country'])
    const delegat = createElement('h2', `Делегат: ${user.delegatName}`, ['delegat__name'])
    cont.append(flag, country, delegat)
    return cont
}

async function startDelegate(delegate) { 
    const timerTime = Number(getData('timerTime'))

    const timerValue = createElement('h2', '', ['timer-value'])
    const timerStartBtn = createElement('button', 'Старт', ['btn-reset', 'btn-2'])
    const timerCont = createElement('div', '', ['delegat__timer'])
    timerCont.append(timerValue, timerStartBtn)
    const delegatInfo = createDelegatCard(delegate)
    hero.append(delegatInfo, timerCont)
    
    timerStartBtn.addEventListener('click',() => {
        timerStartBtn.remove()
        startTimer(timerTime, timerValue, timerCont)
    });
}

function nextDelegat() {
    getRandomCountry()
}


let membersValue = jsonToData(getData('members'))
if (membersValue != null) {
    membersValue = jsonToData(getData('members'))
} else {
    setData('members', dataToJson(countrys))
    membersValue = jsonToData(getData('members'))
}
var timer = null
var lengthArr = membersValue.length
var hero = document.getElementById('hero')
const debateStart = createElement('button', 'Дебаты', ['btn-reset', 'hero__debate-start'])
hero.append(debateStart)
debateStart.addEventListener('click', () => {
    hero.innerHTML = ''
    getRandomCountry()
})

