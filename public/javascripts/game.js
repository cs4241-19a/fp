/*
game.js for Perlenspiel 3.3.x
Last revision: 2018-10-14 (BM)

Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
This version of Perlenspiel (3.3.x) is hosted at <https://ps3.perlenspiel.net>
Perlenspiel is Copyright © 2009-18 Worcester Polytechnic Institute.
This file is part of the standard Perlenspiel 3.3.x devkit distribution.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with the Perlenspiel devkit. If not, see <http://www.gnu.org/licenses/>.
*/

/*
This JavaScript file is a template for creating new Perlenspiel 3.3.x games.
By default, all event-handling function templates are COMMENTED OUT (using block-comment syntax), and are therefore INACTIVE.
Uncomment and add code to the event handlers required by your project.
Any unused event-handling function templates can be safely deleted.
Refer to the tutorials and documentation at <https://ps3.perlenspiel.net> for details.
*/

/*
The following comment lines are for JSHint <https://jshint.com>, a tool for monitoring code quality.
You may find them useful if your development environment is configured to support JSHint.
If you don't use JSHint (or are using it with a configuration file), you can safely delete these lines.
*/

/* jshint browser : true, devel : true, esversion : 5, freeze : true */
/* globals PS : true */

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.init() event handler:

var player_x,
	player_y,
	timer = "",
	jump = false,
	moving1 = false,
	moving2 = false,
	FRAME_COUNT = 0,
	has_UP = false,
	has_DOWN = false,
	player_alive = true,
	waiting2 = false; 
	waiting3 = false 
var up = 0;
var down = 0;
//var moving = false; //for object movement
	

//Objects in Map
var obj1 = {
	name: "obj1",
	color: PS.COLOR_INDIGO,
	x: 0, //GRID_W -1
	y: 0,	//GRID_Y
	length: 1,
	height: 1
}

var obj2 = {
	name: "obj2",
	color: PS.COLOR_ORANGE,
	x: 0, //GRID_W -1
	y: 0,	//GRID_Y
	length: 2,
	height: 1,
}
const GRID_W = 16, GRID_H = 8;

var TIMER = {
	global : 0,
	tick : function() {
		TIMER.global+=1;
		//player jump
		if (jump) {
			//PS.debug("hh\n");
			if(TIMER.global % 30 === 0 && up != 2) {
				moveHelper(1); // move up one pixel
				//PS.debug("move up one\n");
				up+=1;
			}
			else if(TIMER.global % 30 === 0 && up == 2 && down != 2){
				moveHelper(2);
				down+=1;
				//PS.debug("move down one\n");
				if (down == 2) {
					jump = false;
					up = 0;
					down = 0;
				}
			}
		}

		//object 1 movement 
		if (moving1){
			// PS.debug("pos: " + obj1.x + "\n");
			// moving = false;
			if(TIMER.global % 30 === 0 && obj1.x > 1){
				if(obj1.x == player_x && obj1.y == player_y){ //hit player 
					PS.color(obj1.x, player_y, PS.COLOR_RED);
					PS.debug("player is dead");
					moving1 = false;
					player_alive = false; 
				} else {
					PS.color(obj1.x, obj1.y, PS.COLOR_WHITE);//make current one disappear	
					//PS.debug("Current x pos: " + obj1.x + "\n");
					obj1.x -= 1;//move left
					PS.color(obj1.x, obj1.y, obj1.color);//draw new obj
				}
				
			}
			else if( obj1.x === 1 || obj1.x < 0){
				moving1 = false; 
				//make object disappear from board 
				PS.color(obj1.x, obj1.y, PS.COLOR_WHITE);
			}
		}
		//object 2 movement 
		if (moving2){
			// PS.debug("pos: " + obj1.x + "\n");
			// moving = false;
			if(TIMER.global % 30 === 0 && obj2.x > 1){
				if(obj2.x == player_x && obj2.y == player_y){ //hit player 
					PS.color(obj2.x, player_y, PS.COLOR_RED);
					PS.debug("player is dead");
					moving2 = false;
					player_alive = false; 
				} else {
					PS.color(obj2.x, obj2.y, PS.COLOR_WHITE);//make current one disappear	
					//PS.debug("Current x pos: " + obj1.x + "\n");
					obj2.x -= 1;//move left
					PS.color(obj2.x, obj2.y, obj2.color);//draw new obj
				}
			}
			else if( obj2.x === 1 || obj2.x < 0){
				moving2 = false; 
				//make object disappear from board 
				PS.color(obj2.x, obj2.y, PS.COLOR_WHITE);
			}
		}
		
		//wait until obj2 reaches middle of board 
		if(waiting3){
			if(obj2.x < GRID_W/2){ //once it has reached half of board
				waiting3 = false; 
			}
		}
		//wait until obj3 reaches middle of board 
		if(waiting2){
			if(obj1.x < GRID_W/2){ //once it has reached half of board
				waiting2 = false; 
			}
		}
	}
}

PS.init = function( system, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line
	// to verify operation:

	// PS.debug( "PS.init() called\n" );

	// This function should normally begin
	// with a call to PS.gridSize( x, y )
	// where x and y are the desired initial
	// dimensions of the grid.
	// Call PS.gridSize() FIRST to avoid problems!
	// The sample call below sets the grid to the
	// default dimensions (8 x 8).
	// Uncomment the following code line and change
	// the x and y parameters as needed.

	PS.gridSize( GRID_W, GRID_H );
	PS.border(PS.ALL,PS.ALL,0);
	PS.gridColor(PS.COLOR_WHITE);

	player_x = GRID_W/4;
	player_y = GRID_H - 3;

	PS.color(player_x,player_y,PS.COLOR_BLACK);
	timer = PS.timerStart(1, TIMER.tick);
	
	startMap(); //start generating map objects 
	//wait a bit before the map starts moving 
	/*TIMER.global = 0 
	while(true){
		if(TIMER.global % 400 == 0){
			startMap();
			break;
		}
	}
	*/

	// This is also a good place to display
	// your game title or a welcome message
	// in the status line above the grid.
	// Uncomment the following code line and
	// change the string parameter as needed.

	// PS.statusText( "Game" );

	// Add any other initialization code you need here.
};

var startMap = function(){
	var previous = 0; //object in front of the one that has just been called
	var next;
	//make sure objects on board are not on top of each other 
	waiting2 = false; 
	waiting3 = false;

	if(player_alive){
		if(!waiting2 && !waiting3){
			next = PS.random(3)+1;

			next = PS.random(3) + 1; //random number between 2 - 4
			if (next == 2){ //load object 1 
				PS.debug(next + '\n');
				if(previous === 0){ //we are first object in board
					previous = 2; //obj1 is now on board
					//PS.debug(next + '\n');//print random number
					TIMER.global = 0;
					//render object
					obj1.x= GRID_W -1; 
					obj1.y = GRID_H -3; 
					PS.color(obj1.x, obj1.y, obj1.color);
					PS.debug( "Was rendered once\n");
					
					moving1 = true; 
				
				}	else if (previous === 3){ //obj2 is on board
					PS.debug("Previous was 3 and 2 was called\n");
					previous = 2; //obj1 is now on board 
					//wait until obj2 had reached half of board 
					waiting3 = true; 
					// while(waiting3){
					// 	PS.debug("Waiting for obj2 \n");
					// }
					if(!waiting3){ //we can enter board
						PS.debug("waiting3 was " + waiting3 + "\n");
						//render obj1
						//PS.debug(next + '\n');//print random number
						TIMER.global = 0;
						//render object
						obj1.x= GRID_W -1; 
						obj1.y = GRID_H -3; 
						PS.color(obj1.x, obj1.y, obj1.color);
						PS.debug( "Was rendered once\n");
						
						moving1 = true;
					}
					
					
				} else if( previous === 2){
					PS.debug("previous is 2\n");
				}
			
				//else if(previous === 2){ ///another obj1 on borad
				// 	//wait until obj1 has left board
				// 	while(obj1.x > 1){
				// 		PS.debug("Waiting for " + obj1.x + " to reach" + 1 + "\n");
				// 	}
				// 	//render obj1
				// 	PS.debug(next + '\n');//print random number
				// 	TIMER.global = 0;
				// 	//render object
				// 	obj1.x= GRID_W -1; 
				// 	obj1.y = GRID_H -3; 
				// 	PS.color(obj1.x, obj1.y, obj1.color);
				// 	PS.debug( "Was rendered once\n");
					
				// 	moving1 = true;
				// 	previous = 2; //obj1 is now on board	
				//} //there shouldn't be a need for an else statement

				//move it left
				// while(obj1.x > GRID_W/2){
				// 	PS.color(obj1.x, obj1.y, obj1.color); //draw new obj
				// 	obj1.x -= 1; //move left
				// }
				
			} else if(next == 3){
				PS.debug(next + '\n');
				if(previous === 0){ //we are first object in board
					previous = 3; //obj2 is now on board
					//PS.debug(next + '\n');//print random number
					TIMER.global = 0;
					//render object
					obj2.x= GRID_W -1; 
					obj2.y = GRID_H -3; 
					PS.color(obj2.x, obj2.y, obj2.color);
					PS.debug( "Was rendered once\n");
					
					moving2 = true; 
				
				}	else if (previous === 2){ //obj2 is on board
					PS.debug("Previous was 2 and 3 was called\n");
					previous = 3; //obj1 is now on board 
					//wait until obj2 had reached half of board 
					waiting2 = true; 
					// while(waiting2){
					// 	PS.debug("Waiting for obj1 \n");
					// }
					if(!waiting2){ //we can enter board
						PS.debug("waiting2 was " + waiting2 + "\n");
						//render obj1
						//PS.debug(next + '\n');//print random number
						TIMER.global = 0;
						//render object
						obj2.x= GRID_W -1; 
						obj2.y = GRID_H -3; 
						PS.color(obj2.x, obj2.y, obj2.color);
						PS.debug( "Was rendered once\n");
						
						moving2 = true;
					}
					
					
				} else if( previous === 3){
					PS.debug("previous is 3\n");
				}
					
				//  else if (previous === 3){ //obj2 is on board
				// 	previous = 2; //obj1 is now on board 
				// 	//wait until obj2 had reached half of board 
				// 	// while(obj2.x > GRID_W/2){
				// 	// 	PS.debug("Waiting for " + obj2.x + " to reach" + GRID_W/2 + "\n");
				// 	// }
				// 	//render obj1
				// 	//PS.debug(next + '\n');//print random number
				// 	TIMER.global = 0;
				// 	//render object
				// 	obj1.x= GRID_W -1; 
				// 	obj1.y = GRID_H -3; 
				// 	PS.color(obj1.x, obj1.y, obj1.color);
				// 	PS.debug( "Was rendered once\n");
					
				// 	moving1 = true;
					
				//  } else if( previous === 2){
				// 	PS.debug("previous is 2\n");
				//  }
				
			} else  if(next == 4){
				PS.debug(next + '\n'); //print random number
				//player_alive = false; 
			}
		}
	}
	
	// for(var i = 0; i < 4; i++){
	// 	next = PS.random(3) + 1;
	
	// 	PS.debug(next + "\n");
	// }

}


/*
PS.touch ( x, y, data, options )
Called when the left mouse button is clicked over bead(x, y), or when bead(x, y) is touched.
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.touch() event handler:

/*

PS.touch = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line
	// to inspect x/y parameters:

	// PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );

	// Add code here for mouse clicks/touches
	// over a bead.
};

*/

/*
PS.release ( x, y, data, options )
Called when the left mouse button is released, or when a touch is lifted, over bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.release() event handler:

/*

PS.release = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead.
};

*/

/*
PS.enter ( x, y, button, data, options )
Called when the mouse cursor/touch enters bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.enter() event handler:

/*

PS.enter = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead.
};

*/

/*
PS.exit ( x, y, data, options )
Called when the mouse cursor/touch exits bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.exit() event handler:

/*

PS.exit = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead.
};

*/

/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.exitGrid() event handler:

/*

PS.exitGrid = function( options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to verify operation:

	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid.
};

*/

/*
PS.keyDown ( key, shift, ctrl, options )
Called when a key on the keyboard is pressed.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.keyDown() event handler:

//helper function for move player
var moveHelper = function(direction){
	//PS.debug("MoveHelper was called\n");
	if(direction === 1){
		//make current spot white 
		PS.color(player_x, player_y, PS.COLOR_WHITE);
		//decrease y position 
		player_y -= 1;
		//color new square 
		 PS.color(player_x, player_y, PS.COLOR_BLACK);

	} else if (direction === 2){
		//make current spot white 
		PS.color(player_x, player_y, PS.COLOR_WHITE);
		//increase y position 
		player_y += 1;
		//color new square 
	 	PS.color(player_x, player_y, PS.COLOR_BLACK);
	}
}


PS.keyDown = function( key, shift, ctrl, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect first three parameters:

	//PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	switch (key) {
		case 32:
			// if(player_alive){
			// 	jump = true;
			// } else {
			// 	PS.debug("Cannot jump, player is dead");
			// }
			jump = true;
			break;
	}
	// Add code here for when a key is pressed.
};



/*
PS.keyUp ( key, shift, ctrl, options )
Called when a key on the keyboard is released.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.keyUp() event handler:

/*

PS.keyUp = function( key, shift, ctrl, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is released.
};

*/

/*
PS.input ( sensors, options )
Called when a supported input device event (other than those above) is detected.
This function doesn't have to do anything. Any value returned is ignored.
[sensors : Object] = A JavaScript object with properties indicating sensor status; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: Currently, only mouse wheel events are reported, and only when the mouse cursor is positioned directly over the grid.
*/

// UNCOMMENT the following code BLOCK to expose the PS.input() event handler:

/*

PS.input = function( sensors, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code lines to inspect first parameter:

//	 var device = sensors.wheel; // check for scroll wheel
//
//	 if ( device ) {
//	   PS.debug( "PS.input(): " + device + "\n" );
//	 }

	// Add code here for when an input event is detected.
};

*/

/*
PS.shutdown ( options )
Called when the browser window running Perlenspiel is about to close.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: This event is generally needed only by applications utilizing networked telemetry.
*/

// UNCOMMENT the following code BLOCK to expose the PS.shutdown() event handler:

/*

PS.shutdown = function( options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to verify operation:

	// PS.debug( "“Dave. My mind is going. I can feel it.”\n" );

	// Add code here to tidy up when Perlenspiel is about to close.
};

*/
