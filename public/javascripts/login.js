
const clearForm = function() {
    document.querySelector( '#username' ).value = ""
    document.querySelector( '#password' ).value = ""
  }

const newAccount = function() {
  
    const username = document.getElementById( 'username1' ).value,
          password = document.getElementById( 'password1' ).value,
          json = { 
                   'username': username,
                   'password': password,
                 },
          body = JSON.stringify( json )
    
    clearForm()

    // check username and password lengths
    console.log(username.length)
    if (username.length < 4 ) {
      document.getElementById("message").innerHTML = "username must be at least 4 characters";
      return false;  
    }
    else if ( password.length < 4) {
      document.getElementById("message").innerHTML =  "password must be at least 4 characters";
      return false;
    }
    else if (username.length > 20 ) {
      document.getElementById("message").innerHTML =  "username must be less than 20 characters";
      return false;
    }
    else if (password.length > 20) {
      document.getElementById("message").innerHTML =  "password must be less than 20 characters";
      return false;
    }

    // submit new user
    fetch( '/users/create', {
      method:'POST',
      body, 
      headers: {'Content-Type':'application/json'}
    }).then( function ( response ) {
      console.log( response )
      return response.json()
    })
    .then (function( json ) {
      if (json.condition == 1) {
        document.getElementById("message").innerHTML =  "username already exists!";
      }
      else {
        document.getElementById("message").innerHTML =  "User created succesfully";
      }
    })
    return false
  }

window.onload = function() {

    // hide login form
    var loginForm = document.getElementById("login")
    loginForm.style.display = "none"
    // hide new account form
    var newAccountForm = document.getElementById("createNewAccount")
    newAccountForm.style.display = "none"

    var loginButton = document.getElementById("loginButton")
    loginButton.onclick = function() {
      loginForm.style.display = "block" // show login
      newAccountForm.style.display = "none" // hide new account
      loginButton.style.display = "none" // hide login button
      document.getElementById("createAccountButton").style.display = "block"
    }

    var createAccountButton = document.getElementById("createAccountButton")
    createAccountButton.onclick = function() {
      newAccountForm.style.display = "block" // show new account
      loginForm.style.display = "none" // hide login
      createAccountButton.style.display = "none" 
      loginButton.style.display = "block"
      var submitNewAccountButton = document.getElementById("createNewAccountButton")
      submitNewAccountButton.onclick = newAccount    
    }

}