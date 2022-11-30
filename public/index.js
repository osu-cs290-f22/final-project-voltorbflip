/*
This is the index javascript for Voltorb Flip Speedrun
Written by: Lucas Dunn and Garrett Biwer
*/
var timerOn = false

function showModal() {
    var modal = document.getElementById('add-name-modal')
    var modalBackdrop = document.getElementById('modal-backdrop')

    modal.classList.remove('hidden')
    modalBackdrop.classList.remove('hidden')
}

function hideModal() {

    var modal = document.getElementById('add-name-modal')
    var modalBackdrop = document.getElementById('modal-backdrop')

    var nameInput = document.getElementById('name-input')
    nameInput.value = ''

    modal.classList.add('hidden')
    modalBackdrop.classList.add('hidden')
}

function uploadTime(time) {
    showModal()
    var header = document.getElementsByClassName('modal-header')
    if (time.sec < 10)
        header[0].textContent = 'Your time: ' + time.min + ":0" + time.sec
    else    
        header[0].textContent = 'Your time: ' + time.min + ":" + time.sec
        


}





function startTimer() {
    timerOn = true
    var timer = document.getElementById("Time")
    timer.textContent = '0:00'
    var sec = 0
    var min = 0
    var timerCount = setInterval(function () {
        if (!timerOn) {
            var time = {min,sec}
            uploadTime(time)
            clearInterval(timerCount)
        }
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
    
}




window.addEventListener('DOMContentLoaded', function () {
    var startTimerButton = document.getElementById('start-timer-button')
    startTimerButton.addEventListener('click', startTimer)


    var hideModalButtons = document.getElementsByClassName('modal-hide-button')
    for (var i = 0; i<hideModalButtons.length; i++)
        hideModalButtons[i].addEventListener('click',hideModal)


    
})