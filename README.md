# cs4241-FinalProject

## Team Members
- Daniel Duff
- Timothy Winters
- Andrew Levy

**Codenames**
For our Final Project, we implemented a multiplayer game called "Codenames", an electronic version of a fun and collaborative card game.
(rules can be found here: https://czechgames.com/files/rules/codenames-rules-en.pdf).

Using JavaScript's Socket.io and Socket.io-client libraries we were able to create an application that communicates with a Node.js server, 
and updates client real-time. This was mainly used for implementing a constant game state (and storing that information on the server), 
as well as updating player's turn order. Maintaining game state, as well as ensuring it was consistent among multiple clients (as well as
updating that information real-time) was very challenging, as it was something none of us had any prior experience with. Ensuring 
all socket information was kept up-to-date in addition to random board setup generation was a task which we struggled with tackling at first,
however we were able to overcome our difficulties!

**How To Run**
We were unable to place the game on a remote client due to socketing conflicts. In the future we're hoping to get this to work so that people can play our game online. The game can be run by running npm intall and then npm start in the app package.json directory. After running these commands the application can be accessed via localhost:3000 in a browser. Multiple tabs can count as multiple players (for testing purposes) as long as they are connected to localhost:3000 as well.


## This project features:
- A React.js front-end framework that dynamically renders DOM elements for players.
- Modularization in the implementation of the React.js frontend. 
- Useage of the Socket.io and Socket.io-client libraries to maintain game state and interact with React components. 
- A simple Node.js database which maintains game state, as well as storing card, socket, and player information. 
- CSS Stylesheets that are dynamically implemented into Javascript Components.
- State manipulation and 'locking' of user input when it's not their turn (as well as 'unlocking' on the correct turn).
- Codename's base logic ruleset.
- Elements of the game which are meant to be hidden from players cannot be seen or accessed via the browser directly 
(thus preventing cheating by inspecting the page's HTML).

This project was a very collaborative effort, as multiple members did multiple tasks.
- Creation and Manipulation of React.js framework: Andrew, Tim.
- CSS Styling, images, and additional help menu: Andrew
- Creation of Socket Communication: Daniel, Tim.
- Creation of Backend Node.js and Socket.io setup: Daniel.
- Refactoring and State Manipulation (as well as hiding game elements from browser's DOM lookup): Tim.
