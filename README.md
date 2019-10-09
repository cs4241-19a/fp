# cs4241-FinalProject

## Team
* Kent Libby
* Justin Cheng

## General description
This project is based off Dota battle chess. We will create a similar game with the characters being based of warriors from the early 11th century. In this game, the players set up their characters in their respective corners. Once the battle begins the characters will move toward each other and attack. Between rounds players can purchase items and upgrades for their characters. The game is over once a player loses by too large of a collective margin. Unlike dota chess it will be strictly 1 on 1 games.

### Deliverables

__Base Deliverables__:
* 5 Characters with unique capabilites (movements and/or attacks)
* Local multiplayer 
* Accounts for users to track win/loss and recent builds
* Client-side system capable of providing dota chess-esque expierence

__Stretch Goals__:
* Online multiplayer
* Animated Characters
* Additional characters

## User Guide

The game works by buying characters, with resources, placing them on the field, then having them move toward each other to deal damage. The game is played on the same machine, with users sharing the mouse and keyboard. When a players resources drop to 0, that player loses. 
*Note*: player one is the player on the top, and player two is the player on the bottom.

__Buy Round__:

The game starts with player one able to purchase characters. Click on a character to buy it, and it will show up in the top right. Once player one is done purchasing, press `space`, then player two can purchase. Once again, the player can click to buy a character. Once player two is done, press `space` to enter setup. 

__Setup__:

Setup once again begins with player one. To place a character, click on it, then click the grey square to place it there (Player one's squares are on the top and player two's squares are on the bottom). Player one can place as many characters as they want, then press `space`. Then player two can place characters by clicking their characters and clicking a grey square on the bottom to place them. Once a player has placed all the pieces they want they can press `y` and it will be the other player's turn to place. once both players have pressed `y` the fight starts.

__Fight__:

Sit back and enjoy, the characters move toward each other and deal damage when they hit. Once a character's health hits 0, they die and whoever's character's are still standing at the end wins!. The victor takes 5 resources from the loser, and the game returns to the `buy round`

__Winning__:

When a player's resources hit 0, the other player wins, and they can press space to restart!!

## Technical Achievements
* **Interactive sprites**: We made the individual sprites clickable, allowing for a simple and intuitive UI. This was especially challenging as the listeners needed to be added or removed based on game state.
* **Sprites with UI overlays**: Created a system to overlay text on each sprite that changes depending on the state of the game. This also updates automatically with the sprite
* **Object pool optimizations**: Used object pools to store UI text and player pieces to speed up render time.
* **browserify and babel**: Used browserify and babel to minify the js files and make them accessible from more broswers
* **Game engine**: Learned phaser3 with no game development expierence and implemented it for this project.

## Design/Evaluation Achievements
* **HTML and phaser integration**: Used the phaser state machine to update the list of wins and losses at the end.
* **Contrast**: Used high contrast colors to make the game screen more visible
* **Randomized Map**: Used the phaser tileset and map generator to create a randomized map texture for each playthrough.


