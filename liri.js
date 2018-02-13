var twitterKeys = require("./keys.js");
var Twitter = require("twitter");
var request = require("request");
var twitterKeys = require("./keys.js");

var twitterClient = new Twitter(twitterKeys);

var params = {screen_name: 'AliasPsharif',
			  count: "3"};
twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    tweets.forEach(function(el){
    	console.log(el.text);
    });
  }
});
