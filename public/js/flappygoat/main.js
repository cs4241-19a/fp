
const FPS = 30;
const GOAT_SIZE = 80; // height in pixels
const TEXT_SIZE = 40; // text font height in pixels
const DEBUG_MODE = false; // develop debug mode

/** @type {HTMLCanvasElement} */
let canv = document.getElementById("gameCanvas");
let ctx = canv.getContext("2d");
let goatImg = new Image();
let skyImg = new Image();
goatImg.src = "/assets/flappyGoat/flappyGoat.png";
skyImg.src = "/assets/flappyGoat/bluesky.jpg";



// set up game params
let goat, pipes, score, text, go, count;
pipes = [];
newGame();


// event handlers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// set up game loop
setInterval(update, 1000 / FPS);


function addPipe() {
    pipes.push(newPipe(canv.width));
}


function destroyPipe(index) {
    pipes.splice(index, 1);
}



function drawGoat(x, y) {
    ctx.drawImage(goatImg, x, y);
}


function gameOver() {
    go = false;
    goat.dead = true;
    text = "Game Over";
    const scoreModel = $("#gameScoreFormModal");
    attachHeading(`Score: ${score} point(s)`);
    //scoreModel.on("hidden.bs.modal", load);
    attachSubmit({score: score}, () => {
        scoreModel.modal("hide");
    });
    scoreModel.modal("show");  // user jQuery to show the modal
    newGame();
}

function keyDown(/** @type {KeyboardEvent}  */ ev){

    if(goat.dead) {
        return;
    }

    if (ev.keyCode === 32) {
        go = true;
        jump();
        goat.yv = 0;
    }
}

function keyUp(/** @type {KeyboardEvent}  */ ev) {

    if(goat.dead) {
        return;
    }

    if (ev.keyCode === 32) {
        goat.canJump = true;
        jump();
    }
}

function newPipe(x) {
    let space = Math.random() * 300 + 50;
    return {
        x1: x + 25,
        x2: x - 25,
        y1: space,
        y2: space + 150,
        r: 50,
        points: false,
    };
}

function newGame() {
    score = 0;
    count = 0;
    pipes = [];
    goat = newGoat();
}


function newGoat() {
    return {
        x: canv.width / 20,
        y: canv.height / 2,
        r: GOAT_SIZE / 2,
        yv: 0,
        canJump: true,
        dead: false,
        jumpTime: 0,
    };
}

function jump() {
    if(goat.canJump) {
        goat.jumpTime = 5;
    }

    goat.canJump = false;
}



function update() {

    // draw background
    ctx.drawImage(skyImg, 0, 0);


    // draw goat
    if(!goat.dead) {
        drawGoat(goat.x, goat.y);
    }

    // stop everything if space hasn't been pressed
    if(!go){
        return;
    }

    // make goat fall continually
    goat.y += (1 + goat.yv);
    goat.yv += 0.05;
    count++;

    if(count % 75 === 0) {
        addPipe();
    }



    // draw the pipes
    let x1, x2, y1, y2;
    for(let i = 0; i < pipes.length; i++) {

        // get pipe properties
        x1 = pipes[i].x1;
        x2 = pipes[i].x2;
        y1 = pipes[i].y1;
        y2 = pipes[i].y2;


        ctx.fillStyle = "green";

        // draw upper pipe
        ctx.fillRect(x1, 0, 50, y1);

        // draw lower pipe
        ctx.fillRect(x1, y2, 50, canv.height - y2);


    }


    // draw the score
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.font = TEXT_SIZE + "px dejavu sans mono";
    ctx.fillText(score, canv.width - 10, 40);

    // test dots
    if(DEBUG_MODE) {
        ctx.fillStyle = "red";
        ctx.fillRect(goat.x + 30, goat.y + 10, 2, 2);
        ctx.fillStyle = "blue";
        ctx.fillRect(goat.x + 80, goat.y + 70, 2, 2);
    }

    // check for pipe collision
    if(!goat.dead) {
        for (let i = 0; i < pipes.length; i++) {
            //console.log(goat.x >= pipes[i].x1);
            if ((goat.x + 30) >= pipes[i].x1 && (goat.x + 30) <= (pipes[i].x1 + 50) && ((goat.y + 10) <= pipes[i].y1 || (goat.y + 70) >= pipes[i].y2)) {
                gameOver();
                break;
            }
            if ((goat.x + 80) >= pipes[i].x1 && (goat.x + 80) <= (pipes[i].x1 + 50) && ((goat.y + 10) <= pipes[i].y1 || (goat.y + 70) >= pipes[i].y2)) {
                gameOver();
                break;
            }

        }
    }


    // jump goat
    if(goat.jumpTime > 0 && !goat.dead) {
        goat.y -= 15;
        goat.jumpTime--;
    }


    // add score for crossing pipe
    for(let i = 0; i < pipes.length; i++) {
        if(goat.x === pipes[i].x1 && !pipes[i].points) {
            score++;
            pipes[i].points = true;
        }
    }

    // kill goat if touches bottom or top
    if(goat.y + goat.r < 0 || goat.y + goat.r > canv.height) {
        gameOver();
    }




    // move the pipes
    for(let i = 0; i < pipes.length; i++) {
        pipes[i].x1 -= 5;

        //handle edge
        if (pipes[i].x1 < 0 - pipes[i].r) {
            destroyPipe(i);
        }
    }



}