/*
This is the index javascript for Voltorb Flip Speedrun
Written by: Lucas Dunn and Garrett Biwer
*/

var timerOn = false
var currentTime = {min: 0,sec: 0}
var total = 0;
var points;
var board = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1]
]

function rnd(min,max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function createBoard() {
    for (var r = 0; r < 5; r++){
        for (var c = 0; c < 5; c++){
            board[r][c] = 1;
        }
    }
    var bombs = 0;
    points = 0;
    var pointsLeft = rnd(9,12);
    points = pointsLeft;
    var row;
    var col;
    var val;
    while (bombs < 6) {
        row = rnd(0,4);
        col = rnd(0,4);
        if (board[row][col] == 1){
            board[row][col] = 0;
            bombs++;
        }
    }
    while (pointsLeft > 0) {
        row = rnd(0,4);
        col = rnd(0,4);
        if (board[row][col] == 1){
            if (pointsLeft == 4){
                val = 2
            }
            else if (pointsLeft == 3){
                val = 3;
            }
            else if (pointsLeft == 2){
                val = 2;
            }
            else {
                val = rnd(2,3);
            }
            board[row][col] = val;
            pointsLeft = pointsLeft - val;
        }
    }
}

function smaller(itemA, itemB) {
    if (itemA.min < itemB.min) {
        return true
    } else if (itemB.min < itemA.min) {
        return false
    } else {
        return itemA.sec < itemB.sec? true:false
    }
}


function addTime(name,currentTime) {
    console.log("Data sent: " + name + ' ' + currentTime.min + ':' + currentTime.sec)
    fetch("/home/addTime", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            min: currentTime.min,
            sec: currentTime.sec
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then( function (res) {
        if (res.status === 200) {
            var leaderboard = document.getElementById('leaderboard-contents')
            
            var leaderboardItemTemplate = Handlebars.templates.leaderboardItem
            var newItemHTML = leaderboardItemTemplate({
                name: name,
                min: currentTime.min,
                sec: currentTime.sec,
                lowsec: currentTime.sec<10? true:false
            })
            leaderboard.insertAdjacentHTML('beforeend', newItemHTML)
            currentTime = {min: 0, sec: 0}
        } else {
            alert("Unable to update leaderboard due to error " + res.status)
        } 
    }).catch( function(err){
        console.log(err)
        alert("An error occured: ")
    })
}

// <div class="leaderboard-item">
//      <span class="leaderboard-rank">2</span> GAB <span class="leaderboard-time">7:47</span>
// </div>

// function createLeaderboardItem (leaderboardObject) {
//     var timeString = leaderboardObject.min + ':'
//     if (leaderboardObject.sec < 10)
//         timeString += '0' + leaderboardObject.sec
//     else
//         timeString += leaderboardObject.sec

//     var entry = document.createElement('div')
//     entry.classList.add('leaderboard-item')

//     var spanRank = document.createElement('span')
//     spanRank.classList.add('leaderboard-rank')
//     spanRank.textContent = leaderboardObject.rank
//     entry.appendChild(spanRank)

//     entry.textContent = ' ' + leaderboardObject.name + ' '

//     var spanTime = document.createElement('span')
//     spanTime.classList.add('leaderboard-time')
//     spanTime.textContent = timeString
//     entry.appendChild(spanTime)

//     return entry
// }




// function showLeaderboard() {
//     var leaderboard = document.getElementById('leaderboard-contents')
//     for (var i = 0; i<9; i++) {
//         leaderboard.appendChild(createLeaderboardItem(leaderboardData[i]))
//     }
// }
function badWord(text) {

    // These banned words were received from: https://www.wired.com/2016/09/science-swear-words-warning-nsfw-af/#:~:text=The%20three-letter%20words%20included%20in%20the%20list%20are,slag%2C%20slut%2C%20spic%2C%20suck%2C%20turd%2C%20twat%2C%20and%20wank.

    var badwords = ['ASS', 'CUM', 'FAG', 'GAY', 'JEW', 'GOD', 'TIT']
    for (var i = 0; i<7; i++) {
        if (text===badwords[i])
            return true
    }
    return false

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

    nameInput.value = nameInput.value.toUpperCase()
    if (nameInput.value === '') {
        alert('Please input your name!')
        return
    } else if (badWord(nameInput.value)) {   
        alert('You sly dog')
        nameInput.value = ''
        return
    }


    var modal = document.getElementById('add-name-modal')
    var modalBackdrop = document.getElementById('modal-backdrop')

    

    console.log("Input: " + nameInput.value + ' ' + currentTime)

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
    resetBoard();
    timerOn = true
    var timer = document.getElementById("Time")
    timer.textContent = '0:00'
    var sec = 0
    var min = 0
    var timerCount = setInterval(function () {
        if (!timerOn) {
            currentTime = {min: min,sec: sec}
            if (total == points){
                uploadTime()
            }
            showTiles();
            showControlPanel()
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
function showTiles() {
    var tiles = document.getElementsByClassName('tile-front');
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].classList.remove("hidden");
    }
    tiles = document.getElementsByClassName('tile-back');
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].classList.add("hidden");
    }
}
function resetBoard(){
    total = 0;
    createBoard();
    var tiles = document.getElementsByClassName('tile-front');
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].classList.add("hidden");
        tiles[i].firstElementChild.textContent = board[Math.floor(i / 5)][i % 5];
        tiles[i].parentElement.setAttribute("data-value", board[Math.floor(i / 5)][i % 5]);
    }
    tiles = document.getElementsByClassName('tile-back');
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].classList.remove("hidden");
    }
    tiles = document.getElementsByClassName('info-points');
    for (var i = 0; i < 5; i++) {
        var count = 0;
        for (var k = 0; k < 5; k++) {
            if (board[i][k] > 0) {
                count = count + board[i][k];
            }
        }
        tiles[i].textContent = count;
    }
    tiles = document.getElementsByClassName('info-bombs');
    for (var i = 0; i < 5; i++) {
        var count = 0;
        for (var k = 0; k < 5; k++) {
            if (board[i][k] == 0) {
                count++;
            }
        }
        tiles[i].textContent = count;
    }
    tiles = document.getElementsByClassName('info-points');
    for (var i = 0; i < 5; i++) {
        var count = 0;
        for (var k = 0; k < 5; k++) {
            if (board[k][i] > 0) {
                count = count + board[k][i];
            }
        }
        tiles[i+5].textContent = count;
    }
    tiles = document.getElementsByClassName('info-bombs');
    for (var i = 0; i < 5; i++) {
        var count = 0;
        for (var k = 0; k < 5; k++) {
            if (board[k][i] == 0) {
                count++;
            }
        }
        tiles[i+5].textContent = count;
    }
}

const flip = function() {
    var value;
    if (timerOn == true){
        this.parentElement.classList.add("hidden");
        this.parentElement.previousElementSibling.classList.remove("hidden");
        value = this.parentElement.parentElement.getAttribute("data-value");
        // console.log(value);
        if (value == 0){
            timerOn = false;
        }
        else {
            if (value != 1){
                total = parseInt(value) + total;
                if (total == points){
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
    //showLeaderboard()

    var startTimerButton = document.getElementById('start-timer-button')
    startTimerButton.addEventListener('click', startTimer)

    var hideModalButtons = document.getElementsByClassName('modal-hide-button')
    for (var i = 0; i<hideModalButtons.length; i++)
        hideModalButtons[i].addEventListener('click',hideModalAndClearContents)

    var acceptModalButton = document.getElementById('modal-accept')
    acceptModalButton.addEventListener('click',hideModalAndAcceptContents)
})