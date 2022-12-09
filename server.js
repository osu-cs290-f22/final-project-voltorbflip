/* 
This is the server code for the voltorb flip speedrun.
Written by: Lucas Dunn
*/

var fs = require('fs')
var express = require('express')
var exphbs = require('express-handlebars')
var bodyParser = require('body-parser')

var leaderboardData = require('./leaderboardData.json')
leaderboardData = leaderboardData.sort((a,b) => {
    if ((a.min <= b.min) && (a.sec < b.sec)) {
        return -1;
    }
});
leaderboardData = leaderboardData.slice(0,10)

var app = express()
var port = process.env.PORT || 3000

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(bodyParser.json())



app.use(express.static('public'))

function smaller(itemA, itemB) {
    if (itemA.min < itemB.min) {
        return true
    } else if (itemB.min < itemA.min) {
        return false
    } else {
        return itemA.sec < itemB.sec? true:false
    }
}

function sortLeaderboard(){
    leaderboardData = leaderboardData.sort((a,b) => {
        if ((a.min <= b.min) && (a.sec < b.sec)) {
            return -1;
        }
    });
}



// function swap(a, b) {
//     var temp = leaderboardData[a]
    
//     leaderboardData[a].rank = leaderboardData[b].rank
//     leaderboardData[a].name = leaderboardData[b].name
//     leaderboardData[a].min = leaderboardData[b].min
//     leaderboardData[a].sec = leaderboardData[b].sec

//     leaderboardData[b].rank = temp.rank
//     leaderboardData[b].name = temp.name
//     leaderboardData[b].min = temp.min
//     leaderboardData[b].sec = temp.sec
// }

// function sortLeaderboard(item) {
//     //compare with last element
//     //if smaller, replace
//     //check with each element, going backwards
//         //if smaller, swap and keep going
//         //if bigger, stop
//     //if there are more than 10 elements, remove the last element
//     console.log (smaller(item, leaderboardData[9]))

//     if (smaller(item, leaderboardData[9])) {


//         leaderboardData[9].rank = item.rank
//         leaderboardData[9].name = item.name
//         leaderboardData[9].min = item.min
//         leaderboardData[9].sec = item.sec

//         var i = 9
//         while (smaller(leaderboardData[i], leaderboardData[i-1]) && i>0) {
//             swap(i,i-1)
//         }

//     } 
//     console.log(leaderboardData)

// }

app.get('/home', function(req,res,next) {
    if (leaderboardData) {
        res.status(200).render('home', {leaderboardData: leaderboardData})
    } else {
        next()
    }
})



app.get('/', function(req,res,next) {
    if (leaderboardData) {
        res.status(200).render('home', {leaderboardData: leaderboardData})
    } else {
        next()
    }
})

app.get('*', function(req,res,next) {
    res.status(404).render('404')
})


app.post('/home/addTime', function(req,res,next) {
    console.log('Request recieved')
    if (req.body) {
        var item = {
            name: req.body.name,
            min: req.body.min,
            sec: req.body.sec,
            lowsec: req.body.sec<10? true:false
        }
        leaderboardData.push(item)
        fs.writeFile(
            './leaderboardData.json',
            JSON.stringify(leaderboardData, null, 4),
            function(err) {
                if(err) {
                    res.status(500).send('Error writing to server')
                } else {
                    res.status(200).send('Time succesfully added')
                }
            }
        )
    } else {
        res.status(400).send('Request didn\'t have a name and time')
    }
    sortLeaderboard();
})


app.listen(port, function () {
    console.log("== Server is listening on port", port);
})