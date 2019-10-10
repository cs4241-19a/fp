window.onLoad = function(){
  fetch("api/users/getUsers", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
  }).then(function(res) {
    res.json().then(function(ret) {
      alert(ret)
     for(let i = 0; i < ret.length; i++){
       let l = document.createElement("li");
       l.class = "pure-menu-item";
       l.innerHTML = ret[i].username;
       document.getElementById("people").appendChild(l)
     }
    });
  });
}