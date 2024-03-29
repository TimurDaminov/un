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

function createLine(user) {
    const line = createElement('tr', '', ['tr-item'])
    const flag = createElement('td', '', ['td-item'])
    const flagValue = createElement('img', '', ['td-flag'], {src: `https://timurdaminov.github.io/un/img/flags/${user.countriFlag}.svg`, alt: `Флаг: ${user.countryName}`})
    flag.append(flagValue)
    const country = createElement('td', user.countryName, ['td-item'])
    const delegat = createElement('td', user.delegatName, ['td-item'])
    const status = createElement('td', '', ['td-item'])
    if (user.countriStatus === true) {
        status.classList.add('status-true')
    } else {
        status.classList.add('status-wait')
    }
    line.append(flag, country, delegat, status)
    return line
}

function createList(arr) {
    const tableBody = document.getElementById('members-body')
    tableBody.innerHTML = ''
    for (const member of arr) {
        tableBody.append(createLine(member))
    }
}

function checkStatus(arr, type) {
    let count = 0
    for (const member of arr) {
        if (member.countriStatus === type) {
            count++
        }
    }
    return count
}

function modalUnpdate() {
    const modal = document.getElementById('modal')
    modal.classList.add('open')
    document.querySelector('.modal__box').addEventListener('click', (event) => {
        event._isClickOnWhite = true
    })
    modal.addEventListener('click', event => {
        if (event._isClickOnWhite) return;
        modal.classList.remove('open')
    })

    const confirm = document.getElementById('modal-confirm')
    confirm.addEventListener('click', () => {
        localStorage.removeItem('members')
        setData('members', dataToJson(countrys))
        modal.classList.remove('open')
        let membersValue = jsonToData(getData('members'))
        createList(membersValue)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    let membersValue = jsonToData(getData('members'))
    if (membersValue != null) {
        membersValue = jsonToData(getData('members'))
    } else {
        setData('members', dataToJson(countrys))
        membersValue = jsonToData(getData('members'))
    }
    createList(membersValue)

    const membersCount = document.getElementById('members-length')
    membersCount.innerHTML = membersValue.length

    const membersFinished = document.getElementById('members-finished')
    membersFinished.innerHTML = checkStatus(membersValue, true)

    const membersWait = document.getElementById('members-wait')
    membersWait.innerHTML = checkStatus(membersValue, false)

    const updateBtn = document.getElementById('update-btn')
    updateBtn.addEventListener('click', () => {
        modalUnpdate()
    })
})

