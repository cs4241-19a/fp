function query() {
 
  document.getElementById("results")

  
  let str = document.querySelector("#search").value;
  fetch("api/books/getBooks", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
  }).then(function(res) {
    res.json().then(function(ret) {
      for (let i = 0; i < ret.length; i++) {
        if (ret[i].name.includes(str)) {
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
      return;
    });
  });
}

window.onload = function() {
  document.getElementById("searchButton").onclick = query;
};
