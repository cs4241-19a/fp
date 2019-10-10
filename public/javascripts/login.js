//import { setTrue } from './global.js'
//var global = requirejs('./global.js');

const clearForm = function() {
    document.querySelector( '#username' ).value = ""
    document.querySelector( '#password' ).value = ""
  }

const newAccount = function() {
  
    const username = document.getElementById( 'username' ).value,
          password = document.getElementById( 'password' ).value,
          json = { 
                   'username': username,
                   'password': password,
                 },
          body = JSON.stringify( json )
    
    clearForm()


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

    var loginForm = document.getElementById("login")
    loginForm.style.display = "none"
    var newAccountForm = document.getElementById("createNewAccount")
    newAccountForm.style.display = "none"

    //document.getElementById( "form" ).style.display = "none"
    //document.getElementById("newAccount").style.display = "none"
    //document.getElementById("loginButton").style.display = "none"
/*
    const showNewAccountForm = function() {
        document.getElementById( "form" ).style.display = "block"
        document.getElementById("showLoginButton").style.display = "block"
        document.getElementById("showNewAccountButton").style.display = "none"
        document.getElementById("login").style.display = "none"

        var submitNewAccount = document.getElementById("newAccount");
        submitNewAccount.onclick = newAccount;
        submitNewAccount.style.display = "block"
        createAccount.style.display = "block"


    }

    const showLoginForm = function() {
      document.getElementById("form").style.display = "block"
      document.getElementById("newAccount").style.display = "none"
      document.getElementById("showLoginButton").style.display = "none"
      document.getElementById("showNewAccountButton").style.display = "block"
      document.getElementById("login").style.display = "block"
    }
    */

    var loginButton = document.getElementById("loginButton")
    loginButton.onclick = function() {
      loginForm.style.display = "block" // show login
      newAccountForm.style.display = "none" // hide new account
      loginButton.style.display = "none" // hide login button
    }

    var createAccountButton = document.getElementById("createAccountButton")
    createAccountButton.onclick = function() {
      newAccountForm.style.display = "block" // show new account
      loginForm.style.display = "none" // hide login
      createAccountButton.style.display = "none"
      var submitNewAccountButton = document.getElementById("createNewAccountButton")
      submitNewAccountButton.onclick = newAccount
      
    }

    /*
    var createAccount = document.getElementById("newAccount")
    createAccount.style.display = "none"
    createAccount.onclick = newAccount


    var newAccountButton = document.getElementById("showNewAccountButton")
    newAccountButton.onclick = showNewAccountForm

    var loginButton  = document.getElementById("showLoginButton")
    loginButton.onclick = showLoginForm
    */

}