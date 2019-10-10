//import { setTrue } from './global.js'
//var global = requirejs('./global.js');

const clearForm = function() {
    document.querySelector( '#username' ).value = ""
    document.querySelector( '#password' ).value = ""
  }

const newAccount = function() {
  
    const username = document.querySelector( '#username' ).value,
          password = document.querySelector( '#password' ).value,
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


const submitLogin = function() {

  console.log("hello")

  const username = document.querySelector( '#username' ).value,
        password = document.querySelector( '#password' ).value,
        json = { 
           'username': username,
           'password': password,
         },
        body = JSON.stringify( json )

  clearForm()

  if (username.length < 1 ) {
    document.getElementById("message").innerHTML = "please enter a username";
    return false;  
  }
  else if ( password.length < 1) {
    document.getElementById("message").innerHTML =  "please enter a password";
    return false;
  }


  fetch('/login', {
    method:'POST',
    body,
    headers: {'Content-Type':'application/json'}
  })
  .then( function( response ) {
    //console.log( response )
    //console.log(response.status)
    if (response.status != 200) {
      return false;
    }
    else {
      //window.location.href = "/login/profile"
    }
  }) 
}

window.onload = function() {

    document.getElementById( "form" ).style.display = "none"
    document.getElementById("newAccountButton").style.display = "none"
    document.getElementById("loginButton").style.display = "none"

    const showNewAccountForm = function() {
        document.getElementById( "form" ).style.display = "block"
        document.getElementById("loginButton").style.display = "none"
        document.getElementById("showLoginButton").style.display = "block"
        document.getElementById("showNewAccountButton").style.display = "none"

        var submitNewAccount = document.getElementById("newAccountButton");
        submitNewAccount.onclick = newAccount;
        submitNewAccount.style.display = "block"

    }

    const showLoginForm = function() {
      document.getElementById("form").style.display = "block"
      document.getElementById("newAccountButton").style.display = "none"
      document.getElementById("showLoginButton").style.display = "none"
      document.getElementById("showNewAccountButton").style.display = "block"

      var loginB = document.getElementById("loginButton")
      loginB.onclick = submitLogin
      loginB.style.display = "block"
    }
    var newAccountButton = document.getElementById("showNewAccountButton")
    newAccountButton.onclick = showNewAccountForm

    var loginButton  = document.getElementById("showLoginButton")
    loginButton.onclick = showLoginForm

}