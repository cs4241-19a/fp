

function logIn(){
    location.href='/index'
    /*
    let username = document.querySelector( '#username' )
    let password = document.querySelector( '#password' )
    //send session info here
    let json = { username: username.value, password: password.value}
    let URL = "username=" +username.value +  "&password=" + password.value
  
    let body = JSON.stringify(json)
    //let body = URL
    
    fetch( '/login', {
        headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method:'POST',
        body: body
      }).then(function(response){
         return response.text();
        }).then(function (r){
          if (r == "OK"){
            location.href='/index.html'
          }
          else {
            alert(r)
           // alert("Account credentials invalid")
           //alert("Account credentials invalid")
           //document.getElementById("baddy").style.display = "inline"
          }
    })
    */
  }
  
  
  window.onload = function() {
      const button = document.getElementById( 'loginButton' )
      button.onclick = logIn
    }
  