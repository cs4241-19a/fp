/**
 * Submit the game data to the backend so it can be saved to the database.
 * @author: jk
 * @param {Event} e The submit button press event.
 * @param {Object} gameData The game data to submit.
 * @param {function} handelResponse The callback for when the fetch is done.
 */
function submitGameData(e, gameData, handelResponse) {
    if (auth.currentUser == null) {
        console.log("no user!");
        remoteHandel = () => {$("#gameScoreFormModal").modal("show")};  // should get called after successful sign in
        document.querySelector("#game-submit-alert > span").textContent = "Please sign in to submit your score.";
        document.getElementById("game-submit-alert").classList.remove("d-none");
        return false;
    } else {
        document.querySelector("#game-submit-alert > span").textContent = "";
        document.getElementById("game-submit-alert").classList.add("d-none");
    }
    const url = "/data/games/" + CURGAME.gameId;
    const data = JSON.stringify({userId: auth.currentUser.uid, ...gameData});
    console.log("Game data: ", data);

    const request = new Request(url, {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
        },
    });

    console.log(request);

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
