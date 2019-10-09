README.md written by Jeffrey Harnois
Brain Earl, Justin Kreiselman, Jeffrey Harnois

#GDC Game list

<p>
    This project was made for the GDC (Game Development Club) in order to have a resource to track and requests games to play by the members.
    This project connects to the Steam account owned by the club and pulls the information for each game and populates a page about it.
    A user is allowed to search the entire Steam library in order to requests games they would like to play.
    The list is compiled using rawg.io and to view the games requested one must log into that website which is connected to our server.
</p>

## About the project

<p>
    There was nothing that we would consider challenging about the projects.
    After finding and implimenting the Rawg.io api, we found that it was much easier to use than attempting to use Mongo to keep track of our games.
    This also provided us with a way to not deal with oAuth and store its own requests in its own server.
</p>

### This website will be up and running on the GDC's server 

<h1> Design and technical achievements </h1>
- Implimented an arcade looking font to fit in with the theme
- Dynamically populated pages with data pulled from steam
- A JavaScript/Steam API that allowed up to access information about our steam account
- Impliments Rawg.io which allows us to store and request games on an external database system for games that were pulled from Steam
- Async functions to optimize picture loading along with information
- Dynamically populated table contianing thumbnails and names when requested to search
- Secret '/admin' directs to rawg.io to login as to not be shown to normal users (or if you forget the website url)
- Embedded a Google contact form as well as a calender for upcoming events reguarding GDC
- All our files are set up in a way that resembles how they have file setups in real software engineering jobs, with overarching folders 

#### Our website will be hosted on the GDC website. However, it is also on glitch at https://jharnois4512-fp-1.glitch.me/
