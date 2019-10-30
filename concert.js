//Requires keys from keys.js
var keys = require("./keys");
//Requires access to file system
var fs = require("fs");
//Requires axios for the axios calls
var axios = require("axios");
//Requires moment for date/time manipulation
var moment = require('moment');


function myConcert(userInput) {
    var artist = userInput;
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.bandsInTown.id;

    axios.get(url).then(
        function(response) {
            for (var i = 0; i < response.data.length; i++) {
                //Search the bands in town api and find concert data, populate it on screen
                //convert concert time to a readable format via moment
                console.log("Concert Time: " + moment(response.data[i].datetime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY, h:mm A'));
                console.log("Concert Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
                console.log("Concert Venue: " + response.data[i].venue.name);
                console.log("-----------------------------------------");

                //Append data to log.txt
                fs.appendFileSync('log.txt', "\r\n" + "Concert Search Log---------------------------" + "\r\n" + 'utf8');
                fs.appendFileSync('log.txt', "\r\n" + "Venue Name: " + response.data[i].venue.name + "\r\n" + 'utf8');
                fs.appendFileSync('log.txt', "\r\n" + "Venue Locations" + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country + "\r\n" + 'utf8');
                fs.appendFileSync('log.txt', "\r\n" + "Venue Time: " + moment(response.data[i].datetime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY, h:mm A') + "\r\n" + 'utf8' );
                fs.appendFileSync('log.txt', "\r\n" + "---------------------------------------------" + "\r\n" + 'utf8');

            }
        }
    );
};

module.exports = myConcert;