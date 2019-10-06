{/*
game.js for Perlenspiel 3.3.x
Last revision: 2018-10-14 (BM)

Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
This version of Perlenspiel (3.3.x) is hosted at <https://ps3.perlenspiel.net>
Perlenspiel is Copyright © 2009-19 Worcester Polytechnic Institute.
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


}

let variables =  {
    dataArray : [[], [], [], []],
    arrayLoc : 0,
    recordInfo : false,
    currentTime : 0,
    timer : null,
    maxSeconds : 5000,
    currentPlaybackIndex : 0,
    playbackLength : [],
    playbackIndicies : [],
    maxLength : 0,
    currentPlaybackTime : 0,
    playingBack : false,
    playbackTimer : null,
}

PS.init = function (system, options) {
    "use strict";

    PS.gridSize(15, 5);
    pianoSetup();

    PS.statusText("Game");
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



PS.touch = function (x, y, data, options) {
    "use strict"; // Do not remove this directive!

    // Uncomment the following code line
    // to inspect x/y parameters:

    // PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );

    // Add code here for mouse clicks/touches
    // over a bead.

    if (x < 13 && variables.recordInfo) {
        recordData({ x: x, y: y, data: data[0] }, variables.currentTime);
    }

    switch (data[0]) {
        case 0:
            PS.audioPlay(PS.piano(44, false));
            break;
        case 0.5:
            PS.audioPlay(PS.piano(45, false));
            break;
        case 1:
            PS.audioPlay(PS.piano(46, false));
            break;
        case 1.5:
            PS.audioPlay(PS.piano(47, false));
            break;
        case 2:
            PS.audioPlay(PS.piano(48, false));
            break;
        case 3:
            PS.audioPlay(PS.piano(49, false));
            break;
        case 3.5:
            PS.audioPlay(PS.piano(50, false));
            break;
        case 4:
            PS.audioPlay(PS.piano(51, false));
            break;
        case 4.5:
            PS.audioPlay(PS.piano(52, false));
            break;
        case 5:
            PS.audioPlay(PS.piano(53, false));
            break;
        case 5.5:
            PS.audioPlay(PS.piano(54, false));
            break;
        case 6:
            PS.audioPlay(PS.piano(55, false));
            break;
        case 7:
            PS.audioPlay(PS.piano(56, false));
            break;
        case "R1":
            if (!variables.recordInfo) {
                startRecording(0);
            }
            break;
        case "R2":
            if (!variables.recordInfo) {
                startRecording(1);
            }
            break;
        case "R3":
            if (!variables.recordInfo) {
                startRecording(2);
            }
            break;
        case "R4":
            if (!variables.recordInfo) {
                startRecording(3);
            }
            break;
        case "P1":
            if (!variables.playingBack) {
                playBackData(0);
            }
            break;
        case "P2":
            if (!variables.playingBack) {
                playBackData(1);
            } break;
        case "P3":
            if (!variables.playingBack) {
                playBackData(2);
            } break;
        case "P4":
            if (!variables.playingBack) {
                playBackData(3);
            } break;
        case "PALL":
            if (!variables.playingBack) {
                playBackData(null);
            } break;

    }
};


{
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

/*

PS.keyDown = function( key, shift, ctrl, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is pressed.
};

*/

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

*/}


function startRecording(arrayPos) {
    variables.arrayLoc = arrayPos;
    variables.recordInfo = true;
    variables.currentTime = 0;
    variables.dataArray[variables.arrayLoc] = [];
    variables.timer = setInterval(intervalTimerLoop, 10);
}

function intervalTimerLoop() {
    if (variables.currentTime < variables.maxSeconds) {
        variables.currentTime += 10;
    }
    else {
        clearInterval(variables.timer);
        variables.recordInfo = false;
        variables.currentTime = 0;
    }
}

function recordData(data, timing) {
    let calVal = 0;
    switch (data.data) {
        case 0:
            calVal = 44;
            variables.dataArray[variables.arrayLoc].push({ pianoVal: calVal, timeVal: timing });
            break;
        case 0.5:
            calVal = 45;
            variables.dataArray[variables.arrayLoc].push({ pianoVal: calVal, timeVal: timing });
            break;
        case 1:
            calVal = 46;
            variables.dataArray[variables.arrayLoc].push({ pianoVal: calVal, timeVal: timing });
            break;
        case 1.5:
            calVal = 47;
            variables.dataArray[variables.arrayLoc].push({ pianoVal: calVal, timeVal: timing });
            break;
        case 2:
            calVal = 48;
            variables.dataArray[variables.arrayLoc].push({ pianoVal: calVal, timeVal: timing });
            break;
        case 3:
            calVal = 49;
            variables.dataArray[variables.arrayLoc].push({ pianoVal: calVal, timeVal: timing });
            break;
        case 3.5:
            calVal = 50;
            variables.dataArray[variables.arrayLoc].push({ pianoVal: calVal, timeVal: timing });
            break;
        case 4:
            calVal = 51;
            variables.dataArray[variables.arrayLoc].push({ pianoVal: calVal, timeVal: timing });
            break;
        case 4.5:
            calVal = 52;
            variables.dataArray[variables.arrayLoc].push({ pianoVal: calVal, timeVal: timing });
            break;
        case 5:
            calVal = 53;
            variables.dataArray[variables.arrayLoc].push({ pianoVal: calVal, timeVal: timing });
            break;
        case 5.5:
            calVal = 54;
            variables.dataArray[variables.arrayLoc].push({ pianoVal: calVal, timeVal: timing });
            break;
        case 6:
            calVal = 55;
            variables.dataArray[variables.arrayLoc].push({ pianoVal: calVal, timeVal: timing });
            break;
        case 7:
            calVal = 56;
            variables.dataArray[variables.arrayLoc].push({ pianoVal: calVal, timeVal: timing });
            break;
    }
}

function playBackData(arrayPos) {
    if (!variables.playingBack) {
        console.log(variables.dataArray);
        variables.playingBack = true;
        console.log("Starting playback")
        variables.arrayLoc = arrayPos;
        variables.currentPlaybackTime = 0;
        variables.playbackLength = []
        variables.playbackIndicies = [0, 0, 0, 0]
        variables.maxLength = 0;
        for (var i = 0; i < variables.dataArray.length; i++) {
            if (variables.dataArray[i].length > variables.maxLength) {
                variables.maxLength = variables.dataArray[i].length
            }
            variables.playbackLength.push(variables.dataArray[i].length);
        }
        variables.playbackTimer = setInterval(playbackSound, 10);
    }

}

function playbackSound() {
    if (variables.currentPlaybackTime % 100 === 0) {
        variables.timeRemaining--;
        PS.statusText(variables.timeRemaining)
    }
    if (variables.arrayLoc !== null) {
        if (variables.currentPlaybackIndex < variables.dataArray[variables.arrayLoc].length) {
            if (variables.dataArray[variables.arrayLoc][variables.currentPlaybackIndex].timeVal === variables.currentPlaybackTime) {
                PS.audioPlay(PS.piano(variables.dataArray[variables.arrayLoc][variables.currentPlaybackIndex].pianoVal, false));
                variables.currentPlaybackIndex++;
            }
            variables.currentPlaybackTime += 10;
        }
        else {
            variables.playingBack = false;
            variables.currentPlaybackTime = 0;
            variables.currentPlaybackIndex = 0;
            PS.statusText("FINISHED PLAYBACK");
            clearInterval(variables.playbackTimer)
        }
    }
    //PLAY ALL TRACKS
    else {
        for (var i = 0; i < variables.dataArray.length; i++) {
            if (variables.playbackIndicies[i] < variables.playbackLength[i]) {
                if (variables.dataArray[i][variables.playbackIndicies[i]].timeVal === variables.currentPlaybackTime) {
                    //console.log("TRACK: " + i + " INDEX: " + playbackIndicies[i] + " " + variables.dataArray[i][playbackIndicies[i]].pianoVal);
                    PS.audioPlay(PS.piano(variables.dataArray[i][variables.playbackIndicies[i]].pianoVal, false));
                    variables.playbackIndicies[i]++;
                }
                if (variables.playbackIndicies[i] === variables.maxLength) {
                    //END PLAYBACK
                    variables.playingBack = false;
                    variables.currentPlaybackTime = 0;
                    PS.statusText("FINISHED PLAYBACK");
                   clearInterval(variables.playbackTimer)
                }
            }
        }
        variables.currentPlaybackTime += 10;
        /*
         * if (dataArray[arrayLoc][currentPlaybackIndex].timeVal === currentPlaybackTime) {
                console.log(dataArray[arrayLoc][currentPlaybackIndex].pianoVal);
                PS.audioPlay(PS.piano(dataArray[arrayLoc][currentPlaybackIndex].pianoVal, false));
                currentPlaybackIndex++;
            }
            currentPlaybackTime += 10;
         * 
         */
    }

}

function pianoSetup() {
    for (var i = 0; i < 13; i++) {
        for (var j = 0; j < 3; j++) {
            PS.visible(i, j, false)
        }
    }
    PS.visible(13, 4, false);
    PS.gridColor(PS.COLOR_GRAY)
    PS.color(1, 3, PS.COLOR_BLACK)
    PS.color(3, 3, PS.COLOR_BLACK)
    PS.color(6, 3, PS.COLOR_BLACK)
    PS.color(8, 3, PS.COLOR_BLACK)
    PS.color(10, 3, PS.COLOR_BLACK)

    PS.color(13, 0, PS.COLOR_RED)
    PS.color(14, 0, PS.COLOR_GREEN)
    PS.color(13, 1, PS.COLOR_RED)
    PS.color(14, 1, PS.COLOR_GREEN)
    PS.color(13, 2, PS.COLOR_RED)
    PS.color(14, 2, PS.COLOR_GREEN)
    PS.color(13, 3, PS.COLOR_RED)
    PS.color(14, 3, PS.COLOR_GREEN)
    PS.color(14, 4, PS.COLOR_BLUE)



    //ASSIGNING BEAD NOTE DATA
    PS.data(0, 3, [0]); //C
    PS.data(0, 4, [0]); //C
    PS.data(1, 4, [0]); //C
    PS.data(1, 3, [.5]); //C#
    PS.data(2, 3, [1]); //D
    PS.data(2, 4, [1]); //D
    PS.data(3, 3, [1.5]); //D#
    PS.data(3, 4, [2]); //E
    PS.data(4, 3, [2]); //E
    PS.data(4, 4, [2]); //E
    PS.data(5, 4, [3]); //F
    PS.data(5, 3, [3]); //F
    PS.data(6, 3, [3.5]); //F#
    PS.data(6, 4, [4]); //G
    PS.data(7, 3, [4]); //G
    PS.data(7, 4, [4]); //G
    PS.data(8, 3, [4.5]); //G#
    PS.data(8, 4, [5]); //A
    PS.data(9, 4, [5]); //A
    PS.data(9, 3, [5]); //A
    PS.data(10, 3, [5.5]); //A#
    PS.data(10, 4, [6]); //B
    PS.data(11, 3, [6]); //B
    PS.data(11, 4, [6]);//B
    PS.data(12, 3, [7]); //C
    PS.data(12, 4, [7]); //C

    //BEAD RECORD/PLAYBACK DATA
    PS.data(13, 0, ["R1"]); //R1
    PS.data(13, 1, ["R2"]); //R2
    PS.data(13, 2, ["R3"]); //R3
    PS.data(13, 3, ["R4"]); //R4
    PS.data(14, 0, ["P1"]); //P1
    PS.data(14, 1, ["P2"]); //P2
    PS.data(14, 2, ["P3"]); //P3
    PS.data(14, 3, ["P4"]); //P4
    PS.data(14, 4, ["PALL"]); //PA
}


