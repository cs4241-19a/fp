const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();
const auth = firebaseAdmin.auth();


/**
 * Create a score document in the score subcollection given of the game.
 * @param gameId The id of the game the score is for.
 * @param score The score.
 * @param userId The uid of the player.
 * @returns {Promise<FirebaseFirestore.DocumentReference>} The score document that was just created.
 */
function addScoreDefault(gameId, score, userId) {
    return db.collection(`games/${gameId}/scores`).add({
        score,
        user: userId,
        timestamp: firebaseAdmin.firestore.Timestamp.now(),
    })
        .then(function(docRef) {
            // increment timesPlayed on parent
            db.collection("games").doc(gameId).update({
                timesPlayed: firebaseAdmin.firestore.FieldValue.increment(1)
            })
                .then(function() {
                    // console.log("Document successfully updated!");
                })
                .catch(function(error) {
                    console.error("Error updating document: ", error);
                });
            return docRef;
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}

module.exports = {
    addScoreDefault,
};