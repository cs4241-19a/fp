const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();

/**
 * Get the all game data from database. Not including scores.
 * @author: jk
 * @returns Array[{Promise<{gameId: *, path: *, playCount: *, name: *}>}]
 */
async function getGames() {
    const gamesQuery = db.collection("games").orderBy("timesPlayed", "desc");
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
            console.log("Error getting Game documents", err);
        }));
}

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
                shortDesc: data.shortDesc,
                path: data.path,
                imgPath: data.imgPath,
                playCount: data.timesPlayed,
                gameId: snapshot.id,
            };
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
}

/**
 * Get necessary game data and sort it alphabetically.
 * @author: jk
 * @param games The list of all games with the full game data. (from getGames)
 * @returns {Object[]} The sorted list of filtered games.
 */
function getGameDropdownData(games) {
    return games.map(function(data) {
        return {
            name: data.name,
            shortDesc: data.shortDesc,
            gameId: data.gameId,
        };
    }).sort((a, b) => (a.name > b.name) ? 1 : -1);
}

module.exports = {
    getGames,
    getGame,
    getGameDropdownData,
};
