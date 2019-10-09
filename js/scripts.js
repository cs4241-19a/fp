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