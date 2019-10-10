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

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function query() {
  document.getElementById("results").innerHTML = "";
  let str = document.querySelector("#search").value;
  fetch("api/books/getBooks", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  }).then(function(res) {
    res.json().then(function(ret) {
      for (let i = 0; i < ret.length; i++) {
        if (ret[i].name.includes(str) || ret[i].name.includes(capitalize(str))) {
          let user = ret[i].username + " has";
          if(ret[i].username == getCookie("username")){
            user = "You have";
          }
          let tdNode = document.createElement("td");
          let tdNode2 = document.createElement("td");
          let tdNode3 = document.createElement("td");
          let trNode = document.createElement("tr");
          tdNode.appendChild(document.createTextNode(ret[i].name));
          tdNode2.appendChild(document.createTextNode(ret[i].crn));
          tdNode3.innerHTML = (ret[i].location == "" || ret[i].location == "Physical" || ret[i].location == null ? user +" a copy!" : "<a href='" + ret[i].location + "'>Digital</a>");
          trNode.appendChild(tdNode);
          trNode.appendChild(tdNode2);
          trNode.appendChild(tdNode3);
          document.getElementById("results").appendChild(trNode);
        }
      }
      return;
    });
  });
}

window.onload = function() {
  document.getElementById("searchButton").onclick = query;
};
