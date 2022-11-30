/*
This is the index javascript for Voltorb Flip Speedrun
Written by: Lucas Dunn and Garrett Biwer
*/
var timerOn = false

function uploadTime(time) {
    



}





function startTimer() {
    var timer = document.getElementById("Time")
    var sec = 0
    var min = 0
    var timerCount = setInterval(function () {
        if (!timerOn)
            clearInterval(timerCount)
        sec++
        if (sec === 60) {
            sec = 0
            min++ 
        }
        if (sec<10) {
            timer.textContent = min + ':0' + sec
        } else {
            timer.textContent = min + ':' + sec
        }

        
    }, 1000)
    var time = {min,sec}
    uploadTime(time)
}




window.addEventListener('DOMContentLoaded', function () {
    var startTimerButton = document.getElementById('start-timer-button')
    startTimerButton.addEventListener('click', startTimer)



})