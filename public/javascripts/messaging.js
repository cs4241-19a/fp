var Talk, talkSession;


function userSetup(){
  fetch("api/users/getUsers", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
  }).then(function(res) {
    res.json().then(function(str) {
       // Parse Users and add them to window
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

(function(t, a, l, k, j, s) {
  s = a.createElement("script");
  s.async = 1;
  s.src = "https://cdn.talkjs.com/talk.js";
  a.head.appendChild(s);
  k = t.Promise;
  t.Talk = {
    v: 2,
    ready: {
      then: function(f) {
        if (k)
          return new k(function(r, e) {
            l.push([f, r, e]);
          });
        l.push([f]);
      },
      catch: function() {
        return k && new k();
      },
      c: l
    }
  };
})(window, document, []);

Talk.ready.then(function() {
  var me = new Talk.User({
    id: "123456",
    name: getCookie("username"),
    email: "alice@example.com"
  });
  window.talkSession = new Talk.Session({
    appId: "tqeei7aL",
    me: me
  });
  
  
  
  
  // SET OTHER PARTICIPANT AND START CONVO
  var other = new Talk.User({
    id: "654321",
    name: "Sebastian",
    email: "Sebastian@example.com",
    photoUrl: "https://demo.talkjs.com/img/sebastian.jpg",
    welcomeMessage: "Hey, how can I help?"
  });

  // CREATE A CONVERSTATION
  var conversation = talkSession.getOrCreateConversation(
    Talk.oneOnOneId(me, other)
  );
  conversation.setParticipant(me);
  conversation.setParticipant(other);

  // SET INBOX
  var inbox = talkSession.createInbox({ selected: conversation });
  inbox.mount(document.getElementById("messageContainer"));
});
