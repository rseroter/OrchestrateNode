var express = require('express');
var router = express.Router();

//Orchestrate API token
var token = "<key>";
var orchestrate = require('orchestrate');
//location reference
orchestrate.ApiEndPoint = "<endpoint>";
var db = orchestrate(token);

/* GET all player listing. */
router.get('/', function (req, res) {

    db.list("Players")
    .then(function (result) {
        playerlist = result.body.results;
        //console.log(playerlist);

        res.render('players', { title: 'Players List', plist: playerlist });
    })
    .fail(function (err) {
        console.log(err);
    });
});

/* GET one player profile. */
router.get('/:playerid', function (req, res) {
    
    console.log(req.params.playerid);
    
    //get player object
    db.get("Players", req.params.playerid)
    .then(function (result) {
        player = result.body;
        //console.log(player);
        
        //get graph of relationships
        db.newGraphReader()
        .get()
        .from('Players', req.params.playerid)
        .related('currentteammate')
        .then(function (relres) {
            playerlist = relres.body;
            //console.log(playerlist);
            
            //get time-series events
            db.newEventReader()
            .from('Players', req.params.playerid)
            .type('gamelog')
            .list()
            .then(function (evtres) {
                gamelog = evtres.body;
                //console.log(gamelog);
                
                res.render('player', { title: 'Player Profile', profile: player, plist: playerlist, elist: gamelog });
            });   
        });
    })
    .fail(function (err) {
        console.log(err);
    });
});


module.exports = router;