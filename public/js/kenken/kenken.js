let done1 = [5,1,3,2,4,
            2,5,1,4,3,
            1,4,2,3,5,
            4,3,5,1,2,
            3,2,4,5,1];
let done2 = [5,4,1,3,2,
            3,2,4,5,1,
            4,3,2,1,5,
            1,5,3,2,4,
            2,1,5,4,3];
let done3 = [2,3,5,1,4,
            3,2,4,5,1,
            4,1,3,2,5,
            5,4,1,3,2,
            1,5,2,4,3];

let possibleDones = [done1,done2,done3];

let currentPuzzle = 0;

/**
 * Loads the game board with a random start position
 */
function load(){
    currentPuzzle = Math.floor((Math.random()*3));
    if(currentPuzzle === 0){
        loadBoard1();
    }else if(currentPuzzle === 1){
        loadBoard2();
    }else{
        loadBoard3();
    }
}

load();

/**
 * sets up board option 1
 */
function loadBoard1(){
    let gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '<table><tr><td id="cell-1" class="up left down"><div style="position:relative"><span>6+</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-2" class="up right down"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-3" class="up down"><div style="position: relative"><span>9+</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-4" class="up down"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-5" class="up right down"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td></tr>'+
                            '<tr><td id="cell-6" class="left right"><div style="position:relative"><span>3+</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-7" class="right down"><div style="position: relative"><span>5</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-8" class="down"><div style="position: relative"><span>5+</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-9" class="down right"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-10" class="right"><div style="position:relative"><span>11+</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td></tr>'+
                            '<tr><td id="cell-11" class="left down right"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-12" class="right"><div style="position:relative"><span>7+</span><input type="text" onkeypress=validate(event)  onchange="checkComplete()" maxlength="1"></div></td><td id="cell-13" class="right"><div style="position: relative"><span>7+</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-14" class="bottom"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-15" class="bottom right"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td></tr>'+
                            '<tr><td id="cell-16" class="left right"><div style="position: relative"><span>7+</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-17" class="bottom right"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-18" class="bottom right"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-19" class="bottom"><div style="position: relative"><span>3+</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-20" class="bottom right"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td></tr>'+
                            '<tr><td id="cell-21" class="left bottom right"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-22" class="bottom top"><div style="position: relative"><span>6+</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-23" class="bottom right top"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-24" class="bottom"><div style="position: relative"><span>6+</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-25" class="bottom right"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td></tr>';
}

/**
 * sets up board option 2
 */
function loadBoard2(){
    let gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '<table><tr><td id="cell-1" class="up left down"><div style="position: relative"><span>9+</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-2" class="up right down"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-3" class="up right"><div style="position: relative"><span>3-</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-4" class="up down"><div style="position: relative"><span>5+</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-5" class="up right down"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td></tr>'+
        '<tr><td id="cell-6" class="left"><div style="position: relative"><span>12+</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-7" class="right"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-8" class="down right"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-9" class="down"><div style="position: relative"><span>4-</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-10" class="right down"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td></tr>'+
        '<tr><td id="cell-11" class="left down"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-12" class="right bottom"><input type="text" onkeypress=validate(event)  onchange="checkComplete()" maxlength="1"></td><td id="cell-13" class="right"><div style="position: relative"><span>10+</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-14" class="right"><div style="position: relative"><span>3+</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-15" class="bottom right"><div style="position: relative"><span>5</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td></tr>'+
        '<tr><td id="cell-16" class="left right"><div style="position: relative"><span>3+</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-17" class="bottom"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-18" class="bottom right"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-19" class="bottom right"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-20" class="right"><div style="position: relative"><span>7+</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td></tr>'+
        '<tr><td id="cell-21" class="left bottom right"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-22" class="bottom right"><div style="position: relative"><span>1</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-23" class="bottom"><div style="position:relative"><span>9+</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-24" class="bottom right"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-25" class="bottom right"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td></tr>';
}

/**
 * sets up board option 3
 */
function loadBoard3(){
    let gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '<table><tr><td id="cell-1" class="up left right"><div style="position: relative"><span>5+</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-2" class="up down"><div style="position: relative"><span>15X</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-3" class="up down right"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-4" class="up down"><div style="position: relative"><span>3-</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-5" class="up right down"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td></tr>'+
        '<tr><td id="cell-6" class="left right down"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-7" class="down"><div style="position: relative"><span>2÷</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-8" class="down right"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-9" class="down"><div style="position: relative"><span>4-</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-10" class="right down"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td></tr>'+
        '<tr><td id="cell-11" class="left right"><div style="position: relative"><span>20X</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-12" class=""><div style="position: relative"><span>12X</span><input type="text" onkeypress=validate(event)  onchange="checkComplete()" maxlength="1"></div></td><td id="cell-13" class="right down"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-14" class="right"><div style="position: relative"><span>12X</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-15" class="bottom right"><div style="position: relative"><span>5</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td></tr>'+
        '<tr><td id="cell-16" class="left right bottom"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-17" class="bottom right"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-18" class="right"><div style="position: relative"><span>2÷</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-19" class="bottom"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-20" class="bottom right"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td></tr>'+
        '<tr><td id="cell-21" class="left bottom"><div style="position: relative"><span>6+</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-22" class="bottom right"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-23" class="bottom right"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td><td id="cell-24" class="bottom"><div style="position: relative"><span>1-</span><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></div></td><td id="cell-25" class="bottom right"><input type="text" onkeypress=validate(event) onchange="checkComplete()" maxlength="1"></td></tr>';
}

/**
 * checks if the puzzle has been solved
 *
 * @returns {boolean} true if complete, false if not
 */
function checkComplete(){
    for(let i=1;i<=25;i++){
        let elem = document.querySelector('#cell-'+i+' input');
        console.log(elem.value + ' '+possibleDones[currentPuzzle][i-1]);
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

let time = 0;
/**
 * increases the timer
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
 * stops the timer
 */
function stopTimer(){
    clearTimeout(seconds);
}

/**
 * validates keyboard input,
 * only allows numbers 1-5
 *
 * @param {e} the keyboard event
 */
function validate(e){
    var theEvent = e || window.e;
    // Handle key press
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[1-5]|\./;
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