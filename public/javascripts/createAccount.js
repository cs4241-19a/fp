

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
  
    fetch( '/login/create', {
      method:'POST',
      body, 
      headers: {'Content-Type':'application/json'}
    })
    /*
    .then( function( response ) {
      console.log( response )
      return response.json()
    }).then( function( json ) {
      displayTable( json )
    })
    */
    return false
  }

window.onload = function() {
    const showFormButton = document.getElementById("createFormButton");

    document.getElementById( "createForm" ).style.display = "none"
    showFormButton.onclick = function(){
        document.getElementById( "createForm" ).style.display = "block"
    };
    const submitNewAccount = document.getElementById("submitNewAccount");
    submitNewAccount.onclick = newAccount;


}