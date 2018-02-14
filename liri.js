
///Twitter API Variables 
var Twitter = require("twitter");
var twitterKeys = require("./keys.js");
var twitterClient = new Twitter(twitterKeys);
var twitterParams = {screen_name: 'AliasPsharif', count: "20"};

//Spotify Variables 
var Spotify = require("node-spotify-api");
var spotify = new Spotify({
  id: "78f2d1b95cbb4295903f3f919191d8b4",
  secret: "3c2243e73f4e4947ad29db17ac6dabbb"
});

//OMDB variables including Request
var request = require("request");

//fs File System + read Line Packages
var fs = require("fs");
var readline = require("readline");



///Gets Last 20 tweets and console logs them to the screen 
function myTweets(){
  twitterClient.get('statuses/user_timeline', twitterParams, function(error, tweets, response) {
    if (error) {
      console.log(error);
    }else {
      tweets.forEach(function(el){
        console.log("=====================================================");
        console.log("Tweeted at - ", el.created_at);
      	console.log("Tweet Text - ", el.text);
      	console.log("=====================================================");
      });
    }
  });
}

///Finds a song from Spotify API and console logs info. 
function spotifyThisSong(query){
  spotify.search({ type: 'track', 
                   query: query })
  .then(function(response) {
      var items = response.tracks.items;
      items.forEach(function(item){
        console.log("=====================================================");
        var artists = "";
        item.album.artists.forEach(function(artist){
          artists += artist.name + " ";
        });
        console.log("Artists: ", artists)
        console.log("Album Name: ", item.album.name);
        console.log("Song Name: ", item.name);
        console.log("Preview it at: ", item.preview_url);
        console.log("=====================================================");
      });
  })
  .catch(function(err) {
      console.log(err);
  });
}

///Finds A Movie from OMDB and console logs info. 
function movieThis(query){
  query = typeof query == "undefined" || query == "" ? "Mr. Nobody" : query; 
  var queryUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=40e9cece";
  ///Makes Requests to OMDB to get Movie Data
  request(queryUrl, function(error, response, body) {
  
      // If the request is successful
      if (!error && response.statusCode === 200) {
          var movie = JSON.parse(body);
          console.log("=====================================================");
          console.log("Movie Title: ", movie.Title);
          console.log("Year: ", movie.Year);
          console.log("IMDB Rating: ", movie.Ratings[0].Value); 
          console.log("Rotten Tomatoes: ", movie.Ratings[1].Value); 
          console.log("Production Country: ", movie.Country);
          console.log("Language: ", movie.Language);
          console.log("Plot: ", movie.Plot);
          console.log("Actors: ", movie.Actors);
          console.log("=====================================================");
      }
      else{
        console.log(error);
      }
  });
}

//Uses Read File To Get Commands from text file. 
//Uses lineReader to get line for line. 
//You can use one text file to do multiple commands. 
function doWhatItSays(){
  var lineReader = readline.createInterface({
    input: fs.createReadStream('random.txt')
  })

  lineReader.on("line", function(line){
    if(line !== ""){
      var lineArr = line.split(",");
      var command = lineArr[0];
      var query = lineArr[1];

      switch(command){
        case "my-tweets": 
          myTweets();
          break; 
        case "spotify-this-song": 
          spotifyThisSong(query);
          break; 
        case "movie-this":
          console.log("Movie This was called"); 
          movieThis(query);
          break; 
        default : 
          console.log("I'm sorry we can't do that.");
      }
    }
  });
}

if (process.argv.length > 2){
    //var lineArr = line.split(",");
      var command = process.argv[2];
      var query = process.argv[3];
      console.log(command);
      console.log(query);

      switch(command){
        case "my-tweets": 
          myTweets();
          break; 
        case "spotify-this-song": 
          spotifyThisSong(query);
          break; 
        case "movie-this":
          movieThis(query);
          break; 
        case "do-what-it-says":
          doWhatItSays();
          break;
        default : 
          console.log("I'm sorry we can't do that.");
      }
}
