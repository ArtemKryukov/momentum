import playList from './playList.js'

const time = document.querySelector('.time')
const date = document.querySelector('.date')
const greeting = document.querySelector('.greeting')
const userName = document.querySelector('.name')
const body = document.querySelector('.body')
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const city = document.querySelector('.city')
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const quoteChange = document.querySelector('.change-quote')
const play = document.querySelector('.play')
const isPlayPrev = document.querySelector('.play-prev')
const isPlayNext = document.querySelector('.play-next')
const playLists = document.querySelector('.play-list')


let randomNum = 0
let isPlay = false
let playNum = 0




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
    const listTimeOfDay = ['night', 'morning', 'afternoon', 'evening']
    const date = new Date()
    const hours = date.getHours()
    return listTimeOfDay[Math.floor(hours / 6)]
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


const timeOfDay = getTimeOfDay()
const bgNum = getRandomNum(1, 20).toString().padStart(2, "0")


const setBg = () => {
    const timeOfDay = getTimeOfDay()
    const bgNum = getRandomNum(1, 20).toString().padStart(2, "0")
    const img = new Image()
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`
    }
}

const getSlideNext = () => {
    if(randomNum < 20) {
        randomNum++
        setBg(timeOfDay, bgNum)
    }else if(randomNum === 20){
        randomNum = 1
        setBg(timeOfDay, bgNum)
    }
}

const getSlidePrev = () => {
    if(randomNum > 0 && randomNum < 20 ){
        randomNum--
        setBg(timeOfDay, bgNum)
    }else if(randomNum === 0 ){
        randomNum = 20
        setBg(timeOfDay, bgNum)
    }
}



slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)

async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=e3fef2a7b08b7bd928d47588a5a7e892&units=metric?`
    const res = await fetch(url)
    const data = await res.json() 
    
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`)
    wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`
    humidity.textContent = `Humidity: ${data.main.humidity}%`
    temperature.textContent = `${Math.floor(data.main.temp / 10)}°C`
    weatherDescription.textContent = data.weather[0].description
}

city.addEventListener('change', getWeather)

const getQuotes = () => {
    const quotes = 'data.json'
    fetch(quotes)
    .then(res => res.json())
    .then(data => { 
        const randomNum = Math.floor(Math.random() * data.length) +1
        quote.textContent = data[randomNum].text
        author.textContent = data[randomNum].author
    })
}
quoteChange.addEventListener('click', getQuotes)


const audio = new Audio()

const playAudio = () => {
    audio.src = playList[playNum].src
    if(!isPlay) {
        play.classList.add('pause')
        audio.currentTime = 0
        isPlay = true
        audio.play()
    }
    else{
        isPlay = false
        // play.classList.remove('pause')
        audio.pause()
    }
}

play.addEventListener('click', playAudio);


const playNext = () => {
    if(playNum === playList.length){
        playNum = 0
    }
    playNum++
    playAudio()
    console.log(playNum)
}
isPlayNext.addEventListener('click', playNext)

const playPrev = () => {
    if(playNum === 0){
        playNum = playList.length
    }
        playNum--
        playAudio()
        console.log(playNum)
}
isPlayPrev.addEventListener('click', playPrev)

playList.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('play-item')
    li.textContent = el.title
    playLists.append(li)
})

setBg()
showTime()
getRandomNum()
getSlideNext()
getSlidePrev()
getQuotes()


window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)