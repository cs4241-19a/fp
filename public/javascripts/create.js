document.getElementById("dupe").style.display = "none"
document.getElementById("ok").style.display = "none"

function createAccount(){
  document.getElementById("dupe").style.display = "none"
  document.getElementById("ok").style.display = "none"
  let user = document.querySelector( '#newUsername' )
  let password = document.querySelector( '#newPassword' )
  //send session info here
  let json = { user: user.value, pass: password.value}
  let body = JSON.stringify(json)
  
  fetch( '/create', {
      method:'POST',
      body 
    }).then(function(response){
       return response.text();
      }).then(function (r){
        if (r == "OK"){
         //document.getElementById("ok").style.display = "inline"
          alert("Account created successfully!")
        }
        else if (r == "BAD"){
         //document.getElementById("dupe").style.display = "inline"
          alert("User already exists, try again!")
        }
  })
}

window.onload = function() {
    //recieve session info here
  document.getElementById("dupe").style.display = "none"
  document.getElementById("ok").style.display = "none"
    const button2 = document.getElementById('createAccount')
    button2.onclick = createAccount
}
