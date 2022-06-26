function timer(selector ,timeToEnd) {
    const endTimer = timeToEnd;

    function GetTimeRemaining(endtime) {

        let days, hours, minutes, seconds;
        const time = Date.parse(endtime) - Date.parse(new Date());

        if (time <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(time / (1000 * 60 * 60 * 24)),
                hours = Math.floor((time / (1000 * 60 * 60)) % 24),
                minutes = Math.floor((time / 1000 / 60) % 60),
                seconds = Math.floor((time / 1000) % 60);
        }

        return {
            'total': time,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function addZero(number) {
        if (number >= 0 && number < 10) {
            return `0${number}`;
        } else {
            return number;
        }
    }

    function setTime(endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(refreshClock, 1000);

        function refreshClock() {
            const time = GetTimeRemaining(endtime);

            days.innerHTML = addZero(time.days);
            hours.innerHTML = addZero(time.hours);
            minutes.innerHTML = addZero(time.minutes);
            seconds.innerHTML = addZero(time.seconds);

            if (time.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setTime(endTimer);
}

export default timer;