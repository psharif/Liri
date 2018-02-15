# Liri

Command Line Node App to emulate Siri, that requests information from twitter api, spotify api, and omdb

## Notes About Running liri.js 
 * Enter npm i or npm install to install the necessary packages from NPM
 * Edit random.txt if other commands are desired from file
 * log.txt will appear in directory where liri.js is located

## Ways to run 
 
 You Can enter your commands into the command line along with the node liri.js like so:
 
 ![cli snippet](/README_images/commandLine.png)

 Or You can just run **node liri.js** and you will prompted with inquirer prompts like this: 

  ![inquier prompts](/README_images/Inquirer_Image.png)

## Commands 

 * **spotify-this-song<song_name>** 
   Will print the results for a song name the user inputs into command line or inquirer prompts from spotify API. 

   ![spotify this](/README_images/spotify-this.png)
 * **movie-this<movie_name>** 
	Will print the results for a movie title the user inputs into command line or inquirer prompts from OMDB API. 

	![movie this](/README_images/movie-this.png)
 * my-tweets: 
 	Will print out the last 20 tweets from my alias twitter account using Twitter API.

 	![my tweets](/README_images/my-tweets.png)
 * do-what-it-says
 	Will read a file called random.txt and print execute the commands in the file.
     
## Notes About Using

If the user decides to use the inquirer to run the commands. It will ask the user if they want to enter more commands, but it might show before the results for each command are printed. Just press up or down on the arrow keys and the prompt will show below the printed results.

![keep Going Prompt](/README_images/keepGoingPrompt.png)
