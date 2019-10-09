---

## Tiny Tanks Game

http://a4-mjadiletta.glitch.me 

#### Goal
The goal of this code is to allow multiple users to play against each other in an IO environment. This uses canvas, arrow keys, q key, mouse, and spacebar.  The specific IO game for this application is tiny tanks. 
The tiny tank application has tanks that can shoot bullets, steer left and right, and drive forward and backwards. Users score points by shooting other players. 

#### Challenges
Note: I did not create the code to allow multiple users to log into the server and be rendered at the same time. I used a base code that allowed for simple IO applications where two or more people can connect to
a page and have an image displayed on the game canvas. 
1. Removing functionality from base code so I could implement my own game design. 
2. Rendering a user and make it move using the input keys. 
3. Adding bullets that shoot from the center of the user. 
4. Preventing the user and bullets not travel off the screen.
5. Adding obstacles 
6. Preventing users and bullets from traveling through obsticles - wrote own collision scripts that use 2D axis intercepts and comparisions to do angled obstacles
7. Rendering all these things simultaneously.
8. Major challenges with the screen, leaderboard, instructions, and healthbar... etc.
9. For some reason most keyboards don't let a user use the left, up and spacebar at the same time. This is a limitation for this code. In the future I will use a different set of keys for controls.

#### JS Linter Used
I used eslint which is for the commandline. I installed it and run eslint --fix ./* which automaticlly fixes all problems according to the linter. The default for this linter is pretty simple. 
Basic examples: 
1. if (this || this) { } else { } 
2. function name(this) { }
3. this.x = x;
The only errors left are cammelcase errors and tab errors becasuse notepad++ is super weird about tabs vs spaces. 

## Technical Achievements
- **IO Video Game**This is the primary technical achievement for this project. Multiple users can log in and battle each other. I used an IO package to do this, however designing the paths to pass data for all people concurrently
was very difficult. Creating the correct objects in the correct locations at the correct times with no lag was incredibly difficult. I also wanted to take user input consistantly without missing any commands and signaling to the 
server in an appropriate amount of time to update the screen. 
- **Object Collision Detection**: The collision detection for this game uses no libraries. I wrote the code that renders all the images and how they interact. I wrote functions using linear algebra to detect if a bullet or person 
is going off the screen or hitting another object. This was very difficult. Check out the code in player.js, obstacle.js, and collisions.js. These three files all contain collision detection scripts. 
- **Preventing User from Starting on Obstacle**: One big problem with initially loading the game is the fear of rendering the new user on top of an obstacle, thus making the user unable to move. I prevented this through technical means. 
- **Heirarchy of JS files that pass data from server to client and back**: I created a method based on the example IO game for passing data back and forth between the server and the client. Each user has a serialize function that
seralizes the users information and passes it from the server to the client. Then the server and the client share message notes to identify the type of message: update, new user, game over.

### Design Achievements
- **IO Video Game**: This is a major design achievement. I created a "renderer" that interacts with the server via updates to render svg's and pngs on the screen in correct locations based on x, y, and orientation. Very difficult
from a design perspective.
- **SVG**: The bullet is an SVG image that moves around the screen. Since the project for me was canvas, using the svg is a design achievement
- **User Select Tank**: I created a bunch of PNG files for different tanks that a user can select from.
- **User Login**: There is a user login for a user to select a username before joining the game.
- **Uses Bootstrap for CSS**: Just like in the last project, I used Bootstrap for css styling in most cases. This is great for quick style. 
