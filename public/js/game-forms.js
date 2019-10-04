/**
 * Submit the game data to the backend so it can be saved to the database.
 * @author: jk
 * @param {Event} e The submit button press event.
 * @param {Object} gameData The game data to submit.
 * @param {function} handelResponse The callback for when the fetch is done.
 */
function submitGameData(e, gameData, handelResponse) {
    const url = "/submit/games/" + GAMEID;
    const data = JSON.stringify({userId: auth.currentUser.uid, ...gameData});
    console.log("Game data: ", data);

    // TODO: check if user is logged in.

    const request = new Request(url, {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
        },
    });

    fetch(request)
        .then((resp) => resp.json())
        .then(function( data ) {
            // do something with the response
            console.log( data );
            handelResponse(data);
        })
        .catch(function (error) {
            console.log( error );
        });
    console.log("Done submitting game data");
    return false;
}

/**
 * Add a string to the h3 in the forum.
 * @author: jk
 * @param text The string to add.
 */
function attachHeading(text) {
    document.querySelector("#gameScoreFormModal h3").textContent = text;
}

/**
 * Attach the onclick event with the given data and callback.
 * @author: jk
 * @param data The game data to submit.
 * @param handelResponse The callback for after the submit is completed.
 */
function attachSubmit(data, handelResponse) {
    document.getElementById("gameScoreSubmitBtn").onclick = e => submitGameData(e, data, handelResponse);
}

// using embedded gameId from backend
// /**
//  * Get gameId from url.
//  * @author: jk
//  * @returns {string} The gameId.
//  */
// function getGameId() {
//     return window.location.pathname.split("/").filter(s => s !== "").pop();
// }
