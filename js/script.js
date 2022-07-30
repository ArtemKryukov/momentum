const time = document.querySelector('.time')


const showTime = () => {
    const date = new Date
    time.textContent = date.toLocaleTimeString()

    setInterval(showTime, 1000)
}

showTime()