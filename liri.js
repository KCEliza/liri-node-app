var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var userInput = process.argv[2];



//Function for concert-this
function concert() {
    var concert = process.argv.slice(3).join("+");
    var queryUrl = "https://rest.bandsintown.com/artists/" + concert + "/events?app_id=codingbootcamp"
    axios.get(queryUrl).then(
        function (response) {
            console.log(response.data);
            var data = response.data
            if(concert){
                console.log(`Name of the Venue: ${data.offers[2]} Venue Location: ${data.offers[5]}, ${data.offers[3]} Data: ${data.offers[8]}`)
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