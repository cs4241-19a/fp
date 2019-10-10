import { createdAccount, setTrue } from './global.js'

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

    //add code here to check for null entries
  
    fetch( '/users/create', {
      method:'POST',
      body, 
      headers: {'Content-Type':'application/json'}
    }).then(function ( response ) {
        console.log( response );
        setTrue();
        //if (createdAccount) {
          //console.log("idk man");
        //}
        //console.log(createdAccount)

    })
    return false
  }

window.onload = function() {
    const showFormButton = document.getElementById("createFormButton");

    document.getElementById( "createForm" ).style.display = "none"

    const showForm = function() {
        document.getElementById( "createForm" ).style.display = "block"
    }

    showFormButton.onclick = showForm;
    const submitNewAccount = document.getElementById("submitNewAccount");
    submitNewAccount.onclick = newAccount;

}