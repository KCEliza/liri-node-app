var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var userInput = process.argv[2];



//Function for concert-this
function concert() {
    var artist = process.argv[3];
    var queryUrl = "https://rest.bandsintown.com/artists/" + "the used" + "/events?app_id=codingbootcamp"
    axios.get(queryUrl).then(
        function (response) {
            console.log(response.data);

            var data = response.data
            if(process.argv[3]){
                console.log(`Name of the Venue: ${data.venue[0].name}`)
            }


        })
}

function spotify() {
    axios.get("718d7459ef3246c1a5c07b4410bdc28e").then(
        function (response) {
            console.log(response.data);
        }

    )

}


function movie() {
    var movieTitle = process.argv[3];
    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function (response) {
            console.log(response.data);

            var data = response.data
            if (process.argv[3]) {
                //HOW TO DO A LINE BREAK!!!!!!
                console.log(`Title: ${data.Title}/nYear: ${data.Year}/nIMDB Rating: ${data.imdbRating}/nRotten Tomatoes: ${data.Ratings[1].Value}/nCountry${data.Country}/nLanguage${data.Language}/nPlot: ${data.Plot}`)
            } else {
                movieTitle = "Mr. Nobody";
                console.log(`Title: ${data.Title}/nYear: ${data.Year}/nIMDB Rating: ${data.imdbRating}/nRotten Tomatoes: ${data.Ratings[1].Value}/nCountry${data.Country}/nLanguage${data.Language}/nPlot: ${data.Plot}`)
            }
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
        console.log("Please input 'concert-this', 'spotify-this-song', 'movie-this' or 'do-what-it-says'.")
}