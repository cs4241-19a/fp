
function createAccount(){
  let user = document.querySelector( '#newUsername' )
  let password = document.querySelector( '#newPassword' )
  let json = { user: user.value, pass: password.value}
  let body = JSON.stringify(json)
  
  fetch( '/api/users/create', {
      headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: body
  }).then(function(res){
    //parse response?
  })
}

window.onload = function() {
  const button = document.getElementById('createAccount')
  button.onclick = createAccount
}
