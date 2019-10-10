var USERNAME = ""
var PASSWORD = ""

var login = document.getElementById('login');
var playMenu = document.getElementById('play-menu');
var playButton = document.getElementById('play-button');
var usernameInput = document.getElementById('username-input');

function loginUser(){
  setUsernameAndPasswordFromLogin()
  var myRequest = new Request('/login_a_user', {
      method: 'POST', 
      body: JSON.stringify({ username:USERNAME, password:PASSWORD}), 
      headers: { 'Content-Type': 'application/json' }
  });
  fetch(myRequest).then(function(response) {
    response.json().then(function(json_data) {
      if(json_data.valid_u_p === '1'){
        document.getElementById('play-menu').classList.remove('hidden');
        document.getElementById('login').style.display = 'none'
        document.getElementById('username-input').placeholder = json_data.displayName
        document.getElementById(json_data.image).selected = "selected"
        document.getElementById(json_data.scale).selected = "selected"
        document.getElementById(json_data.turnSpeed).selected = "selected"
      }
      else{
        window.alert("not a valid username or password")
      }
    })
  })
                         
}

function setUsernameAndPasswordFromLogin(){
  USERNAME = document.getElementById("LOGIN_USERNAME").value;
  PASSWORD = document.getElementById("LOGIN_PASSWORD").value;
}
