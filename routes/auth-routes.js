const express = require("express");
const authRouter = express.Router();

const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();
const auth = firebaseAdmin.auth();

/**
 * Create the email and password account in firebase auth.
 * Create a user object in the database with the same id as the auth user object.
 * Return the custom token to the front end.
 * @author: jk
 */
authRouter.post("/sign-up", async (req, res) => {
    const data = req.body;
    console.log(data);
    auth.createUser({
        email: data.email,
        emailVerified: false,
        // phoneNumber: "+11234567890",
        password: data.password,
        displayName: data.name,
        // photoURL: "http://www.example.com/12345678/photo.png",
        disabled: false
    })
        .then(async function(userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully created new user:", userRecord.uid);

            // add user to collections
            // dont need to wait
            // db.collection("users").doc(userRecord.uid).set({
            //     // no extra data needed so far
            // });

            await res.json({
                customToken: await getCustomToken(userRecord),
            });
        })
        .catch(function(error) {
            console.log("Error creating new user:", error);
            res.json({
                failMsg: error.message,
            });
        });

});


/**
 * Get a token for the user so the user can sign in.
 * @author: jk
 * @param {admin.auth.UserRecord} user The user database object.
 * @returns {Promise<string>} The token to be used on the front end to sign in.
 */
async function getCustomToken(user) {
    return await firebaseAdmin.auth().createCustomToken(user.uid)
        .then(function(customToken) {
            return customToken;
        })
        .catch(function(error) {
            console.log("Error creating custom token:", error);
        });
}

module.exports = authRouter;
