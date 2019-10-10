window.onload = function(){
  fetch("api/users/getUsers", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
  }).then(function(res) {
    res.json().then(function(ret) {
     for(let i = 0; i < ret.length; i++){
       let l = document.createElement("li");
       let a = document.createElement("a");
       a.href = "#"
       a.class = "pure-menu-link"
       l.class = "pure-menu-item";
       l.innerHTML = ret[i].username;
       l.style = "padding: auto; margin:10px; color:white; font-weight:bold;"
       l.appendChild(a);
       document.getElementById("people").appendChild(l)
     }
    });
  });
}