
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
        let updateForm = document.createElement("form");

        updateForm.innerHTML = "<input type='text' name='_id' value='" + ret[i]._id + "'><input id='form-name-" + ret[i]._id +"' type='text' name='name' value='" + ret[i].name + "'><input type='text' name='crn' id='form-crn-" + ret[i]._id + "' value='" + ret[i].crn + "'>"
        updateForm.setAttribute("id", "update-form-" + ret[i]._id);
        updateForm.setAttribute("action", "/api/books/deleteBook");
        updateForm.setAttribute("method", "POST");

        deleteForm.innerHTML = "<input type='text' name='_id' value='" + ret[i] +"'>";
        deleteForm.setAttribute("id", "delete-form-" + ret[i]._id);
        deleteForm.setAttribute("action", "/api/books/editBook");
        deleteForm.setAttribute("method", "POST");

        deleteButton.className = "pure-button deleteButton";
        deleteButton.innerHTML = "Delete";
        editButton.className = "pure-button editButton";
        editButton.innerHTML = "Edit";

        deleteButton.setAttribute("id", "delete-id-" + ret[i]._id);
        deleteButton.setAttribute("onclick", "document.getElementById('delete-form-" + ret[i]._id + "').submit();");
        editButton.setAttribute("id", "edit-id-" + ret[i]._id);
        editButton.setAttribute("onclick", "document.getElementById('update-form-" + ret[i]._id + "').submit();");
        editButton.style.display = "none";

        let tdNode = document.createElement("td");
        tdNode.setAttribute("contenteditable", "true");
        tdNode.setAttribute("id", "name-id-" + ret[i]._id);
        tdNode.setAttribute("oninput", "document.getElementById('edit-id-" + ret[i]._id + "').style.display='inline-block'; document.getElementById('form-name-" + ret[i]._id + "').setAttribute('value', document.getElementById('name-id-" + ret[i]._id + "').innerText);");        
        let tdNode2 = document.createElement("td");
        tdNode2.setAttribute("contenteditable", "true");
        tdNode2.setAttribute("id", "crn-id-" + ret[i]._id);
        tdNode2.setAttribute("oninput", "document.getElementById('edit-id-" + ret[i]._id + "').style.display='inline-block'; document.getElementById('form-crn-" + ret[i]._id + "').setAttribute('value', document.getElementById('crn-id-" + ret[i]._id + "').innerText);");
        let tdNode3 = document.createElement("td");
        let tdNode4 = document.createElement("td");
        let trNode = document.createElement("tr");
        tdNode.appendChild(document.createTextNode(ret[i].name));
        tdNode2.appendChild(document.createTextNode(ret[i].crn));
        tdNode3.innerHTML = (ret[i].location == "" || ret[i].location == "Physical" || ret[i].location == null ? "Physical" : "<a href='" + ret[i].location + "'>Digital</a>");
        tdNode4.appendChild(editButton);
        tdNode4.appendChild(deleteButton);
        trNode.appendChild(tdNode);
        trNode.appendChild(tdNode2);
        trNode.appendChild(tdNode3);
        trNode.appendChild(tdNode4);
        trNode.appendChild(updateForm);
        trNode.appendChild(deleteForm);
        document.getElementById("results").appendChild(trNode);
      }
    });
  });
};

