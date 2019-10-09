function query(str) {
  let body = { name: str, crn: null };
  let json = JSON.stringify(body);

  fetch("api/books/getBooks", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: json
  }).then(function(res) {
    res.json().then(function(ret) {
      for (let i = 0; i < ret.length; i++) {
        alert(ret[i])
        if (ret[i].name.contains(str)) {
          let tdNode = document.createElement("td");
          let tdNode2 = document.createElement("td");
          let tdNode3 = document.createElement("td");
          let trNode = document.createElement("tr");
          tdNode.appendChild(document.createTextNode(ret[i].name));
          tdNode2.appendChild(document.createTextNode(ret[i].crn));
          tdNode3.appendChild(document.createTextNode("Physical"));
          trNode.appendChild(tdNode);
          trNode.appendChild(tdNode2);
          trNode.appendChild(tdNode3);
          document.getElementById("results").appendChild(trNode);
        }
      }
    });
  });
}

window.onload = function() {
  document.addEventListener("keypress", function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      let str = document.querySelector("#search");
      query(str);
      //window.reload()
    }
  });
};
