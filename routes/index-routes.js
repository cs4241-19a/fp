const express = require("express");
const indexRouter = express.Router();

const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();

/**
 * Get the all game data from database. Not including scores.
 * @author: jk
 * @returns Array[{Promise<{gameId: *, path: *, playCount: *, name: *}>}]
 */
async function getGames() {
    const gamesQuery = db.collection("games").orderBy('timesPlayed', 'desc');
    return await Promise.all(await gamesQuery.get()
        .then(snapshot => {
            return snapshot.docs.map(function(doc) {
                const data = doc.data();
                if (!data)
                    return;  // bad game; return nothing
                return {
                    name: data.name,
                    shortDesc: data.shortDesc,
                    path: data.path,
                    imgPath: data.imgPath,
                    playCount: data.timesPlayed,
                    gameId: doc.id,
                };

            });
        })
        .catch(err => {
            console.log('Error getting Game documents', err);
        }));
}

indexRouter.get("/", async function(req, res) {
    res.render("index", {gameData: await getGames()});
});


module.exports = indexRouter;
