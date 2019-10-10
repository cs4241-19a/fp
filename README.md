# cs4241-FinalProject

Our project: https://fp-ekirschner-agarza.glitch.me/

### Our Team 
Elizabeth Kirschner and Alejandra Garza

## Decription

Since we are bot CS and IMGD double majors, we wanted to make a game that will serve as a portfolio piece using the mini-game engine Perlenspiel, which was created by WPI's very own Professor Brian Moriarty: https://perlenspiel.net/

Our original goal was to created our own version of the Impossible Game: 

![alt text](https://github.com/elizabethkirschner/fp/blob/master/screenshots/impossible_game.gif)

However, as we began implementing our idea, we realized that our game was more similar to T-REX Run: 

***T-Rex Run

![alt text](https://github.com/elizabethkirschner/fp/blob/master/screenshots/dinosaur_game.gif)

***Our Game ( as your score increases, so does the speed of the obstacles!)

![alt text](https://github.com/elizabethkirschner/fp/blob/master/screenshots/our_game.gif)

While the game was important, our biggest goal was to create a project that allowed users to create their own accounts and have their scores saved and placed in a leaderboard, which we were able to accomplish as seen below.

![alt text](https://github.com/elizabethkirschner/fp/blob/master/screenshots/profile_page.PNG)

## Additional Instructions

As mentioned before, our application allows users to either login or sign up, so we heavily encourage you to create your own account so you can keep track of your score!

However, in case anything goes wrong, you can use this account: 
***Username:*** jack
***Password:*** secret

## Technologies Used 
For the server side of the project, we used the following technologies: 
- **lowdb** used to maintain users information including username and password, user scores of every game scoring more than 0 points and a user high score, updated every time the user achieves a new highschore.
- **passport local**  used for authentication 
- **express** used for the server framework

In the front-end side, we used the following resources: 
- **Font**: https://fonts.google.com/specimen/Press+Start+2P?selection.family=Press+Start+2P
- **Buttons (Button6)**: https://fdossena.com/?p=html5cool/buttons/i.frag
- **Our background**: https://giphy.com/gifs/form-background-trapcode-2hgs0P312wdBCOgOAf

And of course, we used Perlenspiel for our game: https://perlenspiel.net/

## Challenges
### Back-End
One of the biggest challenges in the server-side was definitely working with Passport, since it as hard to configure unless used with very specific front end forms.

### Front-End
In the front-end side, we wanted to challenge ourselves to create a "good-looking" website without using any CSS Framework, and we think we were very successful!

![alt text](https://github.com/elizabethkirschner/fp/blob/master/screenshots/login_screen.PNG)

Displaying the leaderboard was definitely one of the biggest challenges since we did not want to display all of the users' infomation. We had to generate a table that would only display the highscores and usernames.

## Work Distribution

***Elizabeth*** took care of the back-end, which includes: user authentication, account creation, managing the score database, etc. She also worked on some areas of the front-end, focusing on the way information was transferred across pages.
For the game, Elizabeth implemented: the random generation of obstacles, jumping, accessing and displaying highscore, and player death.

***Alejandra*** took care of most of the front-end's styling and formattting, as well as displaying the leaderboard and highscore in the user's profile.
For the game, Alejandra implemented the scoring feature, helped with jumping, player death, speed feature, increase in speed based on score feature, and stylizing the game.

## Conclusion
This was definitely a fun challenge for both of us! Since one of us enjoys back-end programming and the other front-end programming, we decided to work together in a project that would allows us to push ourselves in the areas we enjoyed.
While we would have liked to add more to our game (we had a lot of goals, such as different types of obsticles,"stair" mechanic, and sound), we decided it was best to focus on the project's overall functionality and we are really proud of how it turned out!
