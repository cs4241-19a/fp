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

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

window.onload = function() {
  const userCookie = getCookie('username');
  if (userCookie != "") {
    window.location.replace("/index");
  }

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
