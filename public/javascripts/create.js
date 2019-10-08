
function createAccount(){
  let user = document.querySelector( '#newUsername' )
  let password = document.querySelector( '#newPassword' )
  let json = { username: user.value, password: password.value}
  let body = JSON.stringify(json)
  
  fetch( '/api/users/create', {
      headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: body
  }).then(function(res){
    res.text().then(function(str) {
      if (str == "OK") {
        alert("Account created!")
        window.location = "/";
      }
      if (str == "BAD") {
        alert("User exists!");
      }
    });
  });
}

window.onload = function() {
  const button = document.getElementById('createButton')
  button.onclick = createAccount
}
