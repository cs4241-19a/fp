README.md written by Jeffrey Harnois\
Edited by Jusitn Kreiselman\
Project created by Brain Earl, Jeffrey Harnois, and Justin Kreiselman 

#GDC Game Catalog
## About the project
<p>
    This project was made for the Game Development Club (GDC) in order to have a resource to track its current library of games and
    to request games to play by its members. This project connects to the Steam and Playstation accounts owned by the club and pulls
    the information for each game and populates a page about it. A user is allowed to search the GDC's library in order to request
    games they would like to play at GDC events. Users can also search for games using the rawg.io database to request games to
    purchase for the club. The lists are compiled using rawg.io and its database of video games. To view the games requested a GDC
    Executive member must log into that website which is connected to our server via the /admin path.
    
   To access the submitted requests, the GDC Executives will be able to log into the rawg.io account and go to the wish list section of the account.
   For non Executive members, you can see the requests by going to rawg.io, search for wpi and selecting the wpi-gdc player.
   You can then navigate to the wishlist section to see the games requested via the website.
</p>



 ##Challenges
<p>
    One challenge we faced was the thought of how are we going to manage and display our data.
    Our initial thought was to give each game its own webpage, but we found that to be tedious
    due to the amount of games in the collection. The next idea was to create a mongodb database
    of just the game's titles and have users fill out a form to request games. Then we found an
    amazing tool: the rawg.io database. The rawg.io databse is the largest database of video
    games. This databse provided us a large collection of game information and an API to
    connect to the database. After finding and implimenting the Rawg.io api, we found
    that it was much easier to use than attempting to use Mongo to keep track of our games.
    This also allowed us to display a list of new games to request rather than have users submit games via a form.
    This also provided us with a way to not deal with oAuth and store its own requests in its own server.
    
   Another challenge we came across was presenting the game information. We didn't want to have a separate webpage 
   for each game, so we wanted to come up with a template that could be filled in with the information form 
   the database. We were able to create a template that is filled in with information; however, this did not work for both
   the catalog and the request pages. We were able to get it to work for the catalog webpage but the request pages were
   unable to work with the template. As a temporary solution we have it that users cannot click on the games to see more info
   when requesting a game. We are not sure as to why this happens but we hope to get this fixed down the line.
</p>

### This website will be up and running on the GDC's server 

<h1> Design and technical achievements </h1>
-
- Implemented an arcade looking font to fit in with the theme.
- Dynamically populated pages with data pulled from rawg.io.
- Impliments Rawg.io which allows us to store and request games on an external database system for Video Games.
- Async functions to optimize picture loading along with information.
- Dynamically populated table containing thumbnails and names of games when requested to search.
- Secret '/admin' directs to rawg.io to login as to not be shown to normal users (or if you forget the website url).
- Embedded a Google contact form as well as a Google calendar for upcoming events of the GDC.
- All our files are set up in a way that resembles how they have file setups in real software engineering jobs, with overarching folders.

###Who did what
- Brian Earl: Worked on Server.js, catalog.html and request.html.
- Jeffrey Harnois: Worked on Server.js and CSS.
- Justin Kreiselman: Worked on index.html and CSS.

#### Our website will be hosted on the GDC's website. However, it is also on glitch at https://jharnois4512-fp-1.glitch.me/
