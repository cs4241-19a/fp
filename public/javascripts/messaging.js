let userArray = [];
let convos = [];

function userSetup(me) {
  fetch("api/users/getUsers", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  }).then(function(res) {
    res.json().then(function(ret) {});
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

var sb = new SendBird({appId: APP_ID});
sb.connect(USER_ID, function(user, error) {
    if (error) {
        return;
    }
});
sb.OpenChannel.createChannel(function(openChannel, error) {
    if (error) {
        return;
    }
});
sb.OpenChannel.getChannel(CHANNEL_URL, function(openChannel, error) {
    if (error) {
        return;
    }

    openChannel.enter(function(response, error) {
        if (error) {
            return;
        }
    })
});
