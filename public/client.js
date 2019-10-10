// application.togglePrettierEnabled()// client-side js
// run by the browser each time your view template is loaded
console.log("hello world :o");

const updateRoleText = function() {
  let isHost = document.querySelector('#switch').checked
  let role = document.querySelector('#roleText')
  if (isHost) role.innerHTML = "Host"
  else role.innerHTML = "Attendant"
}

const login = function( e ) {
  e.preventDefault()
  const username = document.querySelector( '#username' ).value,
        password = document.querySelector( '#password').value,
        isHost = document.querySelector('#switch').checked;
  
  const json = { username: username, password: password}
  
  const body = JSON.stringify( json )
  if (isHost){
    fetch( '/createRoom', {
        method:'POST',
        body: body,
        headers: { 'Content-Type': 'application/json' }
      })
      .then( function( response ) {
        //Login failed
        if (response.status == 401) {
          window.alert("Login failed.")
        }
        // Login successful
        else {
          sessionStorage.setItem('username', username)
          fetch( '/makeId', {method:'POST'})
          .then(function (response){
            response.text()
            .then(function (message) {
              sessionStorage.setItem('username', username)
              sessionStorage.setItem('code', message)
              location.href = "https://cs4241final.glitch.me/teacher"
             })
          })
        }
      })
    }
  else{
    fetch( '/joinRoom', {
      method:'POST',
      body: body,
      headers: { 'Content-Type': 'application/json' }
    })
    .then( function( response ) {
      // Login failed
      if (response.status == 401) {
        window.alert("Login failed.")
      }
      // Login successful
      else {
        sessionStorage.setItem('username', username)
        location.href = "https://cs4241final.glitch.me/student"
      }
    })
  }
}

const register = function() {
  fetch("/register", {
      method: "GET",
    }).then(function(){
    location.href = "https://cs4241final.glitch.me/register"
  })
}

