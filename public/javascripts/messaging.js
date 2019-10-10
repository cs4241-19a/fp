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
  document.getElementById("sendButton").onclick = sendMessage;
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
          };
          a.style = "color:white; text-decoration: none";
          l.appendChild(a);
          document.getElementById("people").appendChild(l);
          currentConvo = ret[i].username;
          document.getElementById("t").innerHTML =
          "Messages with " + ret[i].username;

        updateChat();
        }
      }
    });
  });
  setInterval(updateChat, 10000);
};

function updateChat() {
  clearChat();
  let packet = { from: getCookie("username"), to: currentConvo };
  let body = JSON.stringify(packet);
  fetch("messaging/getConversation/", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: body
  }).then(function(res) {
    res.json().then(function(ret) {
      //alert(ret)
      for (let i = ret.length - 1; i >= 0; i--) {
        if (
          (ret[i].from == currentConvo && ret[i].to == getCookie("username")) ||
          (ret[i].to == currentConvo && ret[i].from == getCookie("username"))
        ) {
          if (ret[i].to == getCookie("username")) {
            makeFromTextBubble(ret[i].message);
          }
          if (ret[i].from == getCookie("username")) {
            //alert(ret[i])
            makeToTextBubble(ret[i].message);
          }
        }
      }
    });
  });
}

function sendMessage() {
  let message = {
    from: getCookie("username"),
    to: currentConvo,
    message: document.querySelector("#msg").value
  };
  let body = JSON.stringify(message);

  fetch("messaging/sendMessage/", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: body
  });

  updateChat();
  document.getElementById("msg").value = "";
  window.reload();
}

function makeToTextBubble(str) {
  let container = document.createElement("div");
  let bubble = document.createElement("div");
  let pad = document.createElement("div");
  container.style = "display:block; margin:5px; height:10%";
  pad.style = "width:35%";
  bubble.innerHTML = str;
  bubble.style =
    "background-color: #70dafa; width:40%; font-size:20px; font-weight:bold; border-radius:15px;  float:right";
  container.appendChild(pad);
  container.appendChild(bubble);
  document.getElementById("board").appendChild(container);
}

function makeFromTextBubble(str) {
  let container = document.createElement("div");
  let bubble = document.createElement("div");
  let pad = document.createElement("div");
  container.style = "display:block; margin:5px; height:10%";
  pad.style = "width:35%";
  bubble.innerHTML = str;
  bubble.style =
    "background-color: #6df299; width:40%; font-size:20px; font-weight:bold; border-radius:15px; float:left";
  container.appendChild(bubble);
  container.appendChild(pad);
  document.getElementById("board").appendChild(container);
}

function clearChat() {
  document.getElementById("board").innerHTML = "";
}
