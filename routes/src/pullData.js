const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();
const auth = firebaseAdmin.auth();

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
                scoreOrder: data.scoreOrder,
            };
        })
        .catch(err => {
            console.log("Error getting documents", err);
        });
}

/**
 * Get the game scores for the given game.
 * @author: jk
 * @param {string} gameId The id of the game to get.
 */
async function getGameScores(gameId) {
    const gameData = await getGame(gameId);
    const scoresQuery = db.collection(`games/${gameId}/scores`).orderBy("score", gameData.scoreOrder);
    return Promise.all(await scoresQuery.get()
        .then(snapshot => {
            return snapshot.docs.map(async function(doc) {
                const data = doc.data();
                if (!data)
                    return;  // bad game; return nothing
                return {
                    scoreId: doc.id,
                    score: data.score,
                    timestamp: data.timestamp,
                    user: await getUserData(data.user),
                };
            });
        })
        .catch(err => {
            console.log("Error getting Game documents", err);
        }));
}

/**
 * Get the necessary user data from the given uid.
 * @param uid The user id to get the data for.
 * @returns {Promise<{uid: *, memberSince: *, name: *, email: *} | {uid: *, memberSince: string, name: string, email: string}>}
 */
async function getUserData(uid) {
    return auth.getUser(uid)
        .then(function(userRecord) {
            // console.log('Successfully fetched user data:', userRecord.toJSON());
            return {
                uid: uid,
                name: userRecord.displayName,
                email: userRecord.email,
                memberSince: userRecord.metadata.creationTime,  // creation time is already a string in GMT
            }
        })
        .catch(function(error) {
            console.log(`Error fetching user data for ${uid}\n`, error);
            return {
                uid: uid,
                name: "[deleted]",
                email: "[deleted]",
                memberSince: "[deleted]",
            };
        });
}

/**
 * Get necessary game data and sort it alphabetically.
 * @author: jk
 * @param games The list of all games with the full game data. (from getGames)
 * @returns {Object[]} The sorted list of games with filtered data.
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
    getUserData,
    getGameScores,
};
