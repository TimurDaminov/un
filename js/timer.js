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

document.addEventListener('DOMContentLoaded', () => {
    let alertMess = document.getElementById('timer-mess')
    let timeInput = document.getElementById('timer-input')
    let timerValue = jsonToData(getData('timerTime'))
    let submitBtn = document.getElementById('timer-btn')
    if (timerValue != null || timerValue > 31) {
        timeInput.value = timerValue
    } else {
        timeInput.value = 30
    }

    timeInput.addEventListener('input', () => {
        alertMess.innerHTML = ''
    })
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault()
        timerValue = timeInput.value
        setData('timerTime', dataToJson(timerValue))
        alertMess.innerHTML = 'Таймер успешно изменен!'
    })
})