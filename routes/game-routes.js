const express = require("express");
const gameRouter = express.Router();

const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();


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

gameRouter.get("/:gameId", async function(req, res) {
    const gameContext = await getGame(req.params.gameId);
    if (gameContext) {
        res.render(gameContext.path);
    } else {
        res.render("not-found", {msg: "We apologise. This game does not exist."});
    }
});


module.exports = gameRouter;
