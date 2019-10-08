let wins = 0;
let round = 1;
yourOptions = [];
aiOptions = [];

/**
 * Fired when the user makes a choice
 * Decides who won the round and progresses
 * the game
 *
 * @param {option} what the player
 *  chose: rock, paper, or scissors
 */
function makeChoice(option){
    let aiOption = aiChoice();
    yourOptions.push(option);
    aiOptions.push(aiOption);
    let status = '';
    if(option === 'rock'){
        if(aiOption === 'rock'){ //tie
            status = 'tie';
        }else if(aiOption === 'paper'){ //lose
            wins--;
            status = 'lose';
        }else{ //win
            wins++;
            status = 'win';
        }
    }else if(option === 'paper'){
        if(aiOption === 'rock'){ //win
            wins++;
            status = 'win';
        }else if(aiOption === 'paper'){ //tie
            status = 'tie';
        }else{ //lose
            wins--;
            status = 'lose';
        }
    }else{
        if(aiOption === 'rock'){ //lose
            wins--;
            status = 'lose';
        }else if(aiOption === 'paper'){ //win
            wins++;
            status = 'win';
        }else{ //tie
            status = 'tie';
        }
    }
    document.getElementById('wins').innerText='Score: '+wins;
    updateGameArea(option, aiOption, status);
}

/**
 * Randomly decides what the AI will choose
 *
 * @returns {string} rock paper or scissors
 */
function aiChoice(){
    let choice = Math.floor((Math.random()*3));
    if(choice === 0){
        return 'rock';
    }else if(choice === 1){
        return 'paper';
    }else{
        return 'scissors';
    }
}

/**
 * updates the game area to display who won a round
 *
 * @param {option} what you chose to play
 * @param {aiOption} what the ai chose
 * @param {status} if you won, lost, or drew the round
 */
function updateGameArea(option, aiOption,status){
    let response = '';
    if(status === 'win'){
        response = 'You won!';
    }else if(status === 'lose'){
        response = "You lost :'^(";
    }else{
        response = "It's a tie!"
    }
    document.getElementById('game-area').innerHTML = '<div id="prompt">\n' +
        '                <h2>'+response+'</h2>\n' +
        '            </div>\n' +
        '            <div id="options">\n' +
        '                <img class="result" src="/assets/rockpaperscissors/'+option+'.png">' +
        '                <h2>VS</h2>'+
        '                <img class="result" src="/assets/rockpaperscissors/'+aiOption+'.png" >\n' +
        '            </div>'+
        '            <div id="nextRound"><button class="btn btn-secondary" onclick="nextRound()">Next Round &gt;</button></div>';

}

/**
 * Changes the result back to the choice
 * Also ends the game if 10 rounds have been played
 */
function nextRound(){
    round++;
    if(round === 11){
        finalResults();

        const scoreModel = $("#gameScoreFormModal");
        attachHeading(`Score: ${wins} wins`);
        //scoreModel.on("hidden.bs.modal", load);
        attachSubmit({score: wins}, () => {
            scoreModel.modal("hide");
        });
        scoreModel.modal("show");  // user jQuery to show the modal
    }else {
        document.getElementById('rounds').innerText = 'Round: ' + round;
        document.getElementById('game-area').innerHTML = '<div id="prompt">\n' +
            '                <h2>Choose your move!</h2>\n' +
            '            </div>\n' +
            '            <div id="options">\n' +
            '                <img class="option" src="/assets/rockpaperscissors/rock.png" onclick="makeChoice(\'rock\')">\n' +
            '                <img class="option" src="/assets/rockpaperscissors/paper.png" onclick="makeChoice(\'paper\')">\n' +
            '                <img class="option" src="/assets/rockpaperscissors/scissors.png"onclick="makeChoice(\'scissors\')">\n' +
            '            </div>';
    }
}

/**
 * displays the final results
 * whether you have won, lost, or drawn
 * and what each player played.
 * Also gives the user the option to play again.
 */
function finalResults(){
    let gameArea = document.getElementById('game-area');
    if(wins === 0){
        gameArea.innerHTML = '<div id="prompt"><h2>You tied the computer!</h2></div>'+
                             '<div id="finalResults">' +
            '                 <h3>Your moves:</h3><img class="result" src="/assets/rockpaperscissors/'+yourOptions[0]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[1]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[2]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[3]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[4]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[5]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[6]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[7]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[8]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[9]+'.png">' +
            '                 </div><div id="finalResults2"><h3>CPU moves:</h3><img class="result" src="/assets/rockpaperscissors/'+aiOptions[0]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[1]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[2]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[3]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[4]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[5]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[6]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[7]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[8]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[9]+'.png"></div>' +
            '</div><div id="playAgain"><button class="btn btn-secondary" onclick="playAgain()">Play Again?</button></div>';
    }else if(wins > 0){
        gameArea.innerHTML = '<div id="prompt"><h2>You Won!</h2></div>'+
            '<div id="finalResults">' +
            '                 <h3>Your moves:</h3><img class="result" src="/assets/rockpaperscissors/'+yourOptions[0]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[1]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[2]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[3]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[4]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[5]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[6]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[7]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[8]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[9]+'.png">' +
            '                 </div><div id="finalResults2"><h3>CPU moves:</h3><img class="result" src="/assets/rockpaperscissors/'+aiOptions[0]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[1]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[2]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[3]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[4]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[5]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[6]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[7]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[8]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[9]+'.png"></div>' +
            '</div><div id="playAgain"><button class="btn btn-secondary" onclick="playAgain()">Play Again?</button></div>';
    }else{
        gameArea.innerHTML = '<div id="prompt"><h2>You lost!</h2></div>'+
            '<div id="finalResults">' +
            '                 <h3>Your moves:</h3><img class="result" src="/assets/rockpaperscissors/'+yourOptions[0]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[1]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[2]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[3]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[4]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[5]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[6]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[7]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[8]+'.png"><img class="result" src="/assets/rockpaperscissors/'+yourOptions[9]+'.png">' +
            '                 </div><div id="finalResults2"><h3>CPU moves:</h3><img class="result" src="/assets/rockpaperscissors/'+aiOptions[0]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[1]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[2]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[3]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[4]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[5]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[6]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[7]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[8]+'.png"><img class="result" src="/assets/rockpaperscissors/'+aiOptions[9]+'.png"></div>' +
            '</div><div id="playAgain"><button class="btn btn-secondary" onclick="playAgain()">Play Again?</button></div>';
    }
}

/**
 * Reloads the page
 */
function playAgain(){
    location.reload();
}