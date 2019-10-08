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

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
//VARIABLE OBJECT

let variables = {
    dataArray: [[], [], [], []],
    arrayLoc: 0,
    recordInfo: false,
    currentTime: 0,
    timer: null,
    maxSeconds: 5000,
    currentPlaybackIndex: 0,
    playbackLength: [],
    playbackIndicies: [],
    maxLength: 0,
    timeRemaining: null,
    currentPlaybackTime: 0,
    playingBack: false,
    playbackTimer: null,
    countdownTimerCount: 3,
    countdownTimer: null,

}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
//PS FUNCTIONS

PS.init = function (system, options) {
    "use strict";

    variables.timeRemaining = variables.maxSeconds;

    PS.gridSize(32, 32);
    PS.gridColor(PS.COLOR_GRAY)

    pianoSetup();

    drumSetup();

    PS.statusText("Shitty Garageband");
};

PS.touch = function (x, y, data, options) {
    "use strict";

    HighlightKey(data[0]);

    if (data[0] !== undefined && variables.recordInfo) {
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
            }
            break;
        case "P4":
            if (!variables.playingBack) {
                playBackData(3);
            }
            break;
        case "PALL":
            if (!variables.playingBack) {
                playBackData(null);
            }
            break;

    }
};

PS.release = function (x, y, data, options) {
    "use strict"; // Do not remove this directive!

    RevertKey(data[0]);
};

PS.exitGrid = function (options) {
    "use strict"; // Do not remove this directive!
    for (var i = 0; i < 8; i += .5) {
        RevertKey(i)
    }
};

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
//UNUSED PS FUNCTIONS
{
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


////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
//RECORDING FUNCTIONS

function recordingCountdown() {
    console.log("IN COUNTDOWN")
    if (variables.countdownTimerCount > 0) {
        PS.audioPlay("fx_click");
        PS.statusText("RECORDING IN: " + variables.countdownTimerCount);
        variables.countdownTimerCount--;
    }
    else {
        PS.statusText("RECORDING");
        PS.timerStop(variables.countdownTimer)
        variables.timer = setInterval(intervalTimerLoop, 10);
    }
}

function startRecording(arrayPos) {
    variables.arrayLoc = arrayPos;
    variables.recordInfo = true;
    variables.currentTime = 0;
    variables.dataArray[variables.arrayLoc] = [];
    variables.countdownTimer = PS.timerStart(60, recordingCountdown);
}

function intervalTimerLoop() {
    variables.countdownTimer = 3;
    if (variables.currentTime < variables.maxSeconds) {
        variables.currentTime += 10;
    }

    else {
        clearInterval(variables.timer);
        variables.recordInfo = false;
        variables.currentTime = 0;
        variables.countdownTimerCount = 3;
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
        variables.timeRemaining = variables.maxSeconds;
        variables.playbackTimer = setInterval(playbackSound, 10);
    }

}

function playbackSound() {
    if (variables.currentPlaybackTime % 1000 === 0) {
        PS.statusText(variables.timeRemaining / 1000)
        variables.timeRemaining -= 1000;
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

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
//PIANO FUNCTIONS

function pianoSetup() {

    for (var i = 0; i < 32; i++) {
        for (var j = 24; j < 32; j++) {
            PS.border(i, j, 0);
        }
    }

    for (var i = 0; i < 32; i++) {
        PS.visible(i, 23, false);
        PS.border(i, 24, {
            top: 2,
            left: 0,
            bottom: 0,
            right: 0
        });
    }

    for (var i = 29; i < 32; i++) {
        PS.border(2, i, {
            top: 0,
            left: 0,
            bottom: 0,
            right: 2
        });
        PS.border(5, i, {
            top: 0,
            left: 0,
            bottom: 0,
            right: 2
        });
        PS.border(11, i, {
            top: 0,
            left: 0,
            bottom: 0,
            right: 2
        });
        PS.border(14, i, {
            top: 0,
            left: 0,
            bottom: 0,
            right: 2
        });
        PS.border(17, i, {
            top: 0,
            left: 0,
            bottom: 0,
            right: 2
        });
    }

    for (var i = 24; i < 32; i++) {
        PS.border(8, i, {
            right: 2
        });
        PS.border(20, i, {
            right: 2
        });
        PS.border(23, i, {
            right: 2
        });

    }

    //C
    for (var i = 0; i < 2; i++) {
        for (var j = 24; j < 32; j++) {
            PS.data(i, j, [0]);
        }
    }
    for (var i = 29; i < 32; i++) {
        PS.data(2, i, [0])
    }

    //C#
    for (var i = 2; i < 4; i++) {
        for (var j = 24; j < 29; j++) {
            PS.color(i, j, PS.COLOR_BLACK);
            PS.data(i, j, [.5]);
        }
    }

    //D
    for (var i = 4; i < 5; i++) {
        for (var j = 24; j < 32; j++) {
            PS.data(i, j, [1]);
        }
    }
    for (var i = 3; i < 6; i++) {
        for (var j = 29; j < 32; j++) {
            PS.data(i, j, [1]);
        }
    }

    //D#
    for (var i = 5; i < 7; i++) {
        for (var j = 24; j < 29; j++) {
            PS.color(i, j, PS.COLOR_BLACK);
            PS.data(i, j, [1.5]);
        }
    }

    //E
    for (var i = 7; i < 9; i++) {
        for (var j = 24; j < 32; j++) {
            PS.data(i, j, [2]);
        }
    }
    for (var i = 6; i < 9; i++) {
        for (var j = 29; j < 32; j++) {
            PS.data(i, j, [2]);
        }
    }

    //F
    for (var i = 9; i < 11; i++) {
        for (var j = 24; j < 32; j++) {
            PS.data(i, j, [3]);
        }
    }
    for (var i = 9; i < 12; i++) {
        for (var j = 29; j < 32; j++) {
            PS.data(i, j, [3]);
        }
    }

    //F#
    for (var i = 11; i < 13; i++) {
        for (var j = 24; j < 29; j++) {
            PS.color(i, j, PS.COLOR_BLACK);
            PS.data(i, j, [3.5]);
        }
    }

    //G
    for (var j = 24; j < 32; j++) {
        PS.data(13, j, [4]);
    }
    for (var i = 12; i < 15; i++) {
        for (var j = 29; j < 32; j++) {
            PS.data(i, j, [4]);
        }
    }

    //G#
    for (var i = 14; i < 16; i++) {
        for (var j = 24; j < 29; j++) {
            PS.color(i, j, PS.COLOR_BLACK);
            PS.data(i, j, [4.5]);
        }
    }

    //A
    for (var j = 24; j < 32; j++) {
        PS.data(16, j, [5]);
    }
    for (var i = 15; i < 18; i++) {
        for (var j = 29; j < 32; j++) {
            PS.data(i, j, [5]);
        }
    }

    //A#
    for (var i = 17; i < 19; i++) {
        for (var j = 24; j < 29; j++) {
            PS.color(i, j, PS.COLOR_BLACK);
            PS.data(i, j, [5.5]);
        }
    }

    //B
    for (var i = 19; i < 21; i++) {
        for (var j = 24; j < 32; j++) {
            PS.data(i, j, [6]);
        }
    }
    for (var i = 18; i < 21; i++) {
        for (var j = 29; j < 32; j++) {
            PS.data(i, j, [6]);
        }
    }

    //C
    for (var i = 21; i < 24; i++) {
        for (var j = 24; j < 32; j++) {
            PS.data(i, j, [7]);
        }
    }

    PS.visible(24, 24, false);
    PS.glyph(25, 24, "R");
    PS.glyph(26, 24, "E");
    PS.glyph(27, 24, "C");
    PS.glyph(28, 24, "O");
    PS.glyph(29, 24, "R");
    PS.glyph(30, 24, "D");
    PS.visible(31, 24, false);

    for (var i = 24; i < 32; i++) {
        for (var j = 25; j < 27; j++) {
            PS.color(i, j, PS.COLOR_RED);
        }
    }


    for (var j = 25; j < 27; j++) {
        PS.border(25, j, { right: 1 });
        PS.border(27, j, { right: 1 });
        PS.border(29, j, { right: 1 });
    }


    PS.visible(24, 27, false);
    PS.glyph(25, 27, "T");
    PS.glyph(26, 27, "R");
    PS.glyph(27, 27, "A");
    PS.glyph(28, 27, "C");
    PS.glyph(29, 27, "K");
    PS.glyph(30, 27, "S");
    PS.visible(31, 27, false);

    for (var i = 24; i < 32; i++) {
        for (var j = 28; j < 30; j++) {
            PS.color(i, j, PS.COLOR_GREEN);
        }
    }


    for (var j = 28; j < 30; j++) {
        PS.border(25, j, { right: 1 });
        PS.border(27, j, { right: 1 });
        PS.border(29, j, { right: 1 });
    }


    PS.visible(24, 30, false);
    PS.visible(25, 30, false);
    PS.glyph(26, 30, "P");
    PS.glyph(27, 30, "L");
    PS.glyph(28, 30, "A");
    PS.glyph(29, 30, "Y");
    PS.visible(30, 30, false);
    PS.visible(31, 30, false);

    for (var i = 24; i < 32; i++) {
        for (var j = 31; j < 32; j++) {
            PS.color(i, j, PS.COLOR_BLUE);
            PS.data(i, j, ["PALL"]);
        }
    }


    for (var j = 28; j < 30; j++) {
        PS.border(25, j, { right: 1 });
        PS.border(27, j, { right: 1 });
        PS.border(29, j, { right: 1 });
    }

    //R1
    for (var i = 24; i < 26; i++) {
        for (var j = 25; j < 27; j++) {
            PS.data(i, j, ["R1"]);
        }
    }

    //R2
    for (var i = 26; i < 28; i++) {
        for (var j = 25; j < 27; j++) {
            PS.data(i, j, ["R2"]);
        }
    }

    //R3
    for (var i = 28; i < 30; i++) {
        for (var j = 25; j < 27; j++) {
            PS.data(i, j, ["R3"]);
        }
    }

    //R4
    for (var i = 30; i < 32; i++) {
        for (var j = 25; j < 27; j++) {
            PS.data(i, j, ["R4"]);
        }
    }

    //P1
    for (var i = 24; i < 26; i++) {
        for (var j = 28; j < 30; j++) {
            PS.data(i, j, ["P1"]);
        }
    }

    //P2
    for (var i = 26; i < 28; i++) {
        for (var j = 28; j < 30; j++) {
            PS.data(i, j, ["P2"]);
        }
    }

    //P3
    for (var i = 28; i < 30; i++) {
        for (var j = 28; j < 30; j++) {
            PS.data(i, j, ["P3"]);
        }
    }

    //P4
    for (var i = 30; i < 32; i++) {
        for (var j = 28; j < 30; j++) {
            PS.data(i, j, ["P4"]);
        }
    }

}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
//DRUM FUNCTIONS

function drumSetup() {

}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
//RECOLOR FUNCTIONS

function HighlightKey(data) {
    switch (data) {
        case 0:
            //C
            for (var i = 0; i < 2; i++) {
                for (var j = 24; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_YELLOW);
                }
            }
            for (var i = 29; i < 32; i++) {
                PS.color(2, i, PS.COLOR_YELLOW)
            }
            break;
        case 0.5:
            //C#
            for (var i = 2; i < 4; i++) {
                for (var j = 24; j < 29; j++) {
                    PS.color(i, j, PS.COLOR_YELLOW);
                }
            }
            break;
        case 1:
            //D
            for (var i = 4; i < 5; i++) {
                for (var j = 24; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_YELLOW);
                }
            }
            for (var i = 3; i < 6; i++) {
                for (var j = 29; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_YELLOW);
                }
            }
            break;
        case 1.5:
            //D#
            for (var i = 5; i < 7; i++) {
                for (var j = 24; j < 29; j++) {
                    PS.color(i, j, PS.COLOR_YELLOW);
                }
            }
            break;
        case 2:
            //E
            for (var i = 7; i < 9; i++) {
                for (var j = 24; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_YELLOW);
                }
            }
            for (var i = 6; i < 9; i++) {
                for (var j = 29; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_YELLOW);
                }
            }
            break;
        case 3:
            //F
            for (var i = 9; i < 11; i++) {
                for (var j = 24; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_YELLOW);
                }
            }
            for (var i = 9; i < 12; i++) {
                for (var j = 29; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_YELLOW);
                }
            }
            break;
        case 3.5:
            //F#
            for (var i = 11; i < 13; i++) {
                for (var j = 24; j < 29; j++) {
                    PS.color(i, j, PS.COLOR_YELLOW);
                }
            }
            break;
        case 4:
            //G
            for (var j = 24; j < 32; j++) {
                PS.color(13, j, PS.COLOR_YELLOW);
            }
            for (var i = 12; i < 15; i++) {
                for (var j = 29; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_YELLOW);
                }
            }
            break;
        case 4.5:
            //G#
            for (var i = 14; i < 16; i++) {
                for (var j = 24; j < 29; j++) {
                    PS.color(i, j, PS.COLOR_YELLOW);
                }
            }
            break;
        case 5:
            //A
            for (var j = 24; j < 32; j++) {
                PS.color(16, j, PS.COLOR_YELLOW);
            }
            for (var i = 15; i < 18; i++) {
                for (var j = 29; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_YELLOW);
                }
            }
            break;
        case 5.5:
            //A#
            for (var i = 17; i < 19; i++) {
                for (var j = 24; j < 29; j++) {
                    PS.color(i, j, PS.COLOR_YELLOW);
                }
            }
            break;
        case 6:
            //B
            for (var i = 19; i < 21; i++) {
                for (var j = 24; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_YELLOW);
                }
            }
            for (var i = 18; i < 21; i++) {
                for (var j = 29; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_YELLOW);
                }
            }

            break;
        case 7:
            //C
            for (var i = 21; i < 24; i++) {
                for (var j = 24; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_YELLOW);
                }
            }
            break;
    }
}

function RevertKey(data) {
    switch (data) {
        case 0:
            //C
            for (var i = 0; i < 2; i++) {
                for (var j = 24; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_WHITE);
                }
            }
            for (var i = 29; i < 32; i++) {
                PS.color(2, i, PS.COLOR_WHITE)
            }
            break;
        case 0.5:
            //C#
            for (var i = 2; i < 4; i++) {
                for (var j = 24; j < 29; j++) {
                    PS.color(i, j, PS.COLOR_BLACK);
                }
            }
            break;
        case 1:
            //D
            for (var i = 4; i < 5; i++) {
                for (var j = 24; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_WHITE);
                }
            }
            for (var i = 3; i < 6; i++) {
                for (var j = 29; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_WHITE);
                }
            }
            break;
        case 1.5:
            //D#
            for (var i = 5; i < 7; i++) {
                for (var j = 24; j < 29; j++) {
                    PS.color(i, j, PS.COLOR_BLACK);
                }
            }
            break;
        case 2:
            //E
            for (var i = 7; i < 9; i++) {
                for (var j = 24; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_WHITE);
                }
            }
            for (var i = 6; i < 9; i++) {
                for (var j = 29; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_WHITE);
                }
            }
            break;
        case 3:
            //F
            for (var i = 9; i < 11; i++) {
                for (var j = 24; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_WHITE);
                }
            }
            for (var i = 9; i < 12; i++) {
                for (var j = 29; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_WHITE);
                }
            }
            break;
        case 3.5:
            //F#
            for (var i = 11; i < 13; i++) {
                for (var j = 24; j < 29; j++) {
                    PS.color(i, j, PS.COLOR_BLACK);
                }
            }
            break;
        case 4:
            //G
            for (var j = 24; j < 32; j++) {
                PS.color(13, j, PS.COLOR_WHITE);
            }
            for (var i = 12; i < 15; i++) {
                for (var j = 29; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_WHITE);
                }
            }
            break;
        case 4.5:
            //G#
            for (var i = 14; i < 16; i++) {
                for (var j = 24; j < 29; j++) {
                    PS.color(i, j, PS.COLOR_BLACK);
                }
            }
            break;
        case 5:
            //A
            for (var j = 24; j < 32; j++) {
                PS.color(16, j, PS.COLOR_WHITE);
            }
            for (var i = 15; i < 18; i++) {
                for (var j = 29; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_WHITE);
                }
            }
            break;
        case 5.5:
            //A#
            for (var i = 17; i < 19; i++) {
                for (var j = 24; j < 29; j++) {
                    PS.color(i, j, PS.COLOR_BLACK);
                }
            }
            break;
        case 6:
            //B
            for (var i = 19; i < 21; i++) {
                for (var j = 24; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_WHITE);
                }
            }
            for (var i = 18; i < 21; i++) {
                for (var j = 29; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_WHITE);
                }
            }

            break;
        case 7:
            //C
            for (var i = 21; i < 24; i++) {
                for (var j = 24; j < 32; j++) {
                    PS.color(i, j, PS.COLOR_WHITE);
                }
            }
            break;
    }
}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
//DATABASE FUNCTIONS

//LOAD SONG

//SAVE SONG
function saveTrack() {
    console.log("SAVING TRACK");
    console.log(variables.dataArray);
}