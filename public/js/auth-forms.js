import * as firebase from "firebase-admin";

/**
 * Parse the form data. Handel parsing errors with warning messages and aborting the post.
 * Post the form data to the given url. Then call with handelResponse with the response data.
 * @param {Event} e The submit button press event.
 * @param {string} url The url to submit the post to.
 * @param {function} dataParser The function to parse the sign in form.
 * @param {function} handelResponse The function to handel the data from a sign in.
 * @returns {boolean} Always returns false.
 */
function submit(e, url, dataParser, handelResponse) {
    console.log(e, url, dataParser, handelResponse);
    e.preventDefault();  // prevent url form submission

    const jsonData = dataParser();
    const data = JSON.stringify(jsonData);
    console.log("form data: ", data);

    if (jsonData.warningStatus === "failed") {
        const warning = e.target.parentElement.parentElement.querySelector("div#warningAlerts span");
        warning.textContent = jsonData.warningMsg;
        warning.parentElement.classList.remove("d-none");
        return false;
    }

    let request = new Request(url, {
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
    console.log("done submitting");
    return false;
}

/**
 * Handel the sign in submit button event.
 * @param {Event} e The submit button press event.
 * @param {function} dataParser The function to parse the sign in form.
 * @param {function} handelResponse The function to handel the data from a sign in.
 */
function signInSubmit(e, dataParser, handelResponse) {
    console.log(e, dataParser, handelResponse);
    e.preventDefault();  // prevent url form submission

    const data = dataParser();
    console.log("signing in: ", data);
    console.log( data );
    handelResponse(data);

}

/**
 * Attach onclick events for form submit buttons.
 * @returns {Promise<void>}
 */
window.onload = async function() {
    const submitUrl = "/submit";
    const submitAuthSignUpUrl = "/auth/sign-up";
    // bind sign in and sign up events
    document.getElementById("signInSubmitBtn").onclick = ((e) => signInSubmit(e, parseSignInForm, handelSignInResponse));
    document.getElementById("signUpSubmitBtn").onclick = ((e) => submit(e, submitAuthSignUpUrl, parseSignUpForm, handelSignUpResponse));
    // bind page specific events

    if (document.getElementById("scoresSubmitBtn")) {
        document.getElementById("scoresSubmitBtn").onclick = ((e) => submit(e, submitUrl, parseGameForm, handelGameResponse));
    }
};


// CLOSE MODAL //

/**
 * Close the given modal. This will close all modal backdrops.
 * @param modal The modal to close.
 */
function closeModal(modal) {
    modal.querySelector(".modal-header > button.close").click();
    modal.querySelector("form").reset();
    modal.querySelector(".alert").classList.remove("d-none")
}


// PARSE FORM //
/**
 * Pull the data out of the sign in form.
 * @returns {{password: *, email: *}}
 */
function parseSignInForm() {
    return {
        email: document.getElementById("sign-in-email").value,
        password: document.getElementById("sign-in-password").value,
    }
}

/**
 * Pull the data out of the sign up form.
 * @returns {{password: *, name: *, email: *}}
 */
function parseSignUpForm() {
    return {
        name: document.getElementById("sign-up-name").value,
        email: document.getElementById("sign-up-email").value,
        password: document.getElementById("sign-up-password").value,
    }
}


// HANDEL RESPONSE //

// sign ins are done client side
/**
 * Sign in with the provided email and password using the firebase api.
 * @param data Sign in forum data.
 * @returns {Promise<void>}
 */
async function handelSignInResponse(data) {
    firebaseSignInEmailPassword(data.email, data.password)
        .then(function() {
            const modal = document.getElementById("signInFormModal");
            closeModal(modal);
            console.log("you are now logged in");
        })
        .catch(function(error) {
            console.log("sign in failed", error);
            document.querySelector("#sign-in-alert > span").textContent = error.message;
            document.getElementById("sign-in-alert").classList.remove("d-none");
        });
}

/**
 * On a successful sign up, use the token to sign in. If the sign up failed, show the failure message on the form.
 * @param data The data from the sign up response in the backend.
 * @returns {Promise<void>}
 */
async function handelSignUpResponse(data) {
    if (await firebaseSignInToken(data.customToken) === true) {
        const modal = document.getElementById("signUpFormModal");
        closeModal(modal);
        console.log("you are now logged in");
    } else {
        console.log("sign up failed");
        console.log(data.failMsg);
        if (data.failMsg) {
            document.querySelector("#sign-up-alert > span").textContent = data.failMsg;
            document.getElementById("sign-up-alert").classList.remove("d-none");
        }
    }
}


// FIREBASE AUTH //

const auth = firebase.auth();

/**
 * Sign in using the provided custom token.
 * @param token The token for the user authentication.
 * @returns {Promise<boolean>} True is success; false if failed.
 */
async function firebaseSignInToken(token) {
    if (typeof token !== "string") {
        // if token is bad dont bother trying to sign in
        return false;
    }
    return await auth.signInWithCustomToken(token)
        .then(function() {
            return true;
        })
        .catch(function(error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            return false;
        });
}

/**
 * Sign in using the firebase api for email and password authentication.
 * @param email
 * @param password
 * @returns {Promise<boolean|UserRecord>}
 */
async function firebaseSignInEmailPassword(email, password) {
    if (typeof email !== "string" || typeof password !== "string") {
        // if creds are bad dont bother trying to sign in
        return false;
    }
    return auth.signInWithEmailAndPassword(email, password);
}

/**
 * Sign out using the firebase api.
 * @returns {Promise<boolean>} True when successful; false when not.
 */
async function firebaseSignOut() {
    return await auth.signOut()
        .then(function() {
            console.log("User signed out");
            return true;
        })
        .catch(function(error) {
            console.log("User sign out failed", error);
            return false;
        });
}

// DISPLAY USER //

firebase.auth().onAuthStateChanged(update);

/**
 * Update the ui with relevant auth data: auth buttons and nav welcome message.
 * @param {UserRecord} user The current user signed in.
 */
function update(user) {
    if (user === null || user === undefined) {
        user = auth.currentUser;
    }
    updateNavButtons(user);
    updateNavName(user);
}

/**
 * Show the log out button if logged in.
 * Show the sign up and log in button if not logged in.
 * @param {UserRecord} user The current user signed in.
 */
function updateNavButtons(user) {
    if (user === null || user === undefined) {
        document.getElementById("signUpBtn").classList.remove("d-none");
        document.getElementById("signInMenuDiv").classList.remove("d-none");
        document.getElementById("signOutBtn").classList.add("d-none");
    } else {
        document.getElementById("signUpBtn").classList.add("d-none");
        document.getElementById("signInMenuDiv").classList.add("d-none");
        document.getElementById("signOutBtn").classList.remove("d-none");
    }
}

/**
 * add the welcome message to the nav bar
 * @param {UserRecord} user The current user signed in.
 */
function updateNavName(user) {
    document.querySelector("nav> #userDisplayName").textContent = (user === null || user === undefined) ? "" : "Welcome " + user.displayName;
}


// OAuth //

/**
 * Handel a google oAuth sign in using the firebase auth api
 */
function googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    provider.addScope("profile");
    provider.addScope("email");
    auth.signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("Google user signed in ", token, result.user)
    }).catch(function(error) {
        if (error.code === "auth/account-exists-with-different-credential") {
            alert("You have signed up with a different provider for that email.");
            // Handle linking here if your app allows it.
        } else {
            console.log("Google sign in error", error)
        }
    });
}

/**
 * Handel a github oAuth sign in using the firebase auth api
 */
function githubSignIn() {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope("read:user");
    provider.addScope("user:email");
    auth.signInWithPopup(provider).then(function(result) {
        console.log("Github user signed in ", result.credential.accessToken, result.user)
    }).catch(function(error) {
        if (error.code === "auth/account-exists-with-different-credential") {
            alert("You have signed up with a different provider for that email.");
            // Handle linking here if your app allows it.
        } else {
            console.error("Github sign in error", error);
        }
    });

}



