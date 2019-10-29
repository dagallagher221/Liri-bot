
require("dotenv").config();

var fs = require("fs");

var mySpotify = require("./spotify");

var myMovies = require("./movies");

var myConcert = require("./concert");


var userCommand = process.argv[2];

var userInput = process.argv.splice(3, process.argv.length).join(' ');

switch (userCommand) {
    case "help":
        console.log("Use the following commands to utilize LIRI!\n" + " 'concert-this': search for concerts by artist\n" + "'spotify-this-song': search for a song\n" + "'movie-this': search movies\n" + "'do-what-it-says': using command from random.txt\n");
        break;
    case "concert-this":
        myConcert(userInput);
        break;
    case "spotify-this-song":
        mySpotify(userInput);
        break;
    case "movie-this":
        myMovies(userInput);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("LIRI doesn't understand that - Please input 'node liri.js help' for accepted syntax");
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.loge(error);
        }
        var dataArr = data.split(",");

        if (dataArr[0] === "spotify-this-song") {
            var songcheck = dataArr[1].slice(1, -1);
            console.log("Song Check: " + songcheck)
            mySpotify(songcheck)
        } else if (dataArr[0] === "concert-this") {
            var venueName = dataArr[1].slice(1, -1);
            console.log("Venue Name: " + venueName)
            myConcert(venueName);
        } else if (dataArr[0] === "movie-this") {
            var movieName = dataArr[1].slice(1, -1);
            console.log("Movie Name: " + movieName)
            myMovies(movieName);
        }
    });
};