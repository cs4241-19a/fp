let currentConvo = "";

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
  fetch("api/users/getUsers", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  }).then(function(res) {
    res.json().then(function(ret) {
      for (let i = 0; i < ret.length; i++) {
        if (ret[i].username != getCookie("username")) {
          let l = document.createElement("li");
          let a = document.createElement("a");
          a.href = "#";
          a.class = "pure-menu-link";
          l.class = "pure-menu-item";
          a.innerHTML = ret[i].username;
          l.style =
            "padding: auto; margin:10px; color:white; font-weight:bold;";
          l.id = ret[i].username;
          a.onclick = function() {
            document.getElementById("t").innerHTML =
              "Messages with " + ret[i].username;
            currentConvo = ret[i].username;
            updateChat();
            // SET MESSAGES
          };
          a.style = "color:white; text-decoration: none";
          l.appendChild(a);
          document.getElementById("people").appendChild(l);
        }
      }
    });
  });
};

function updateChat() {
  fetch("messaging/getConversation/", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  }).then(function(res) {
    res.json().then(function(ret) {
      for (let i = 0; i < ret.length; i++) {
        if (
          (ret[i].from == currentConvo && ret[i].to == getCookie("username")) ||
          (ret[i].to == currentConvo && ret[i].from == getCookie("username"))
        ) {
          if (ret[i].to == getCookie("username")) {
            //PLACE IN LEFT
          }
          if (ret[i].from == getCookie("username")) {
            //PLACE IN RIGHT
          }
        }
      }
    });
  });
}

function sendMessage(){
  let message = {from: getCookie("username"), to:currentConvo, message:document.querySelector('#sendButton').value}
  fetch("messaging/sendMessage/", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body:message
  })
  updateChat();
}
