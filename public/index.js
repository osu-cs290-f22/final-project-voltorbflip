/*
This is the index javascript for Voltorb Flip Speedrun
Written by: Lucas Dunn and Garrett Biwer
*/
var timerOn = false

function startTimer() {
    var timer = document.getElementById("Time")
    var sec = 0
    var min = 0
    var timerCount = setInterval(function () {
        if (timerOn === 'false')
            clearInterval(timerCount)
        sec++
        if (sec === 60) {
            sec = 0
            min++ 
        }
        timer.textContent = min + ':' + sec
    }, 1000)
    var time = {min,sec}
    return time
}


