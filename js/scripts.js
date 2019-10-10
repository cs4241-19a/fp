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

function doLogin() {
  console.log("IN USERNAME");
  let uName = document.getElementById("login-username").value;
  let pass = document.getElementById("password").value;
  let body = { username: uName, password: pass };
  body = JSON.stringify(body);
  fetch("/login", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" }
  }).then(function(res) {
    if (res.status === 200) {
      window.location = res.url;
    } else {
      window.alert("Incorrect Username or Password!\nTry again!");
    }
  });
}

function addUser() {
  let uName = document.getElementById("login-username").value;
  let pass = document.getElementById("password").value;
  let body = { username: uName, password: pass };
  if (uName !== "" && pass !== "") {
    let json = JSON.stringify(body);
    fetch("/addUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json
    }).then(function(res) {
      console.log(res);
      if (res.status === 200) {
        window.alert("Successfully added to database");
        doLogin();
      } else {
        window.alert("User already exists!\nNot added to database!");
      }
    });
  }
}

function loadLoginPage() {
  fetch("/loginPage", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then(function(res) {
    window.location = res.url;
  });
}

function returnHome() {
  fetch("/", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then(function(res) {
    window.location = res.url;
  });
}

function loadSongs() {
  var select = document.getElementById("songDropdown");
  select.innerHTML = "";
  fetch("/allData", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
    .then(function(ret) {
      return ret.json();
    })
    .then(function(res) {
      console.log(res);
      var html = "";
      res.forEach(function(single) {
        html = '<option value="';
        html += single.songdata;
        html += '">';
        html += single.songname;
        html += " by ";
        html += single.username;
        html += "</option>";
      });
    select.innerHTML = html
    });
}

