
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

//Inquirer Package to Get User Input
var inquirer = require("inquirer");

//Saves Commands to Log File
var commands = "";


///Gets Last 20 tweets and console logs them to the screen 
function myTweets(){
  commands += "Command used: myTweets\n"; 
  
  twitterClient.get('statuses/user_timeline', twitterParams, function(error, tweets, response) {
    if (error) {
      console.log(error);
    }else {
      var data = commands;
      tweets.forEach(function(el){
        data += ""  
        +"====================================================="
        + "\nTweeted at - " + el.created_at
      	+ "\nTweet Text - " + el.text
      	+ "\n=====================================================\n";
      });
      console.log(data);
      logData(data);
      commands = "";
    }
  });
}

///Finds a song from Spotify API and console logs info. 
function spotifyThisSong(query){
  spotify.search({ type: 'track', 
                   query: query })
  .then(function(response) {
      commands += "Command used: spotify-this-song " + query + "\n"; 
      var data = commands;
      var items = response.tracks.items;
      
      items.forEach(function(item){
        var artists = "";
        item.album.artists.forEach(function(artist){
          artists += artist.name + " ";
        });
        
        data += "" 
          + "====================================================="
          + "\nArtists: " + artists
          + "\nAlbum Name: " + item.album.name
          + "\nSong Name: " + item.name 
          + "\nPreview it at: " + item.preview_url 
          + "\n=====================================================\n";
          
      });
       console.log(data);
       logData(data);
       commands = "";
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
          commands += "Command used: movie-this " + query + "\n";
          var data = commands 
          + "====================================================="
          + "\nMovie Title: " + movie.Title
          + "\nYear: " + movie.Year
          + "\nIMDB Rating: " + movie.Ratings[0].Value 
          + "\nRotten Tomatoes: " + movie.Ratings[1].Value 
          + "\nProduction Country: " + movie.Country
          + "\nLanguage: " + movie.Language
          + "\nPlot: " + movie.Plot
          + "\nActors: " + movie.Actors
          + "\n=====================================================\n";
          
          console.log(data);
          logData(data);  
          commands = "";
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
  commands += "Command used: do-what-it-says\n"
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
          movieThis(query);
          break; 
        default : 
          console.log("I'm sorry we can't do that.");
      }
    }
  });
}

function logData(data){
  fs.appendFile('log.txt', data, function(err){
    if (err){
      console.log(err);
    }
  });
}

//If the user chose spotify-this-song or movie-this they need to enter 
//A movie title or song name. Prompt them for it. 
//Then use .call to call either spotifyThisSong or movieThis with the users answer.
function getQuery(query, commandFunction){
   inquirer.prompt([
    {
      type: "input", 
      message:"Enter the " + query + " your searching for: ", 
      name: "getQuery"
    }
  ]).then(function(answers) {
    if (answers.getQuery !==""){
      commandFunction.call(this, answers.getQuery);
    }
  });
}

///Checks If the user entered other arguments into the command Line 
///If they did execute the command. Othwerwise Go to Inquirer
if (process.argv.length > 2){
      var command = process.argv[2];
      var query = "";
      //Creates a query based on all arguments passed in last argument 
      //Doesn't need a space added.
      for(var i =3; i < process.argv.length-1; i++){
        query += process.argv[i] + " "; 
      }
      query += process.argv[process.argv.length-1];

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
else{
  inquirer.prompt([
    {
      type: "list", 
      message:"Choose A Command To to Execute\n", 
      choices:["my-tweets: Shows My Last 20 tweets", 
               "spotify-this-song: Prints info about a song from spotify must enter song name", 
               "movie-this: Prints info about a movie, must enter movie title", 
               "do-what-it-says: Reads from a file called random.txt and executes commands"
              ],
      name: "commandPrompt"
    }
  ]).then(function(answers) {
    switch(answers.commandPrompt){
      case "my-tweets: Shows My Last 20 tweets": 
        myTweets();
        break; 
      case "spotify-this-song: Prints info about a song from spotify must enter song name": 
        getQuery("song name", spotifyThisSong);
        break; 
      case "movie-this: Prints info about a movie, must enter movie title":
        getQuery("movie title", movieThis);
        break; 
      case "do-what-it-says: Reads from a file called random.txt and executes commands":
        doWhatItSays();
        break;
      default : 
        console.log("I'm sorry we can't do that.");
    }
  });
}
