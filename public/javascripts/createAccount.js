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
    console.log("fetching")
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
        //setTrue();
       window.location.href = "/login";
      }
    })
    return false
  }

window.onload = function() {
    const showFormButton = document.getElementById("createFormButton");

    document.getElementById( "createForm" ).style.display = "none"

    const showForm = function() {
        document.getElementById( "createForm" ).style.display = "block"
        document.getElementById("loginButton").style.display = "none"
        document.getElementById("createFormButton").style.display = "none"
    }

    showFormButton.onclick = showForm;
    const submitNewAccount = document.getElementById("submitNewAccount");
    submitNewAccount.onclick = newAccount;

}