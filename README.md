# cs4241-FinalProject: Tiny Tanks

https://a6-tiny-tanks.glitch.me

## General description

This project is an interactive multiplayer game that allows multiple users to access the same server and play against eachother in a a game of Tiny Tanks. This project is a continuation of a previous project iteration, now with more features. Users can now login and change their tank color and username for their specific account. Additionally, users can change the scaling factor of the screen and the turning speed of their tank. We also added 4 new maps that are independently playable within the server. 

Different users can play eachother on different maps, and there should be no limit to how many players can be on a map at a time. 


## Login Information

To login you can use the Username: "matt", and the password "matt". If you then reload the server and log back in, you will see that the tank color and screen name have remained the same. 

## Technologies

For this project, we used multiple different technologies. 
We use socet.io to pass data between the server and the client. This allows us to have as many users join the game as we want.
The game itself is rendered using canvas.
The bullets that the tank shoot are an SVG image.
For the login, we use mongodb as a backend database service. This database keeps track of the users and their game preferences.
Bootstrap is used for CSS design. 



## Challenges

It was challenging to figure out how to implement multiple different maps. When there was only one map, we could easily render all users together and calculate their collisions. However, with multiple maps, we had to find a way to keep track of which user was on which map, and they could not interact with the other users on different maps. We ended up passing the map as a parameter when rendering and calculating collisions, that way we would only render users on the same map and only count collisions for the same map. 

It was also challenging creating the login service. We wanted to have each user account remember certain preferences when they log in. Sending the information to mongodb in a coherent way was tricky, but we eventually found a way to send the tank color and screen name to the database.  

## Authors

Matthew Adiletta - Implemented the Login service using mongodb, added the options to change screen scaling and turning speed.

Alexander Rus - Designed and implemented the four new maps with the correct collisions and rendering mechanics. 

