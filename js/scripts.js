const login = function(e) {
  e.preventDefault();

  const loginInfo = {
    username: document.getElementById("login-username").value,
    password: document.getElementById("password").value
  };

  const body = JSON.stringify(loginInfo);
  fetch("/login", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(console.log)
    .then(function(response) {
      document.getElementById("new-order-link").style.display = "flex";
      document.getElementById("current-orders-link").style.display = "flex";
      document.getElementById("login").style.display = "none";
      document.getElementById("current-username").value = loginInfo.username;
    });
};


function doLogin(){
  console.log("IN USERNAME")
  let uName = document.getElementById("login-username").value
  let pass = document.getElementById("password").value
  let body = {username: uName, password: pass}
  body = JSON.stringify(body)
  fetch('/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body
  })
  .then(function(res){
    if(res.status === 200){
      window.location = res.url
    }
    else{
      window.alert("Incorrect Username or Password!\nTry again!")
    }
  })
}

function addUser(){
  let body = {
    username: document.getElementById('uName').value,
    password: document.getElementById('pass').value
  }
  let json = JSON.stringify(body)
  fetch('/addUser', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: json
  })
  .then(function(res){
    console.log(res)
    if(res.status === 200){
      window.alert("Successfully added to database")
    }
    else{
      window.alert("Data already exists!\nNot added to database!")
    }
  })
}