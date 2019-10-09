let input1 = "";
let input2 = "";
export const initResults = function () {
    let showResults = document.getElementById('game-results');
    showResults.innerHTML = `<div class="" id=""> <div class="row" id=""> `

    let gameResult = "";
    let p1 = "";
    let p2 = "";
    let pPieces1 = "";
    let pPieces2 = "";
    let recency = "";

    fetch('/get-game-results', {
        method: 'GET'
    })
        .then((response) => response.json())
        .then((results) => {
            //console.log("on client side" + JSON.parse(results));
            let gameResults = JSON.parse(results);
            gameResults.forEach(function (result) {
                let display = "";
                if (result) {
                    gameResult = (parseInt(result.result) == 0) ? "W - L" : "L - W";
                    p1 = result.player1.name;
                    p2 = result.player2.name;
                    pPieces1 = result.player1["pieces"];
                    pPieces2 = result.player2["pieces"];
                    recency = result.recency;
                    display += `<div class="row card s8 offset-s2 grey lighten-5 valign-wrapper hoverable" id="">
                <div class="col s5 valign center" id="p1-result${recency}">
                    <label>${p1}</label> 
                    
                    <div class=""> 
                    <ul class="recent-game-icons"> `
                    pPieces1.forEach(function (piece) {
                        display += `<li>${piece}</li> `
                    })

                    display += ` </ul>
                        </div>
                    </div>
                    <div class="col valign s2 center" id="win-lose${recency}">
                        <label>${gameResult}</label>
                    </div>
                        <div class="col s5 valign center-align" id="p2-result${recency}">
                            <label>${p2}</label>
                            <div class="">
                            <ul class="recent-game-icons">
                `
                    pPieces2.forEach(function (piece) {
                        display += `<li>${piece}</li>`
                    })

                    display += `
                            </ul>
                        </div>
                    </div> 
                 </div> </div>
                `
                    showResults.innerHTML = (display += showResults.innerHTML);
                }
                //console.log(display);

            })
            //console.log(display);
            //showResults.innerHTML += `</div>`
        })
    //console.log(display);
    showResults.innerHTML += `</div>`;

}

/**
 * Updates the results display, then writes to the database
 * @param {number} winner
 * @param {Array<String>} p1Pieces an array of strings for p1's pieces
 * @param {Array<String>} p2Pieces an array of strings for p2's pieces
 */
export const postResult = function (winner, p1Pieces, p2Pieces) {
    // write to db

    let p1 = document.getElementById("player1").value;
    let p2 = document.getElementById("player2").value;


    //console.log(p1 + " " + p2 + "are playing");
    let newResult = {
        player1: p1,
        player2: p2,
        p1Pieces: p1Pieces,
        p2Pieces: p2Pieces,
        result: winner

    };
    let body = JSON.stringify(newResult);
    //console.log(" body in post function: " +body);

    fetch('/add-result', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body
    })
        .then((response) => response.json())
        .then(function () {
            console.log("Added new game result: " + body);
            // refreshing
            initResults();
        })

    return false;


}

