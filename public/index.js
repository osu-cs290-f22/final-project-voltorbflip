/*
This is the index javascript for Voltorb Flip Speedrun
Written by: Lucas Dunn and Garrett Biwer
*/
var timerOn = false
var currentTime = {min: 0,sec: 0}
var total = 0;

function addTime(name,currentTime) {
    var recordInput = {name: name,min: currentTime.min, sec: currentTime.sec}
    var recordInputString = recordInput.min + ':'
    if (recordInput.sec < 10)
        recordInputString += '0' + recordInput.sec
    else
        recordInputString += recordInput.sec
    var leaderboardData = document.getElementById('leaderboard-contents')

    var recordItem = document.createElement('div')
    recordItem.classList.add('leaderboard-item')
    recordItem.textContent = recordInput.name + ' '

    var spanTime = document.createElement('span')
    spanTime.classList.add('leaderboard-time')
    spanTime.textContent = recordInputString
    recordItem.appendChild(spanTime)

    leaderboardData.appendChild(recordItem)

    currentTime = {min: 0,sec: 0}

}





function showModal() {
    var modal = document.getElementById('add-name-modal')
    var modalBackdrop = document.getElementById('modal-backdrop')

    modal.classList.remove('hidden')
    modalBackdrop.classList.remove('hidden')
}

function hideModalAndClearContents() {

    var modal = document.getElementById('add-name-modal')
    var modalBackdrop = document.getElementById('modal-backdrop')

    var nameInput = document.getElementById('name-input')
    nameInput.value = ''

    modal.classList.add('hidden')
    modalBackdrop.classList.add('hidden')
}

function hideModalAndAcceptContents() {
    var nameInput = document.getElementById('name-input')

    if (nameInput.value === '') {
        alert('Please input your name!')
        return
    }


    var modal = document.getElementById('add-name-modal')
    var modalBackdrop = document.getElementById('modal-backdrop')

    nameInput.value = nameInput.value.toUpperCase()
    addTime(nameInput.value,currentTime)

    modal.classList.add('hidden')
    modalBackdrop.classList.add('hidden')
}


function uploadTime() {
    showModal()
    var header = document.getElementsByClassName('modal-header')
    if (currentTime.sec < 10)
        header[0].textContent = 'Your time: ' + currentTime.min + ":0" + currentTime.sec
    else    
        header[0].textContent = 'Your time: ' + currentTime.min + ":" + currentTime.sec
}

function hideControlPanel() {
    var controlPanel = document.getElementById("control-box")
    controlPanel.classList.add("hidden");
}

function showControlPanel() {
    var controlPanel = document.getElementById("control-box")
    controlPanel.classList.remove("hidden");
}

function startTimer() {
    hideControlPanel()
    timerOn = true
    var timer = document.getElementById("Time")
    timer.textContent = '0:00'
    var sec = 0
    var min = 0
    var timerCount = setInterval(function () {
        if (!timerOn) {
            currentTime = {min: min,sec: sec}
            if (total == 9){
                uploadTime()
            }
            showControlPanel()
            clearInterval(timerCount)
            resetBoard();
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
function resetBoard(){
    total = 0;
    var tiles = document.getElementsByClassName('tile-front');
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].classList.add("hidden");
    }
    tiles = document.getElementsByClassName('tile-back');
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].classList.remove("hidden");
    }
}

const flip = function() {
    var value;
    if (timerOn == true){
        this.parentElement.classList.add("hidden");
        this.parentElement.previousElementSibling.classList.remove("hidden");
        value = this.parentElement.parentElement.getAttribute("data-value");
        console.log(value);
        if (value == 0){
            timerOn = false;
        }
        else {
            if (value != 1){
                total = parseInt(value) + total;
                if (total == 9){
                    timerOn = false;
                }
            }
        }
    }
}
document.getElementById("tile-1-back").onclick = flip;
document.getElementById("tile-2-back").onclick = flip;
document.getElementById("tile-3-back").onclick = flip;
document.getElementById("tile-4-back").onclick = flip;
document.getElementById("tile-5-back").onclick = flip;
document.getElementById("tile-6-back").onclick = flip;
document.getElementById("tile-7-back").onclick = flip;
document.getElementById("tile-8-back").onclick = flip;
document.getElementById("tile-9-back").onclick = flip;
document.getElementById("tile-10-back").onclick = flip;
document.getElementById("tile-11-back").onclick = flip;
document.getElementById("tile-12-back").onclick = flip;
document.getElementById("tile-13-back").onclick = flip;
document.getElementById("tile-14-back").onclick = flip;
document.getElementById("tile-15-back").onclick = flip;
document.getElementById("tile-16-back").onclick = flip;
document.getElementById("tile-17-back").onclick = flip;
document.getElementById("tile-18-back").onclick = flip;
document.getElementById("tile-19-back").onclick = flip;
document.getElementById("tile-20-back").onclick = flip;
document.getElementById("tile-21-back").onclick = flip;
document.getElementById("tile-22-back").onclick = flip;
document.getElementById("tile-23-back").onclick = flip;
document.getElementById("tile-24-back").onclick = flip;
document.getElementById("tile-25-back").onclick = flip;


window.addEventListener('DOMContentLoaded', function () {
    var startTimerButton = document.getElementById('start-timer-button')
    startTimerButton.addEventListener('click', startTimer)


    var hideModalButtons = document.getElementsByClassName('modal-hide-button')
    for (var i = 0; i<hideModalButtons.length; i++)
        hideModalButtons[i].addEventListener('click',hideModalAndClearContents)

    var acceptModalButton = document.getElementById('modal-accept')
    acceptModalButton.addEventListener('click',hideModalAndAcceptContents)
})