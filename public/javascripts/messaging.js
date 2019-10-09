var Talk, talkSession;
let userArray = [];
let convos = [];

function userSetup(me) {
  fetch("api/users/getUsers", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  }).then(function(res) {
    res.json().then(function(ret) {
      for (let i = 0; i < ret.length; i++) {
        let next = new Talk.User({
          id: ret[i].id,
          name: ret[i].name,
          email: null
        });
        userArray.append(next);
      }
      for (let i = 0; i < userArray.length; i++) {
        let conversation = talkSession.getOrCreateConversation(
          Talk.oneOnOneId(me, userArray[i])
        );
        conversation.setParticipant(me);
        conversation.setParticipant(userArray[i]);
        convos.append(conversation);
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
    email: null
  });
  userSetup(me);
  window.talkSession = new Talk.Session({
    appId: "tqeei7aL",
    me: me
  });
  // SET INBOX
  var inbox = talkSession.createInbox({ selected: convos[0] });
  inbox.mount(document.getElementById("messageContainer"));
});
