const time = document.querySelector('.time')
const date = document.querySelector('.date')


function showDate() {
    let dateValue = new Date();

    const options = {
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
    }

    const currentDate = dateValue.toLocaleDateString('en-EN', options)
    date.textContent = currentDate
}

const showTime = () => {
    const date = new Date()
    time.textContent = date.toLocaleTimeString()

    setInterval(showDate, 1000)
    setInterval(showTime, 1000)
}
showTime()