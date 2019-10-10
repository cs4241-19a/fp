{
  /*
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
  //FOUR TRACKS FOR EACH INSTRUMENT
  dataArray: [[], [], [], [], [], [], [], []],
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
  recordingPiano: false
};

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
//PS FUNCTIONS

PS.init = function(system, options) {
  "use strict";

  variables.timeRemaining = variables.maxSeconds;

  PS.gridSize(32, 19);
  PS.gridColor(PS.COLOR_GRAY);
  PS.borderColor(PS.ALL, PS.ALL, PS.COLOR_BLACK);

  pianoSetup();

  drumSetup();

  for (var i = 0; i < 32; i++) {
    PS.visible(i, 17, false);
  }
  for (var i = 9; i < 23; i++) {
    PS.border(i, 18, 0);
    PS.color(i, 18, PS.COLOR_BLUE);
    PS.data(i, 18, ["ALL"]);
  }

  PS.visible(0, 18, false);
  PS.visible(1, 18, false);
  PS.visible(2, 18, false);
  PS.visible(3, 18, false);
  PS.visible(4, 18, false);
  PS.visible(5, 18, false);
  PS.visible(6, 18, false);
  PS.visible(7, 18, false);
  PS.visible(8, 18, false);
  PS.glyph(9, 18, "P");
  PS.glyph(10, 18, "L");
  PS.glyph(11, 18, "A");
  PS.glyph(12, 18, "Y");
  PS.glyph(13, 18, "R");
  PS.glyph(14, 18, "E");
  PS.glyph(15, 18, "C");
  PS.glyph(16, 18, "O");
  PS.glyph(17, 18, "R");
  PS.glyph(18, 18, "D");
  PS.glyph(19, 18, "I");
  PS.glyph(20, 18, "N");
  PS.glyph(21, 18, "G");
  PS.glyph(22, 18, "!");
  PS.visible(23, 18, false);
  PS.visible(24, 18, false);
  PS.visible(25, 18, false);
  PS.visible(26, 18, false);
  PS.visible(27, 18, false);
  PS.visible(28, 18, false);
  PS.visible(29, 18, false);
  PS.visible(30, 18, false);
  PS.visible(31, 18, false);

  PS.statusText("Shitty Garageband");
};

PS.touch = function(x, y, data, options) {
  "use strict";

  // HighlightKey(data[0]);

  if (data[0] !== undefined && variables.recordInfo) {
    recordData({ x: x, y: y, data: data[0] }, variables.currentTime);
  }

  playAudio(data[0]);

  {
    /* switch (data[0]) {
        //PIANO
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
                playBackData("PIANO");
            }
            break;
        //DRUMS
        case 8:
            PS.audioPlay("perc_drum_bass");
            break;
        case 9:
            PS.audioPlay("perc_drum_snare");
            break;
        case 10:
            PS.audioPlay("perc_drum_tom1");
            break;
        case 11:
            PS.audioPlay("perc_drum_tom2");
            break;
        case 12:
            PS.audioPlay("perc_drum_tom3");
            break;
        case 13:
            PS.audioPlay("perc_drum_tom4");
            break;
        case 14:
            PS.audioPlay("perc_hihat_closed");
            break;
        case 15:
            PS.audioPlay("perc_hihat_open");
            break;
        case 16:
            PS.audioPlay("perc_hihat_pedal");
            break;
        case 17:
            PS.audioPlay("perc_cymbal_crash1");
            break;
        case 18:
            PS.audioPlay("perc_cymbal_crash2");
            break;
        case 19:
            PS.audioPlay("perc_cymbal_crash3");
            break;
        case 20:
            PS.audioPlay("perc_cymbal_crash4");
            break;
        case "DR1":
            if (!variables.recordInfo) {
                startRecording(4);
            }
            break;
        case "DR2":
            if (!variables.recordInfo) {
                startRecording(5);
            }
            break;
        case "DR3":
            if (!variables.recordInfo) {
                startRecording(6);
            }
            break;
        case "DR4":
            if (!variables.recordInfo) {
                startRecording(7);
            }
            break;
        case "DP1":
            if (!variables.playingBack) {
                playBackData(4);
            }
            break;
        case "DP2":
            if (!variables.playingBack) {
                playBackData(5);
            } break;
        case "DP3":
            if (!variables.playingBack) {
                playBackData(6);
            }
            break;
        case "DP4":
            if (!variables.playingBack) {
                playBackData(7);
            }
            break;
        case "DALL":
            if (!variables.playingBack) {
                playBackData("DRUMS");
            }
            break;
        //GUITAR
        case 21:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 22:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 23:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 24:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 25:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 26:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 27:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 28:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 29:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 30:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 31:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 32:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 33:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 34:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 35:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 36:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 37:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 38:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 39:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 40:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 41:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 42:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 43:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 44:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 45:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 46:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 47:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 48:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 49:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 50:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 51:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 52:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 53:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 54:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 55:
            PS.audioPlay(PS.piano(56, false));
            break;
        case 56:
            PS.audioPlay(PS.piano(56, false));
            break;
        case "GR1":
            if (!variables.recordInfo) {
                startRecording(8);
            }
            break;
        case "GR2":
            if (!variables.recordInfo) {
                startRecording(9);
            }
            break;
        case "GR3":
            if (!variables.recordInfo) {
                startRecording(10);
            }
            break;
        case "GR4":
            if (!variables.recordInfo) {
                startRecording(11);
            }
            break;
        case "GP1":
            if (!variables.playingBack) {
                playBackData(8);
            }
            break;
        case "GP2":
            if (!variables.playingBack) {
                playBackData(9);
            } break;
        case "GP3":
            if (!variables.playingBack) {
                playBackData(10);
            }
            break;
        case "GP4":
            if (!variables.playingBack) {
                playBackData(11);
            }
            break;
        case "GALL":
            if (!variables.playingBack) {
                playBackData("GUITAR");
            }
            break;
    }*/
  }
};

PS.release = function(x, y, data, options) {
  "use strict"; // Do not remove this directive!

  // RevertKey(data[0]);

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

PS.keyDown = function (key, shift, ctrl, options) {
    "use strict"; // Do not remove this directive!

    PS.audioPlay("3-oct-e", { path: "guitarAudio/" })
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

*/
}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
//RECORDING FUNCTIONS

function recordingCountdown() {
  if (variables.countdownTimerCount > 0) {
    PS.audioPlay("fx_click");
    PS.statusText("RECORDING IN: " + variables.countdownTimerCount);
    variables.countdownTimerCount--;
  } else {
    PS.statusText("RECORDING");
    PS.timerStop(variables.countdownTimer);
    variables.recordInfo = true;
    variables.timer = setInterval(intervalTimerLoop, 10);
  }
}

function startRecording(arrayPos) {
  variables.arrayLoc = arrayPos;
  variables.currentTime = 0;
  variables.dataArray[variables.arrayLoc] = [];
  variables.countdownTimer = PS.timerStart(60, recordingCountdown);
}

function intervalTimerLoop() {
  variables.countdownTimer = 3;
  if (variables.currentTime < variables.maxSeconds) {
    variables.currentTime += 10;
  } else {
    clearInterval(variables.timer);
    variables.recordInfo = false;
    variables.recordingPiano = false;
    PS.statusText("FINISHED RECORDING");
    variables.currentTime = 0;
    variables.countdownTimerCount = 3;
  }
}

function recordData(data, timing) {
  //RESTIRCT TO PIANO
  if (variables.recordingPiano) {
    if (data.data <= 7) {
      if (!isNaN(data.data)) {
        variables.dataArray[variables.arrayLoc].push({
          noteVal: data.data,
          timeVal: timing
        });
      }
    }
  } else {
    if (data.data > 7) {
      if (!isNaN(data.data)) {
        variables.dataArray[variables.arrayLoc].push({
          noteVal: data.data,
          timeVal: timing
        });
      }
    }
  }
}

function playBackData(arrayPos) {
  if (!variables.playingBack) {
    variables.playingBack = true;
    variables.arrayLoc = arrayPos;
    variables.currentPlaybackTime = 0;
    variables.playbackLength = [];
    variables.playbackIndicies = [0, 0, 0, 0, 0, 0, 0, 0];
    variables.maxLength = 0;
    //IF PIANO
    if (arrayPos === "PIANO") {
      for (var i = 0; i < 4; i++) {
        if (variables.dataArray[i].length > variables.maxLength) {
          variables.maxLength = variables.dataArray[i].length;
        }
        variables.playbackLength.push(variables.dataArray[i].length);
      }
    }
    //IF DRUMS
    if (arrayPos === "DRUMS") {
      variables.playbackLength.push(0);
      variables.playbackLength.push(0);
      variables.playbackLength.push(0);
      variables.playbackLength.push(0);
      for (var i = 4; i < 8; i++) {
        if (variables.dataArray[i].length > variables.maxLength) {
          variables.maxLength = variables.dataArray[i].length;
        }
        variables.playbackLength.push(variables.dataArray[i].length);
      }
    }
    //IF BOTH
    if (arrayPos === "ALL") {
      for (var i = 0; i < variables.dataArray.length; i++) {
        if (variables.dataArray[i].length > variables.maxLength) {
          variables.maxLength = variables.dataArray[i].length;
        }
        variables.playbackLength.push(variables.dataArray[i].length);
      }
    }
    variables.timeRemaining = variables.maxSeconds;
    variables.playbackTimer = setInterval(playbackSound, 10);
  }
}

function playbackSound() {
  //PLAY SINGLE TRACK
  if (
    variables.arrayLoc !== "PIANO" &&
    variables.arrayLoc !== "DRUMS" &&
    variables.arrayLoc !== "ALL"
  ) {
    if (
      variables.currentPlaybackIndex <
      variables.dataArray[variables.arrayLoc].length
    ) {
      if (
        variables.dataArray[variables.arrayLoc][variables.currentPlaybackIndex]
          .timeVal === variables.currentPlaybackTime
      ) {
        playAudio(
          variables.dataArray[variables.arrayLoc][
            variables.currentPlaybackIndex
          ].noteVal
        );
        variables.currentPlaybackIndex++;
      }
      variables.currentPlaybackTime += 10;
    } else {
      variables.playingBack = false;
      variables.currentPlaybackTime = 0;
      variables.currentPlaybackIndex = 0;
      PS.statusText("FINISHED PLAYBACK");
      clearInterval(variables.playbackTimer);
    }
  }
  //PLAY ALL PIANO
  else if (variables.arrayLoc === "PIANO") {
    for (var i = 0; i < 4; i++) {
      if (variables.playbackIndicies[i] < variables.playbackLength[i]) {
        if (
          variables.dataArray[i][variables.playbackIndicies[i]].timeVal ===
          variables.currentPlaybackTime
        ) {
          playAudio(
            variables.dataArray[i][variables.playbackIndicies[i]].noteVal
          );
          variables.playbackIndicies[i]++;
        }
        if (variables.playbackIndicies[i] === variables.maxLength) {
          variables.playingBack = false;
          variables.currentPlaybackTime = 0;
          PS.statusText("FINISHED PLAYBACK");
          clearInterval(variables.playbackTimer);
        }
      }
    }
    variables.currentPlaybackTime += 10;
  }
  //PLAY ALL DRUMS
  else if (variables.arrayLoc === "DRUMS") {
    for (var i = 4; i < 8; i++) {
      if (variables.playbackIndicies[i] < variables.playbackLength[i]) {
        if (
          variables.dataArray[i][variables.playbackIndicies[i]].timeVal ===
          variables.currentPlaybackTime
        ) {
          playAudio(
            variables.dataArray[i][variables.playbackIndicies[i]].noteVal
          );
          variables.playbackIndicies[i]++;
        }
        if (variables.playbackIndicies[i] === variables.maxLength) {
          //END PLAYBACK
          variables.playingBack = false;
          variables.currentPlaybackTime = 0;
          PS.statusText("FINISHED PLAYBACK");
          clearInterval(variables.playbackTimer);
        }
      }
    }
    variables.currentPlaybackTime += 10;
  }
  //PLAY BOTH
  else if (variables.arrayLoc === "ALL") {
    for (var i = 0; i < 8; i++) {
      if (variables.playbackIndicies[i] < variables.playbackLength[i]) {
        if (
          variables.dataArray[i][variables.playbackIndicies[i]].timeVal ===
          variables.currentPlaybackTime
        ) {
          playAudio(
            variables.dataArray[i][variables.playbackIndicies[i]].noteVal
          );
          variables.playbackIndicies[i]++;
        }
        if (variables.playbackIndicies[i] === variables.maxLength) {
          //END PLAYBACK
          variables.playingBack = false;
          variables.currentPlaybackTime = 0;
          PS.statusText("FINISHED PLAYBACK");
          clearInterval(variables.playbackTimer);
        }
      }
    }
    variables.currentPlaybackTime += 10;
  }
}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
//PIANO FUNCTIONS

function pianoSetup() {
  /*for (var i = 0; i < 32; i++) {
        PS.visible(i, 8, false);
    }*/
  //PIANO
  for (var i = 0; i < 32; i++) {
    for (var j = 9; j < 17; j++) {
      PS.border(i, j, 0);
    }
  }

  for (var i = 0; i < 32; i++) {
    PS.visible(i, 8, false);
    PS.border(i, 9, {
      top: 2,
      left: 0,
      bottom: 0,
      right: 0
    });
  }

  for (var i = 9; i < 13; i++) {
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

  for (var i = 9; i < 17; i++) {
    for (var j = 2; j < 24; j += 3) {
      PS.border(j, i, {
        right: 2
      });
    }
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
    for (var j = 9; j < 17; j++) {
      PS.data(i, j, [0]);
    }
  }
  for (var i = 14; i < 17; i++) {
    PS.data(2, i, [0]);
  }

  //C#
  for (var i = 2; i < 4; i++) {
    for (var j = 9; j < 14; j++) {
      PS.color(i, j, PS.COLOR_BLACK);
      PS.data(i, j, [0.5]);
    }
  }

  //D
  for (var i = 4; i < 5; i++) {
    for (var j = 9; j < 17; j++) {
      PS.data(i, j, [1]);
    }
  }
  for (var i = 3; i < 6; i++) {
    for (var j = 14; j < 17; j++) {
      PS.data(i, j, [1]);
    }
  }

  //D#
  for (var i = 5; i < 7; i++) {
    for (var j = 9; j < 14; j++) {
      PS.color(i, j, PS.COLOR_BLACK);
      PS.data(i, j, [1.5]);
    }
  }

  //E
  for (var i = 7; i < 9; i++) {
    for (var j = 9; j < 17; j++) {
      PS.data(i, j, [2]);
    }
  }
  for (var i = 6; i < 9; i++) {
    for (var j = 14; j < 17; j++) {
      PS.data(i, j, [2]);
    }
  }

  //F
  for (var i = 9; i < 11; i++) {
    for (var j = 9; j < 17; j++) {
      PS.data(i, j, [3]);
    }
  }
  for (var i = 9; i < 12; i++) {
    for (var j = 14; j < 17; j++) {
      PS.data(i, j, [3]);
    }
  }

  //F#
  for (var i = 11; i < 13; i++) {
    for (var j = 9; j < 14; j++) {
      PS.color(i, j, PS.COLOR_BLACK);
      PS.data(i, j, [3.5]);
    }
  }

  //G
  for (var j = 9; j < 14; j++) {
    PS.data(13, j, [4]);
  }
  for (var i = 12; i < 15; i++) {
    for (var j = 14; j < 17; j++) {
      PS.data(i, j, [4]);
    }
  }

  //G#
  for (var i = 14; i < 16; i++) {
    for (var j = 9; j < 14; j++) {
      PS.color(i, j, PS.COLOR_BLACK);
      PS.data(i, j, [4.5]);
    }
  }

  //A
  for (var j = 9; j < 17; j++) {
    PS.data(16, j, [5]);
  }
  for (var i = 15; i < 18; i++) {
    for (var j = 14; j < 17; j++) {
      PS.data(i, j, [5]);
    }
  }

  //A#
  for (var i = 17; i < 19; i++) {
    for (var j = 9; j < 14; j++) {
      PS.color(i, j, PS.COLOR_BLACK);
      PS.data(i, j, [5.5]);
    }
  }

  //B
  for (var i = 19; i < 21; i++) {
    for (var j = 9; j < 17; j++) {
      PS.data(i, j, [6]);
    }
  }
  for (var i = 18; i < 21; i++) {
    for (var j = 14; j < 17; j++) {
      PS.data(i, j, [6]);
    }
  }

  //C
  for (var i = 21; i < 24; i++) {
    for (var j = 9; j < 17; j++) {
      PS.data(i, j, [7]);
    }
  }

  //RECORDING AREA
  PS.visible(24, 9, false);
  PS.glyph(25, 9, "R");
  PS.glyph(26, 9, "E");
  PS.glyph(27, 9, "C");
  PS.glyph(28, 9, "O");
  PS.glyph(29, 9, "R");
  PS.glyph(30, 9, "D");
  PS.visible(31, 9, false);

  for (var i = 24; i < 32; i++) {
    for (var j = 10; j < 12; j++) {
      PS.color(i, j, PS.COLOR_RED);
    }
  }

  for (var j = 10; j < 12; j++) {
    PS.border(25, j, { right: 1 });
    PS.border(27, j, { right: 1 });
    PS.border(29, j, { right: 1 });
  }

  PS.visible(24, 12, false);
  PS.glyph(25, 12, "T");
  PS.glyph(26, 12, "R");
  PS.glyph(27, 12, "A");
  PS.glyph(28, 12, "C");
  PS.glyph(29, 12, "K");
  PS.glyph(30, 12, "S");
  PS.visible(31, 12, false);

  for (var i = 24; i < 32; i++) {
    for (var j = 13; j < 15; j++) {
      PS.color(i, j, PS.COLOR_GREEN);
    }
  }

  for (var j = 13; j < 15; j++) {
    PS.border(25, j, { right: 1 });
    PS.border(27, j, { right: 1 });
    PS.border(29, j, { right: 1 });
  }

  PS.visible(24, 15, false);
  PS.visible(25, 15, false);
  PS.glyph(26, 15, "P");
  PS.glyph(27, 15, "L");
  PS.glyph(28, 15, "A");
  PS.glyph(29, 15, "Y");
  PS.visible(30, 15, false);
  PS.visible(31, 15, false);

  for (var i = 24; i < 32; i++) {
    for (var j = 16; j < 17; j++) {
      PS.color(i, j, PS.COLOR_BLUE);
      PS.data(i, j, ["PALL"]);
    }
  }

  //R1
  for (var i = 24; i < 26; i++) {
    for (var j = 10; j < 12; j++) {
      PS.data(i, j, ["R1"]);
    }
  }

  //R2
  for (var i = 26; i < 28; i++) {
    for (var j = 10; j < 12; j++) {
      PS.data(i, j, ["R2"]);
    }
  }

  //R3
  for (var i = 28; i < 30; i++) {
    for (var j = 10; j < 12; j++) {
      PS.data(i, j, ["R3"]);
    }
  }

  //R4
  for (var i = 30; i < 32; i++) {
    for (var j = 10; j < 12; j++) {
      PS.data(i, j, ["R4"]);
    }
  }

  //P1
  for (var i = 24; i < 26; i++) {
    for (var j = 13; j < 16; j++) {
      PS.data(i, j, ["P1"]);
    }
  }

  //P2
  for (var i = 26; i < 28; i++) {
    for (var j = 13; j < 16; j++) {
      PS.data(i, j, ["P2"]);
    }
  }

  //P3
  for (var i = 28; i < 30; i++) {
    for (var j = 13; j < 16; j++) {
      PS.data(i, j, ["P3"]);
    }
  }

  //P4
  for (var i = 30; i < 32; i++) {
    for (var j = 13; j < 16; j++) {
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
  //TODO BETTER COLORS

  //VERTICAL is 14 to 23
  //DRUMS
  for (var i = 0; i < 32; i++) {
    for (var j = 0; j < 8; j++) {
      PS.border(i, j, 0);
    }
  }

  //hihat
  for (var i = 0; i < 4; i++) {
    PS.color(i, 0, PS.COLOR_YELLOW);
    PS.data(i, 0, [14]);
  }
  PS.border(0, 0, { top: 1, bottom: 1, left: 1 });
  PS.border(1, 0, { top: 1, bottom: 1 });
  PS.border(2, 0, { top: 1, bottom: 1 });
  PS.border(3, 0, { top: 1, bottom: 1, right: 1 });
  for (var i = 1; i < 8; i++) {
    PS.border(1, i, { right: 1 });
  }

  //crash
  for (var i = 13; i < 17; i++) {
    PS.color(i, 0, PS.COLOR_YELLOW);
    PS.data(i, 0, [17]);
  }
  PS.border(13, 0, { top: 1, bottom: 1, left: 1 });
  PS.border(14, 0, { top: 1, bottom: 1 });
  PS.border(15, 0, { top: 1, bottom: 1 });
  PS.border(16, 0, { top: 1, bottom: 1, right: 1 });
  for (var i = 1; i < 8; i++) {
    PS.border(14, i, { right: 1 });
  }

  //tom 1
  for (var i = 4; i < 7; i++) {
    for (var j = 1; j < 4; j++) {
      PS.color(i, j, PS.COLOR_MAGENTA);
      PS.data(i, j, [10]);
    }
  }
  for (var i = 4; i < 7; i++) {
    PS.color(i, 1, PS.COLOR_GRAY_LIGHT);
  }

  PS.border(4, 1, { top: 1, left: 1 });
  PS.border(5, 1, { top: 1 });
  PS.border(6, 1, { top: 1, right: 1 });
  PS.border(4, 2, { left: 1 });
  PS.border(6, 2, { right: 1 });
  PS.border(4, 3, { bottom: 1, left: 1 });
  PS.border(5, 3, { bottom: 1 });
  PS.border(6, 3, { bottom: 1, right: 1 });

  //tom 2
  for (var i = 10; i < 13; i++) {
    for (var j = 1; j < 4; j++) {
      PS.color(i, j, PS.COLOR_MAGENTA);
      PS.data(i, j, [11]);
    }
  }
  for (var i = 10; i < 13; i++) {
    PS.color(i, 1, PS.COLOR_GRAY_LIGHT);
  }

  PS.border(10, 1, { top: 1, left: 1 });
  PS.border(11, 1, { top: 1 });
  PS.border(12, 1, { top: 1, right: 1 });
  PS.border(10, 2, { left: 1 });
  PS.border(12, 2, { right: 1 });
  PS.border(10, 3, { bottom: 1, left: 1 });
  PS.border(11, 3, { bottom: 1 });
  PS.border(12, 3, { bottom: 1, right: 1 });

  //snare
  for (var i = 3; i < 6; i++) {
    for (var j = 4; j < 7; j++) {
      PS.color(i, j, PS.COLOR_MAGENTA);
      PS.data(i, j, [9]);
    }
  }
  for (var i = 3; i < 6; i++) {
    PS.color(i, 4, PS.COLOR_GRAY_LIGHT);
  }
  PS.border(3, 4, { top: 1, left: 1 });
  PS.border(4, 4, { top: 1 });
  PS.border(5, 4, { top: 1, right: 1 });
  PS.border(3, 5, { left: 1 });
  PS.border(5, 5, { right: 1 });
  PS.border(3, 6, { bottom: 1, left: 1 });
  PS.border(4, 6, { bottom: 1 });
  PS.border(5, 6, { bottom: 1, right: 1 });

  //tom 3
  for (var i = 11; i < 14; i++) {
    for (var j = 4; j < 7; j++) {
      PS.color(i, j, PS.COLOR_MAGENTA);
      PS.data(i, j, [13]);
    }
  }
  for (var i = 11; i < 14; i++) {
    PS.color(i, 4, PS.COLOR_GRAY_LIGHT);
  }
  PS.border(11, 4, { top: 1, left: 1 });
  PS.border(12, 4, { top: 1 });
  PS.border(13, 4, { top: 1, right: 1 });
  PS.border(11, 5, { left: 1 });
  PS.border(13, 5, { right: 1 });
  PS.border(11, 6, { bottom: 1, left: 1 });
  PS.border(12, 6, { bottom: 1 });
  PS.border(13, 6, { bottom: 1, right: 1 });

  //kick
  for (var i = 6; i < 11; i++) {
    for (var j = 4; j < 8; j++) {
      PS.color(i, j, PS.COLOR_MAGENTA);
      PS.data(i, j, [8]);
    }
  }
  for (var i = 7; i < 10; i++) {
    for (var j = 5; j < 7; j++) {
      PS.color(i, j, PS.COLOR_GRAY_LIGHT);
    }
  }
  PS.border(6, 4, { top: 1, left: 1 });
  PS.border(7, 4, { top: 1 });
  PS.border(8, 4, { top: 1 });
  PS.border(9, 4, { top: 1 });
  PS.border(10, 4, { top: 1, right: 1 });
  PS.border(6, 5, { left: 1 });
  PS.border(10, 5, { right: 1 });
  PS.border(6, 6, { left: 1 });
  PS.border(10, 6, { right: 1 });
  PS.border(6, 7, { left: 1 });
  PS.border(10, 7, { right: 1 });
  PS.border(6, 8, { bottom: 1, left: 1 });
  PS.border(7, 8, { bottom: 1 });
  PS.border(8, 8, { bottom: 1 });
  PS.border(9, 8, { bottom: 1 });
  PS.border(10, 8, { bottom: 1, right: 1 });

  //RECORDING AREA

  PS.visible(24, 0, false);
  PS.glyph(25, 0, "R");
  PS.glyph(26, 0, "E");
  PS.glyph(27, 0, "C");
  PS.glyph(28, 0, "O");
  PS.glyph(29, 0, "R");
  PS.glyph(30, 0, "D");
  PS.visible(31, 0, false);

  for (var i = 24; i < 32; i++) {
    for (var j = 1; j < 3; j++) {
      PS.color(i, j, PS.COLOR_RED);
    }
  }

  for (var j = 1; j < 3; j++) {
    PS.border(25, j, { right: 1 });
    PS.border(27, j, { right: 1 });
    PS.border(29, j, { right: 1 });
  }

  PS.visible(24, 3, false);
  PS.glyph(25, 3, "T");
  PS.glyph(26, 3, "R");
  PS.glyph(27, 3, "A");
  PS.glyph(28, 3, "C");
  PS.glyph(29, 3, "K");
  PS.glyph(30, 3, "S");
  PS.visible(31, 3, false);

  for (var i = 24; i < 32; i++) {
    for (var j = 4; j < 6; j++) {
      PS.color(i, j, PS.COLOR_GREEN);
    }
  }

  for (var j = 4; j < 6; j++) {
    PS.border(25, j, { right: 1 });
    PS.border(27, j, { right: 1 });
    PS.border(29, j, { right: 1 });
  }

  PS.visible(24, 6, false);
  PS.visible(25, 6, false);
  PS.glyph(26, 6, "P");
  PS.glyph(27, 6, "L");
  PS.glyph(28, 6, "A");
  PS.glyph(29, 6, "Y");
  PS.visible(30, 6, false);
  PS.visible(31, 6, false);

  for (var i = 24; i < 32; i++) {
    for (var j = 7; j < 8; j++) {
      PS.color(i, j, PS.COLOR_BLUE);
      PS.data(i, j, ["DALL"]);
    }
  }

  //R1
  for (var i = 24; i < 26; i++) {
    for (var j = 1; j < 3; j++) {
      PS.data(i, j, ["DR1"]);
    }
  }

  //R2
  for (var i = 26; i < 28; i++) {
    for (var j = 1; j < 3; j++) {
      PS.data(i, j, ["DR2"]);
    }
  }

  //R3
  for (var i = 28; i < 30; i++) {
    for (var j = 1; j < 3; j++) {
      PS.data(i, j, ["DR3"]);
    }
  }

  //R4
  for (var i = 30; i < 32; i++) {
    for (var j = 1; j < 3; j++) {
      PS.data(i, j, ["DR4"]);
    }
  }

  //P1
  for (var i = 24; i < 26; i++) {
    for (var j = 4; j < 6; j++) {
      PS.data(i, j, ["DP1"]);
    }
  }

  //P2
  for (var i = 26; i < 28; i++) {
    for (var j = 4; j < 6; j++) {
      PS.data(i, j, ["DP2"]);
    }
  }

  //P3
  for (var i = 28; i < 30; i++) {
    for (var j = 4; j < 6; j++) {
      PS.data(i, j, ["DP3"]);
    }
  }

  //P4
  for (var i = 30; i < 32; i++) {
    for (var j = 4; j < 6; j++) {
      PS.data(i, j, ["DP4"]);
    }
  }

  ////////////////////////
  //TOGGLE DRUM SOUNDS
  /*for (var i = 17; i < 24; i++) {
        for (var j = 0; j < 8; j++) {
            PS.color(i, j, PS.COLOR_BLACK)
        }
    }*/
  PS.glyph(17, 0, "H");
  PS.glyph(18, 0, "I");
  PS.glyph(19, 0, "H");
  PS.glyph(20, 0, "A");
  PS.glyph(21, 0, "T");
  PS.glyph(22, 0, ":");
  PS.glyph(17, 1, "1");
  PS.glyph(19, 1, "2");
  PS.glyph(21, 1, "3");
  PS.data(17, 1, ["H1"]);
  PS.data(19, 1, ["H2"]);
  PS.data(21, 1, ["H3"]);

  PS.glyph(17, 2, "C");
  PS.glyph(18, 2, "R");
  PS.glyph(19, 2, "A");
  PS.glyph(20, 2, "S");
  PS.glyph(21, 2, "H");
  PS.glyph(22, 2, ":");
  PS.glyph(17, 3, "1");
  PS.glyph(19, 3, "2");
  PS.glyph(21, 3, "3");
  PS.glyph(23, 3, "4");
  PS.data(17, 3, ["C1"]);
  PS.data(19, 3, ["C2"]);
  PS.data(21, 3, ["C3"]);
  PS.data(23, 3, ["C4"]);

  PS.glyph(17, 4, "L");
  PS.glyph(18, 4, " ");
  PS.glyph(19, 4, "T");
  PS.glyph(20, 4, "O");
  PS.glyph(21, 4, "M");
  PS.glyph(22, 4, ":");
  PS.glyph(17, 5, "1");
  PS.glyph(19, 5, "2");
  PS.data(17, 5, ["L1"]);
  PS.data(19, 5, ["L2"]);

  PS.glyph(17, 6, "R");
  PS.glyph(18, 6, " ");
  PS.glyph(19, 6, "T");
  PS.glyph(20, 6, "O");
  PS.glyph(21, 6, "M");
  PS.glyph(22, 6, ":");
  PS.glyph(17, 7, "1");
  PS.glyph(19, 7, "2");
  PS.data(17, 7, ["TR1"]);
  PS.data(19, 7, ["TR2"]);
}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
//SOUND PLAYBACK FUNCTION
function playAudio(data) {
  switch (data) {
    //PIANO
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
        variables.recordingPiano = true;
        startRecording(0);
      }
      break;
    case "R2":
      if (!variables.recordInfo) {
        variables.recordingPiano = true;
        startRecording(1);
      }
      break;
    case "R3":
      if (!variables.recordInfo) {
        variables.recordingPiano = true;
        startRecording(2);
      }
      break;
    case "R4":
      if (!variables.recordInfo) {
        variables.recordingPiano = true;
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
      }
      break;
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
        playBackData("PIANO");
      }
      break;
    //DRUMS
    case 8:
      PS.audioPlay("perc_drum_bass");
      break;
    case 9:
      PS.audioPlay("perc_drum_snare");
      break;
    case 10:
      PS.audioPlay("perc_drum_tom1");
      break;
    case 11:
      PS.audioPlay("perc_drum_tom2");
      break;
    case 12:
      PS.audioPlay("perc_drum_tom3");
      break;
    case 13:
      PS.audioPlay("perc_drum_tom4");
      break;
    case 14:
      PS.audioPlay("perc_hihat_closed");
      break;
    case 15:
      PS.audioPlay("perc_hihat_open");
      break;
    case 16:
      PS.audioPlay("perc_hihat_pedal");
      break;
    case 17:
      PS.audioPlay("perc_cymbal_crash1");
      break;
    case 18:
      PS.audioPlay("perc_cymbal_crash2");
      break;
    case 19:
      PS.audioPlay("perc_cymbal_crash3");
      break;
    case 20:
      PS.audioPlay("perc_cymbal_crash4");
      break;
    //DRUM REPROGRAM
    case "H1":
      for (var i = 0; i < 4; i++) {
        PS.data(i, 0, [14]);
      }
      break;
    case "H2":
      for (var i = 0; i < 4; i++) {
        PS.data(i, 0, [15]);
      }
      break;
    case "H3":
      for (var i = 0; i < 4; i++) {
        PS.data(i, 0, [16]);
      }
      break;
    case "C1":
      for (var i = 13; i < 17; i++) {
        PS.data(i, 0, [17]);
      }
      break;
    case "C2":
      for (var i = 13; i < 17; i++) {
        PS.data(i, 0, [18]);
      }
      break;
    case "C3":
      for (var i = 13; i < 17; i++) {
        PS.data(i, 0, [19]);
      }
      break;
    case "C4":
      for (var i = 13; i < 17; i++) {
        PS.data(i, 0, [20]);
      }
      break;
    case "L1":
      for (var i = 4; i < 7; i++) {
        for (var j = 1; j < 4; j++) {
          PS.data(i, j, [10]);
        }
      }
      break;
    case "L2":
      for (var i = 4; i < 7; i++) {
        for (var j = 1; j < 4; j++) {
          PS.data(i, j, [11]);
        }
      }
      break;
    case "TR1":
      for (var i = 10; i < 13; i++) {
        for (var j = 1; j < 4; j++) {
          PS.data(i, j, [11]);
        }
      }
      break;
    case "TR2":
      for (var i = 10; i < 13; i++) {
        for (var j = 1; j < 4; j++) {
          PS.data(i, j, [12]);
        }
      }
      break;

    //DRUM RECORDING
    case "DR1":
      if (!variables.recordInfo) {
        variables.recordingPiano = false;
        startRecording(4);
      }
      break;
    case "DR2":
      if (!variables.recordInfo) {
        variables.recordingPiano = false;
        startRecording(5);
      }
      break;
    case "DR3":
      if (!variables.recordInfo) {
        variables.recordingPiano = false;
        startRecording(6);
      }
      break;
    case "DR4":
      if (!variables.recordInfo) {
        variables.recordingPiano = false;
        startRecording(7);
      }
      break;
    case "DP1":
      if (!variables.playingBack) {
        playBackData(4);
      }
      break;
    case "DP2":
      if (!variables.playingBack) {
        playBackData(5);
      }
      break;
    case "DP3":
      if (!variables.playingBack) {
        playBackData(6);
      }
      break;
    case "DP4":
      if (!variables.playingBack) {
        playBackData(7);
      }
      break;
    case "DALL":
      if (!variables.playingBack) {
        playBackData("DRUMS");
      }
      break;
    //TOTAL AUDIO
    case "ALL":
      if (!variables.playingBack) {
        playBackData("ALL");
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
function loadTrack() {
  variables.dataArray = document.getElementById("songDropdown").value;
}

//SAVE SONG
function saveTrack() {
  //SAVE TRACK NAME
  //TRACK IS variables.dataArray
  var trackName = "NONE";
  PS.statusInput("Track name:", function(text) {
    trackName = text;
    let body = {
      songname: trackName,
      songdata: variables.dataArray,
      username: getCookie("TestCookie")
    };
    let json = JSON.stringify(body);
    fetch("/addSong", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json
    }).then(function(res) {
      console.log(res);
      if (res.status === 200) {
        window.alert("Successfully added to database");
        loadSongs()
      }
    });
  });
}

function getCookie(name) {
  var re = new RegExp(name + "=([^;]+)");
  var val = re.exec(document.cookie);
  return val != null ? unescape(val[1]) : null;
}


function loadSongs() {
  var select = document.getElementById("songDropdown");
  select.innerHTML = "";
  fetch("/allData", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
    .then(function(ret) {
      return ret.json();
    })
    .then(function(res) {
      console.log(res);
      
      res.forEach(function(single) {
        console.log("LOOPING")
        var opt = document.createElement('option')
        console.log(single.songdata)
        opt.value = single.songdata.toString()
        opt.label = single.songname + " by " + single.username
        select.appendChild(opt)
      });
    });
}

