function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    var amOrPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    var formattedTime = padZero(hours) + ":" + padZero(minutes) + ":" + padZero(seconds) + " " + amOrPm;

    document.getElementById('clock').innerHTML = formattedTime;
    document.getElementById('date').innerHTML = now.toDateString();
}

function padZero(number) {
    return (number < 10 ? '0' : '') + number;
}

setInterval(updateClock, 1000);
updateClock();
