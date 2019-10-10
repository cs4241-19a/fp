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

// global
var	timer = "",
	first = true,	
	isRed = false,
    once = false;

const GRID_W = 16, GRID_H = 8;

// player 
var player,
    player_x, player_y,
	player_speed = 9,
	jump = false,
	up = 0,
    down = 0,
	isAlive = true,
	score = 0,
	highscore = 0,
	touching = false;

// enemy
var enemy, 
	enemy_x, enemy_y,
	enemy_width = 0,
	enemy_speed = 14;

var TIMER = {
	global : 0,
	tick : function() {
		if (!isAlive) { return }
		TIMER.global+=1;

		// move enemy
		if (TIMER.global % enemy_speed == 0) { moveEnemy() }

		// player move up
		if (jump && TIMER.global % player_speed === 0 && up != 2) {
			player_y -= 1;
			PS.spriteMove(player, player_x, player_y);
			up+=1;
			if (up == 2) { jump = false }
		}  
		//player move down
		else if (TIMER.global % player_speed == 0 && player_y < 6 && up == 2 && !touching) {
			player_y += 1;
			PS.spriteMove(player,player_x,player_y)
			if (player_y == 6) { up = 0 }
		} 
		
		// kill player
		if (player_x == enemy_x && player_y == enemy_y) { killPlayer() }

		//increase speed
		if(score % 3 == 0 && score != 0 && once) {
			if (player_speed >3){ player_speed -= 2; }
			if(enemy_speed > 3){ enemy_speed -= 2; }
			once = false; //so it doesn't keep increase the score before it updates 
		}

		//pulse status line green
		if(isRed){
			PS.statusColor(PS.COLOR_GREEN);
			isRed = false;
		}
	}
}

const moveEnemy = function() {
	touching = false
	enemy_x -= 1
	PS.spriteMove(enemy, enemy_x, enemy_y)
	if (enemy_x + enemy_width == 0) {
		PS.spriteDelete(enemy)
		increaseScore();
		newEnemy()
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

const killPlayer = function() {
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
	if(score % 3 == 0) { isRed = true; }
	PS.statusColor(PS.COLOR_BLACK);
	PS.statusText("SCORE= " + score + " HIGHSCORE = " + highscore);
}

PS.init = function( system, options ) {
	"use strict"; // Do not remove this directive!

	// initial grid setup
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
		PS.statusText( "Press space to jump" );
	});
};

PS.keyDown = function( key, shift, ctrl, options ) {
	"use strict"; // Do not remove this directive!

	switch (key) {
		case 32:
			if (isAlive) {
				PS.statusText( "SCORE = " + score + " HIGHSCORE = " + highscore);
				jump = true;
				if (first) {
					timer = PS.timerStart(1, TIMER.tick); // start game timer
					first = false;
				}
			}
			else { PS.init(); }		
			break;
	}
};
