function addBook() {
    let bookName = document.querySelector("#bookname");
    let crn = document.querySelector("#crn");
    let location = document.querySelector("#url");
    if(location.value == "") {
        location = "Physical"
    }
    let json = { username: getCookie("username"), name: bookName.value, crn: crn.value, location: location.value };
    let body = JSON.stringify(json);

    fetch("api/books/addBook", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: body
    }).then(function(res) {
        res.text().then(function(str) {
            if (str == "OK") {
                alert("Book added!");
                window.location = "/add";
            }
            if (str == "BAD") {
                alert("Error adding book!");
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

 document.getElementById("submitAdd").onclick = addBook

  var input = document.getElementById("url");
  input.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("submitAdd").click();
    }
  });

  var input2 = document.getElementById("crn");
  input2.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("submitAdd").click();
    }
  });
