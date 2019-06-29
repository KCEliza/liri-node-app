var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var userInput = process.argv[2];
var searchConcert = process.argv.slice(3).join("%20");
var display = process.argv.slice(3).join(" ");



//Function for concert-this
function concert() {
    console.log(`\n\nUpcoming concerts for ${display}\n\n`);
    axios.get("https://rest.bandsintown.com/artists/" + searchConcert + "/events?app_id=codingbootcamp").then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            console.log(`Venue: ${response.data[i].venue.name}\nLocation: ${response.data[i].venue.city}, ${response.data[i].venue.region}, ${response.data[i].venue.country}\nDate: ${response.data[i].datetime}\n\n`);
        };
    });
};



function spotify() {
    axios.get("718d7459ef3246c1a5c07b4410bdc28e").then(
        function (response) {
            console.log(response.data);
        }
    )
}


function movie() {
    var movie = process.argv.slice(3).join("+") || "Mr.+Nobody";
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            // console.log(response.data);
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
        console.log(dataArray);
    })
}

switch (userInput) {
    case "concert-this":
        concert();
        break;
    case "spotify-this-song":
        spotify();
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