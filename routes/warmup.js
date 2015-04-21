var express = require('express');
var router = express.Router();

//Orchestrate API token
var token = "<key>";
var orchestrate = require('orchestrate');
//location reference
orchestrate.ApiEndPoint = "<endpoint>";
var db = orchestrate(token);

/* Warmup the collection. */
router.get('/', function (req, res) {
    
    //create key/value records
    db.put('Players', "10001", {
        "name": "Blake Griffin",
        "team": "Los Angeles Clippers",
        "position": "power forward",
        "birthdate": "03/16/89",
        "college": "Oklahoma",
        "careerppg": "21.5",
        "careerrpg": "9.7"
    })
    .then(function (result1) {
        console.log("record added");
    });
    
    //create key/value records
    db.put('Players', "10002", {
        "name": "DeAndre Jordan",
        "team": "Los Angeles Clippers",
        "position": "center",
        "birthdate": "07/21/88",
        "college": "Texas A&M",
        "careerppg": "8.0",
        "careerrpg": "9.0"
    })
    .then(function (result2) {
        console.log("record added");
    });
    
    //create key/value records
    db.put('Players', "10003", {
        "name": "Matt Barnes",
        "team": "Los Angeles Clippers",
        "position": "strong forward",
        "birthdate": "03/09/80",
        "college": "UCLA",
        "careerppg": "8.1",
        "careerrpg": "4.5",
        "teams": [
            "Los Angeles Clippers",
            "Sacramento Kings",
            "Golden State Warriors"
        ]
    })
    .then(function (result3) {
        console.log("record added");
    });
    
    //create event
    db.newEventBuilder()
    .from('Players', '10001')
    .type('gamelog')
    .time(1429531200)
    .data({ "opponent": "San Antonio Spurs", "minutes": "43", "points": "26", "rebounds": "12" })
    .create()
    .then(function (result4) {
        console.log("event added"); 
    });
    
    //create event
    db.newEventBuilder()
    .from('Players', '10001')
    .type('gamelog')
    .time(1429012800)
    .data({ "opponent": "Phoenix Suns", "minutes": "29", "points": "20", "rebounds": "8" })
    .create()
    .then(function (result5) {
        console.log("event added");
    });
    
    //create graph relationship
    db.newGraphBuilder()
    .create()
    .from('Players', '10001')
    .related('currentteammate')
    .to('Players', '10002')
    .then(function (result6) {
        console.log("graph item added");
    });
    
    //create graph relationship
    db.newGraphBuilder()
    .create()
    .from('Players', '10001')
    .related('currentteammate')
    .to('Players', '10003')
    .then(function (result7) {
        console.log("graph item added");
    });
    
    res.send('warmed up');
});

module.exports = router;