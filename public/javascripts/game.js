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

*/

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

var player_x,
	player_y,
	timer = "",
	jump = false,
	FRAME_COUNT = 0,

	isRed = false
var up = 0;
var down = 0;
var once = false;

var score = 0;
var highscore = 0;
var player_speed = 9;
var enemy_speed = 14;

var enemy;
var enemy_x, enemy_y;
var enemy_width = 0;


var player;
var isAlive = true;
var canMove = true;
var touching = false;
var first = true;	

const GRID_W = 16, GRID_H = 8;

var TIMER = {
	global : 0,
	tick : function() {
		if (!isAlive) { return }
		TIMER.global+=1;

		// enemy move
		if (TIMER.global % enemy_speed == 0) {
			touching = false
			enemy_x -= 1
			PS.spriteMove(enemy, enemy_x, enemy_y)
			if (enemy_x + enemy_width == 0) {
				PS.spriteDelete(enemy)
				increaseScore();
				newEnemy()
			}
		}

		// player move up
		if (jump && TIMER.global % player_speed === 0 && up != 2) {
			player_y -= 1;
			PS.spriteMove(player, player_x, player_y);
			up+=1;
			if (up == 2) { jump = false }
		}  //player move down
		else if (TIMER.global % player_speed == 0 && player_y < 6 && up == 2 && !touching) {
			player_y += 1;
			PS.spriteMove(player,player_x,player_y)
			if (player_y == 6) { up = 0 }
		} 
		
		// kill player
		if (player_x == enemy_x && player_y == enemy_y) {
			if ( score > 0 ) {

				var json = {'score': score },
					body = JSON.stringify( json );

				fetch('/scores', {
					method: 'POST',
					body,
					headers: {'Content-Type':'application/json'}
				}).then(function( response ){
					console.log( response )
					return response.json()
				}).then(function( json ){
					if (json.condition == 1) {
						PS.statusText("NEW HIGH SCORE!! PRESS SPACE TO PLAY AGAIN")
						isAlive = false;
						score = 0;
						player_speed = 11;
						enemy_speed = 16;
					}
					else {
						isAlive = false;
						score = 0;
						player_speed = 11;
						enemy_speed = 16;
						PS.statusText( "Game over, press space to try again" );
					}
				});
			}
			else {
				isAlive = false;
				score = 0;
				player_speed = 11;
				enemy_speed = 16;
				PS.statusText( "Game over, press space to try again" );
			}
		}

		//increase speed
		if(score % 3 == 0 && score != 0 && once){
			if (player_speed >3){
				player_speed -= 2;
			}
			
			if(enemy_speed > 3){
				enemy_speed -= 2;
			}
			once = false; //so it doesn't keep increase the score before it updates 
		}

		//pulse status line green
		if(isRed){
			PS.statusColor(PS.COLOR_GREEN);
			isRed = false;
		}

	}
}
const newEnemy = function() {
	enemy_width = PS.random(9) / 2;
	enemy_width = Math.ceil(enemy_width);
	enemy = PS.spriteSolid(enemy_width,1)
	PS.spritePlane( enemy, 1 );
	PS.spriteSolidColor(enemy, PS.COLOR_INDIGO)
	enemy_x = 16;
	enemy_y = 6;
	PS.spriteMove(enemy, enemy_x, enemy_y); 
}

const playerInit = function() {

	player = PS.spriteSolid( 1, 1 );
	player_x = GRID_W / 4;
	player_y = GRID_H - 2;
	PS.spriteSolidColor(player, PS.COLOR_BLACK);
	PS.spriteMove(player, player_x,player_y);
	var myFunc = function ( s1, p1, s2, p2, type ) {
		touching = true;
	};
	   
	PS.spriteCollide( player, myFunc );
}

const increaseScore = function(){
	score++;
	once = true; 
	if(score % 3 == 0){
		isRed = true;
	}
	PS.statusColor(PS.COLOR_BLACK);
	PS.statusText("SCORE= " + score + " HIGHSCORE = " + highscore);
}

PS.init = function( system, options ) {
	"use strict"; // Do not remove this directive!

	//grid setup
	PS.gridSize( GRID_W, GRID_H );
	PS.gridColor(PS.COLOR_WHITE);
	PS.gridShadow(PS.COLOR_GRAY_LIGHT);
	PS.border(PS.ALL,PS.ALL,0);

	fetch('/scores/highscore', {
		method:'GET',
	})
	.then( function ( response ) {
		console.log( response )
		return response.json()
	})
	.then(function( json ) {
		highscore = json
		playerInit() // generate player
		newEnemy() // generate first enemy
		isAlive = true;
	
		if (first) {
			timer = PS.timerStart(1, TIMER.tick); // start game timer
			first = false;
		}
	
		PS.statusText( "SCORE = " + score + " HIGHSCORE = " + highscore);
	});
};

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

PS.keyDown = function( key, shift, ctrl, options ) {
	"use strict"; // Do not remove this directive!

	//PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	switch (key) {
		case 32:
			if (isAlive) {
				jump = true;
			}
			else {
				PS.init();
			}		
			break;
	}

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
