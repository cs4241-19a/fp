# cs4241-FinalProject - Music App
Team Members: Randy Agudelo, René Borner, Caitlin Enright, Elie Hess

## 1. A brief description of what you created, and a link to the project itself.

Glitch: https://cs4241-best-group-fp-7.glitch.me/ <br>
Youtube video: https://youtu.be/rDX6Nd-vVTE <br>

We created a song recomendation sharing applications. Each user has their own account. When they sign in they see a feed of all song recomendations made. Song recomendations include the user who made it, the song name and artist, a comment about the song and a rating from 0-5 stars. Users can also add their on rating to the feed by used the bar on the left side of the page. They can search for any song on spotify using the seach bar and add their comment and rating. There is a song player at the top of the feed that allows the currently playing song to be paused or played. It also displays the album cover. When the song is playing there is a 3d vsualization in the background of the app that is in time with the current song. The album cover also spins like a record player. Any of the songs in the feed can be selected and then become the currently playing song. This allows users to hear the songs that they are reading recomentdations about.

## 2. Any additional instructions that might be needed to fully use your project (login information etc.)
In order to see the animation and hear the songs playing, you need to authorize a spotify premium account. 


## 3. An outline of the technologies you used and how you used them.
- Spotify API’s: we used these API’s to allow the songs to be played through the app. It also let the user search for a certain track using the name. Information given by the api about the track’s beats and tempo helped to create the visualization in the background.
- Bootstrap: we used this for all of the layout and styling of the page to give the app a more cohesive look
- Three.js: This was used to create the 3-d background. The visual moves along with the beats of the currently playing song
- MongoDB: This was used for the database which stores the user login information as well as all of the recommendations (maybe write about password hashing & salting with bcrypt)
- jQuery: JQuery was used to help with onclick functionality and passing data

## 4. What challenges you faced in completing the project.
The spotify api does not return an mp3 file so making the 3d visualizations based off of numerical data was difficult
We had problems working with the spotify Web API because of the authorization process and the many possible routes etc
Certain bootstrap elements had preset values that were confusing to understand and difficult to work around.

## 5. What each group member was responsible for designing / developing.

Caitlin Enright:
- Created basic homepage layout
- Worked on search functionality and interactable table
- Created recommendation form
- Made UI changes about color, layout, spacing
- Helped set spotify player to current track
- Play/Pause button changes

Elie Hess
- Created main recommendation feed
- Made client-side functions to add and retrieve recommendations to/from MongoDB
- Created the current star rating system
- Tweaked UI to look cleaner
- Worked on code cleanup, optimization
- Managed Git repo

Randy Agudelo:
- Registered Spotify application to be able to work with the premium Spotify users
- Initialized the server 
- Worked on the server and backend to authorize the user through Spotify to gain access to their account
- Created different paths on the server to get specific Spotify Info
- Created an audio visualizer in the background 
- Helped with some of the error handling 
 
René Borner:
- MongoDB setup with authentification and recommendation functionality and backend routes
- Backend and frontend connection for different functionalities like getting the spotify token in the frontend
- Round and turning song cover image
- Worked on spotify player with track number
- Worked on search functionality
- Worked on star rating

 
