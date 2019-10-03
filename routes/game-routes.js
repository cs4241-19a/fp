const express = require("express");
const gameRouter = express.Router();

const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();

/**
 * Get the all game data from database. Not including scores.
 * @author: jk
 * @param {string} gameId The id of the game in the database.
 * @returns {Promise<{gameId: *, path: *, playCount: *, name: *}>}
 */
async function getGame(gameId) {
    const gameDoc = db.collection("games").doc(gameId);
    return gameDoc.get()
        .then(snapshot => {
            const data = snapshot.data();
            if (!data)
                return;  // bad game; return nothing
            return {
                name: data.name,
                path: data.path,
                playCount: data.timesPlayed,
                gameId: snapshot.id,
            };
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
}

/**
 * Load the game object from the database to get it's path. Then render the game page
 * @author: jk
 */
gameRouter.get("/:gameId", async function(req, res) {
    const gameContext = await getGame(req.params.gameId);
    if (gameContext) {
        res.render(gameContext.path);
    } else {
        res.render("not-found", {msg: "We apologise. This game does not exist."});
    }
});


module.exports = gameRouter;
