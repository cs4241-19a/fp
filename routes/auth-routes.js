const express = require('express');
const authRouter = express.Router();

const firebaseAdmin = require("firebase-admin");
const auth = firebaseAdmin.auth();

authRouter.post('/sign-up', async (req, res) => {
    const data = req.body;
    console.log(data);
    auth.createUser({
        email: data.email,
        emailVerified: false,
        // phoneNumber: '+11234567890',
        password: data.password,
        displayName: data.name,
        // photoURL: 'http://www.example.com/12345678/photo.png',
        disabled: false
    })
        .then(async function(userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully created new user:', userRecord.uid);
            await res.json({
                customToken: await getCustomToken(userRecord),
            });
        })
        .catch(function(error) {
            console.log('Error creating new user:', error);
            res.json({
                failMsg: error.message,
            });
        });

});

async function getCustomToken(user) {
    return await firebaseAdmin.auth().createCustomToken(user.uid)
        .then(function(customToken) {
            return customToken;
        })
        .catch(function(error) {
            console.log('Error creating custom token:', error);
        });
}

module.exports = authRouter;
