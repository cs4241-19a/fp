# cs4241-FinalProject
###Michael Bosik###
###Hunter Caouette###
###https://fp-michaelbosik-huntercaouette.glitch.me ###


##Proposal##

Our final project proposal is to create a website utilising the Spotify web API,
to have a user search for an artist or a song, add it to a persistant database,
and to visualize data about the search using the Google Maps API.
The Spotify Web API not only allows us to authenticate a user with their spotify account,
but we can query anything in the Spotify database, including individual songs, artists, albums, etc.
Also, we can access song data including but not limited to: most listened to in countries, song loudness,
artist popularity and information.
We want to try and visualize an artist or songs top 10 countries in the world that they are most listened to
by using the Google Maps API.
Lastly, as an extra feature, we want to try and have the songs queued able to play to the browser and be controlled
by the user.

##Project

1.  Per our proposal, we created a webpage that is capable of querying spotify's song data through the use of their free web API
2. To use our project, you will need to authenticate with Spotify credentials. You can use the mbosik@wpi.edu and a3tempaccount to login.
3. For this project we used a simple express server to support the back end, like we have been using thus far this term. We used lowdb again to store users, song data and the status of the song queue. We used bootstrap as a style base, and made our own modifications to customize it. We also used the spotify api to query data, and the google maps api to plot the data that we retrieved on a map panel.
4. The biggest challenges that we faced in this project were in trying to manage asynchronicity with the large number of requests that we were making to spotify, upon which our next methods were dependent on receiving data from.
5. We largely worked on developing and designing most aspects of the project cooperatively. We used the teletype plugin for Atom to be able to work in the same file at the same time, and reduce the number of meaningless commits.
