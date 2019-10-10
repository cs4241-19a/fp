
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

function deleteRow() {
  return;
  //p.parentNode.parentNode.removeChild(p);
  //CALL DB HERE
}

function editRow() {
  return;
}

window.onload = function() {
  let cook = getCookie("username");
  let body = {username: cook};
  body = JSON.stringify(body)

  fetch("api/books/getBooksFromUser", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: body
  }).then(function(res) {
    res.json().then(function(ret) {
      for (let i = 0; i < ret.length; i++) {
        let deleteButton = document.createElement("button");
        let editButton = document.createElement("button");

        deleteButton.className = "pure-button deleteButton";
        deleteButton.innerHTML = "Delete";
        editButton.className = "pure-button editButton";
        editButton.innerHTML = "Edit";

        deleteButton.onclick = deleteRow();
        editButton.onclick = editRow();

        let tdNode = document.createElement("td");
        let tdNode2 = document.createElement("td");
        let tdNode3 = document.createElement("td");
        let tdNode4 = document.createElement("td");
        let trNode = document.createElement("tr");
        tdNode.appendChild(document.createTextNode(ret[i].name));
        tdNode2.appendChild(document.createTextNode(ret[i].crn));
        tdNode3.innerHTML = (ret[i].location == "" || ret[i].location == "Physical" ? "Physical" : "<a href='" + ret[i].location + "'>Digital</a>");
        tdNode4.appendChild(editButton);
        tdNode4.appendChild(deleteButton);
        trNode.appendChild(tdNode);
        trNode.appendChild(tdNode2);
        trNode.appendChild(tdNode3);
        trNode.appendChild(tdNode4);
        document.getElementById("results").appendChild(trNode);
      }
    });
  });
};

