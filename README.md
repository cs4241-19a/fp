### CS4241 Final Project

**Description**  
We created a jumping character game where the user can select one of two characters to control and the goal is to avoid obstacles. Our game features login authentication and a leadership board.
Our project can be accessed at https://fp-noblekalish-cbennet-kadonie.glitch.me

**Additional Instructions**  
To play the game, the user will need to create an account. Simply choose any username and password and use them to login. Then follow the instructions on the screen to play.

**Technological Achievements**  
- node js server: made a server using express
- express middleware packages: used many packages, including helmet and compression
- gulp: made a gulpfile as a pipeline for managing front-end tasks
- css: embedded style into html views
- pixi js: used pixi to render sprites
- passport local strategy: used local strategy middleware package to let users create accounts

**Challenges**  
What challenges you faced in completing the project.
- getting passport authentication to work with multiple html views and adding user accounts to database was tricky
- if you selected a character twice it would have two timers
- making game scene borders was tricky with the sprite images
- embedding background image
- we were going to use heroku but because none of us had figured out how to use it by the final project we decided to go with glitch and used pouchdb database instead of heroku's sql integration

**Work Distribution**
- Noble: Set up project with node js server and gulp pipeline; created leadership board; added CSS design to the scenes; set up pouchdb database
- Cooper: Created movable sprites that interact with each other; set up background images and game borders; set up game timer
- Kristen: Created login and sign up pages with passport authentication; set up sessions with user accounts added to pouchdb database