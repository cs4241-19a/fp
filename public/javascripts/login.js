function logIn() {
  let username = document.querySelector("#username");
  let password = document.querySelector("#password");
  let json = { username: username.value, password: password.value };
  let body = JSON.stringify(json);

  fetch("/login", {
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
  const button = document.getElementById("loginButton");
  button.onclick = logIn();
};
