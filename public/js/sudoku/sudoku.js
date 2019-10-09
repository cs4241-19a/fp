let start1 = [0,0,0,2,6,0,7,0,1,
              6,8,0,0,7,0,0,9,0,
              1,9,0,0,0,4,5,0,0,
              8,2,0,1,0,0,0,4,0,
              0,0,4,6,0,2,9,0,0,
              0,5,0,0,0,3,0,2,8,
              0,0,9,3,0,0,0,7,4,
              0,4,0,0,5,0,0,3,6,
              7,0,3,0,1,8,0,0,0];
let start2 = [  1,0,0,4,8,9,0,0,6,
                7,3,0,0,0,0,0,4,0,
                0,0,0,0,0,1,2,9,5,
                0,0,7,1,2,0,6,0,0,
                5,0,0,7,0,3,0,0,8,
                0,0,6,0,9,5,7,0,0,
                9,1,4,6,0,0,0,0,0,
                0,2,0,0,0,0,0,3,7,
                8,0,0,5,1,2,0,0,4];
let start3 = [  0,2,0,6,0,8,0,0,0,
                5,8,0,0,0,9,7,0,0,
                0,0,0,0,4,0,0,0,0,
                3,7,0,0,0,0,5,0,0,
                6,0,0,0,0,0,0,0,4,
                0,0,8,0,0,0,0,1,3,
                0,0,0,0,2,0,0,0,0,
                0,0,9,8,0,0,0,3,6,
                0,0,0,3,0,6,0,9,0];

let possibleStarts = [start1,start2,start3];

let done1 = [4,3,5,2,6,9,7,8,1,
            6,8,2,5,7,1,4,9,3,
            1,9,7,8,3,4,5,6,2,
            8,2,6,1,9,5,3,4,7,
            3,7,4,6,8,2,9,1,5,
            9,5,1,7,4,3,6,2,8,
            5,1,9,3,2,6,8,7,4,
            2,4,8,9,5,7,1,3,6,
            7,6,3,4,1,8,2,5,9];
let done2 = [1,5,2,4,8,9,3,7,6,
            7,3,9,2,5,6,8,4,1,
            4,6,8,3,7,1,2,9,5,
            3,8,7,1,2,4,6,5,9,
            5,9,1,7,6,3,4,2,8,
            2,4,6,8,9,5,7,1,3,
            9,1,4,6,3,7,5,8,2,
            6,2,5,9,4,8,1,3,7,
            8,7,3,5,1,2,9,6,4];
let done3 = [1,2,3,6,7,8,9,4,5,
            5,8,4,2,3,9,7,6,1,
            9,6,7,1,4,5,3,2,8,
            3,7,2,4,6,1,5,8,9,
            6,9,1,5,8,3,2,7,4,
            4,5,8,7,9,2,6,1,3,
            8,3,6,9,2,4,1,5,7,
            2,1,9,8,5,7,4,3,6,
            7,4,5,3,1,6,8,9,2];

let possibleDones = [done1,done2,done3];

let currentPuzzle=0;

let time = 0;
/**
 * Starts a timer
 */
let seconds = setInterval(function(){
    time += 1;

    let minutes = Math.floor(time/60);
    let seconds = Math.floor(time%60);

    if(seconds > 9){
        document.getElementById('timer').innerText = "Time " + minutes + ":" + seconds;
    }else {
        document.getElementById('timer').innerText = "Time " + minutes + ":0" + seconds;
    }
},1000);

/**
 * loads the sudoku board from a random start position
 */
function load(){
    for(let i=1;i<=81;i++){
        let elem = document.querySelector('#cell-'+i+' input');
        elem.disabled = false;
        elem.value = '';
    }
    currentPuzzle = Math.floor((Math.random()*3));
    for(let i=1;i<=81;i++){
        let elem = document.querySelector('#cell-'+i+' input');
        elem.onchange = checkComplete;
        if(possibleStarts[currentPuzzle][i-1]!==0){
            elem.disabled = true;
            elem.value = possibleStarts[currentPuzzle][i-1];
        }
    }
}

load();

/**
 * checks if the puzzle is solved
 *
 * @returns {boolean} true if finished, false if not
 */
function checkComplete(){
    for(let i=1;i<=81;i++){
        let elem = document.querySelector('#cell-'+i+' input');
        if(parseInt(elem.value) !== possibleDones[currentPuzzle][i-1]) {
            console.log('not solved');
            return false;
        }
    }
    console.log('solved');
    stopTimer();
    document.getElementById('win').style.display='block';
    document.getElementById('playAgain').style.display='block';

    const scoreModel = $("#gameScoreFormModal");
    attachHeading(`Time: ${time} seconds`);
    //scoreModel.on("hidden.bs.modal", load);
    attachSubmit({score: time}, () => {
        scoreModel.modal("hide");
    });
    scoreModel.modal("show");  // user jQuery to show the modal

    return true;
}

/**
 * stops the timer
 */
function stopTimer(){
    clearTimeout(seconds);
}

/**
 * makes sure the keyboard input
 * is correct. Only numbers 1-9
 *
 * @param {e} the keyboard event
 */
function validate(e){
    var theEvent = e || window.e;
    // Handle key press
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[1-9]|\./;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

/**
 * reloads the page
 */
function playAgain(){
    location.reload();
}