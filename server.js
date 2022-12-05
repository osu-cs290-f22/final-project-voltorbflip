/* 
This is the server code for the voltorb flip speedrun.
Written by: Lucas Dunn
*/

var fs = require('fs')
var express = require('express')
var exphbs = require('express-handlebars')

var leaderboardData = require('./leaderboardData.json')

var app = express()
var port = process.env.PORT || 8000

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.json())


app.use(express.static('public'))



function sortLeaderboard(leaderboardData) {
    //get last element
    //check with each element, going backwards
        //if smaller, swap and keep going
        //if bigger, stop
    //if there are more than 10 elements, remove the last element

}

app.post('/addTime', function(req,res,next) {
    if (req.body && req.body.name && req.body.min && req.body.sec) {
        var time = {
            rank: 0,
            name: req.body.name,
            min: req.body.min,
            sec: req.body.sec
        }
        leaderboardData.push(time)

        sortLeaderboard(leaderboardData)

        fs.writeFile(
            './leaderboardData.json',
            JSON.stringify(leaderboardData, null, 2),
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
})
