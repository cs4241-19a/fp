function logIn() {
  let username = document.querySelector("#username");
  let password = document.querySelector("#password");
  let json = { username: username.value, password: password.value };
  let body = JSON.stringify(json);

  fetch("api/users/login", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: body
  }).then(function(res) {
    res.text().then(function(str) {
      if (str == "OK") {
        window.location = "/index";
      }
      if (str == "BAD") {
        alert("Invalid Login!");
      }
    });
  });
}

window.onload = function() {
  const button = document.getElementById("loginButton");
  button.onclick = logIn;

  var input = document.getElementById("password");
  input.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      button.click();
    }
  });
};
