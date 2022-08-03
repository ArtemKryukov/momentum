const time = document.querySelector('.time')
const date = document.querySelector('.date')
const greeting = document.querySelector('.greeting')
const userName = document.querySelector('.name')
const body = document.querySelector('.body')

let randomNum


const showDate = () => {
    let dateValue = new Date();

    const options = {
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
    }

    const currentDate = dateValue.toLocaleDateString('en-EN', options)
    date.textContent = currentDate
}

const showGreeting = () => {
    const timeOfDay = getTimeOfDay()
    const greetingText = `Good ${timeOfDay}`
    greeting.textContent = greetingText
}

const showTime = () => {
    const date = new Date()
    time.textContent = date.toLocaleTimeString()
    
    setTimeout(showDate, 1000)
    setTimeout(showTime, 1000)
    setTimeout(showGreeting, 1000)
}

const getTimeOfDay = () => {
    const listTimeOfDay = ['morning', 'afternoon', 'evening', 'night']
    const date = new Date()
    const hours = date.getHours()
    return listTimeOfDay[Math.floor(hours / 8)]
}

const setLocalStorage = () => {
    localStorage.setItem('name', userName.value);
}

const getLocalStorage = () => {
    if(localStorage.getItem('name')) {
        userName.value = localStorage.getItem('name');
    }
}

function getRandomNum(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const setBg = () => {
    const timeOfDay = getTimeOfDay()
    const bgNum = getRandomNum(1, 20).toString().padStart(2, "0")
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`
}

const getSlideNext = () => {
    
}



const getSlidePrev = () => {
    
}


setBg()
showTime()
getRandomNum()


window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)