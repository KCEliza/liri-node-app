require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify)
var axios = require("axios");
var fs = require("fs");
var userInput = process.argv[2];
var search = process.argv.slice(3).join("%20");
var display = process.argv.slice(3).join(" ");


//Function for concert-this
function concert(display) {
    console.log(`\n\nUpcoming concerts for ${display}\n\n`);
    axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp").then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            console.log(`Venue: ${response.data[i].venue.name}\nLocation: ${response.data[i].venue.city}, ${response.data[i].venue.region}, ${response.data[i].venue.country}\nDate: ${response.data[i].datetime}\n\n`);
        };
    });
};


function spotifyThis(info) {
    spotify.search({
        type: 'track',
        query: info
        
    },
    function (err, data) {
        if (err) {
            return console.log(err);
        }

        console.log(data.tracks.items[0]);
    }
    ); 
}



function movie() {
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
        console.log(dataArray);

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
                console.log("Please input proper command")
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
        movie();
        break;
    case "do-what-it-says":
        doThis();
        break;
    default:
        console.log("Please input proper command.")
}