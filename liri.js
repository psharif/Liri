
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
var movieTitle = "";
var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=40e9cece";

///Gets Last 20 tweets and console logs them to the screen 
function getTweets(){
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

function findSong(query){
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

function findMovie(query){
  movieTitle = query;
  ///Makes Requests to OMDB to get Movie Data
  request(queryUrl, function(error, response, body) {
  
      // If the request is successful
      if (!error && response.statusCode === 200) {
  
          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
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

findMovie("Garfield");