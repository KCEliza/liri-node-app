require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify)
var axios = require("axios");
var fs = require("fs");
var userInput = process.argv[2];
var search = process.argv.slice(3).join("%20");
var display = process.argv.slice(3).join(" ");
var moment = require('moment');



//Function for concert-this
function concert(display) {
    console.log(`\n\nTour dates for: ${display}\n\n`);
    axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp").then(function (response) {
        
        for (var i = 0; i < response.data.length; i++) {
                var date = moment(response.data[i].datetime).format("MM/DD/YYYY");
            console.log(`Venue: ${response.data[i].venue.name}\nLocation: ${response.data[i].venue.city}, ${response.data[i].venue.region}, ${date}\n\n`);
        };
    });
};

// Function for spotify-this-song
function spotifyThis(info) {
    if (!info) {
        info = "the sign"
    }

    spotify.search({
            type: 'track',
            query: info

        },
        function (err, data) {
            if (err) {
                return console.log(err);
            }
            var dataRetrievel = data.tracks;

            for (var i = 0; i < dataRetrievel.items.length; i++) {
                console.log(`Song Artist: ${dataRetrievel.items[i].artists[0].name}\nSong Title: ${dataRetrievel.items[i].name}\nAlbum Title: ${dataRetrievel.items[i].album.name}\nLink: ${dataRetrievel.items[i].external_urls.spotify}\n\n`)
            }

        }
    );
}


// Function for the movie-this
function movie(movie) {
    var movie = process.argv.slice(3).join("+") || "Mr.+Nobody";
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            var data = response.data;
            console.log(`Title: ${data.Title}\nYear: ${data.Year}\nIMDB Rating: ${data.imdbRating}\nRotten Tomatoes: ${data.Ratings[1].Value}\nCountry: ${data.Country}\nLanguage: ${data.Language}\nPlot: ${data.Plot}`);
        })
}

//Function for do-what-it-says
function doThis() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        var dataArray = data.split(", ");
        var action = dataArray[0];
        var search = dataArray[1];

        switch (action) {
            case "spotify-this-song":
                spotifyThis(search);
                break;
            case "concert-this":
                concert(search);
                break;
            case "movie-this":
                movie(search);
                break;
            default:
                spotifyThis("I want it that way")
        }
    })

}

switch (userInput) {
    case "concert-this":
        concert(display);
        break;
    case "spotify-this-song":
        spotifyThis(display);
        break;
    case "movie-this":
        movie(display);
        break;
    case "do-what-it-says":
        doThis();
        break;
    default:
        console.log("Please input proper command.")
}