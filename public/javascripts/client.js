  
  let count = 0;
  document.getElementById("editScreen").style.display = "none"
 let localAppData = []
 let currentUser = ""
 var loaded = 0
 
 
 function langFinder(str){
   switch(str){
     case "en-sq":
       return "Albanian"
       break;
    case "en-hy":
       return "Armenian"
       break;
    case "en-ar":
       return "Arabic"
       break;
    case "en-bg":
       return "Bulgarian"
       break;
    case "en-zh":
       return "Chinese"
       break;
    case "en-nl":
       return "Dutch"
       break;
    case "en-el":
       return "Greek"
       break;
    case "en-ka":
       return "Georgian"
       break;
    case "en-de":
       return "German"
       break;
    case "en-it":
       return "Italian"
       break;
    case "en-es":
       return "Spanish"
       break;
    case "en-pl":
       return "Polish"
       break;
    case "en-ru":
       return "Russian"
       break; 
   }
 }

    
  const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
    count = count + 1;
    let temp = count
    const inputword = document.querySelector( '#word' );
    const inputlang = document.querySelector('#lang');
    let json = { word: inputword.value , lang:inputlang.value, action: "translate", id: count, user: "", pass: ""}
    
    fetch( '/queryLogin', {
      method:'POST', 
    })
    .then (function(creds){
      return creds.text();
    }).then(function(user){
      user = user.split(",")
      json.user = user[0]
      json.pass = user[1]
      if (user[0] !== ""){
        currentUser = user[0] 
        document.getElementById("login").innerHTML = "Logout"
        let str = user[0] + "'s Travel Dictionary App"
        document.getElementById("t").innerHTML = str
        document.getElementById("login").href = "/"
      }
    });
    
    json.user = currentUser
    
    let body = JSON.stringify( json )
    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      return response.json();
    }).then(function (data) {
        let tdNode = document.createElement("td");
        let tdNode2 = document.createElement("td");
        let tdNode3 = document.createElement("td");
        let tdNode4 = document.createElement("td");
        let trNode = document.createElement("tr");
        let langSelect = document.getElementById("lang");
        let selectedText = langSelect.options[langSelect.selectedIndex].text;
      
        let deleteButton = document.createElement("button")
        let editButton = document.createElement("button")
        
        deleteButton.className = "pure-button deleteButton"
        deleteButton.innerHTML = "Delete";
        editButton.className = "pure-button editButton"
        editButton.innerHTML = "Edit";
      
        deleteButton.onclick =  function deleteRow() {
           let p=this.parentNode.parentNode;
           p.parentNode.removeChild(p);
           json.action = "delete"
           json.id = temp;
           body = JSON.stringify( json )
           fetch( '/submit', {
            method:'POST',
            body
           })
        }
      
       editButton.onclick =  function editRow() {
          document.getElementById("editScreen").style.display = "block";
           let p=this.parentNode.parentNode;
            p.parentNode.removeChild(p);
          document.getElementById("submitEdits").onclick = function() {
            json.action = "edit"
            json.id = temp;
            json.user = currentUser;
            json.lang = document.querySelector('#switchLang').value
            body = JSON.stringify( json )

            fetch( '/submit', {
                  method:'POST',
                  body
                 }).then(function(ret){
                   return ret.json();
                 }).then(function(edits){
              
                    let langSelect2 = document.getElementById("switchLang");
                    let selectedText2 = langSelect2.options[langSelect2.selectedIndex].text;
                    
                    let tdNode5 = document.createElement("td");
                    let tdNode6 = document.createElement("td");
                    let tdNode7 = document.createElement("td");
                    let tdNode8 = document.createElement("td");
                    let trNode2 = document.createElement("tr");
                    tdNode5.appendChild(document.createTextNode(edits.word));
                    tdNode6.appendChild(document.createTextNode(edits.translation));
                    tdNode7.appendChild(document.createTextNode(selectedText2));
                    tdNode8.appendChild(editButton);
                    tdNode8.appendChild(deleteButton);
                    trNode2.appendChild(tdNode5);
                    trNode2.appendChild(tdNode6);
                    trNode2.appendChild(tdNode7);
                    trNode2.appendChild(tdNode8);
                    document.getElementById("results").appendChild(trNode2);
                    document.getElementById("editScreen").style.display = "none"
                    return false
                         });
            return false
                }
         return false
         }
      
        tdNode.appendChild(document.createTextNode(data.word));
        tdNode2.appendChild(document.createTextNode(data.translation));
        tdNode3.appendChild(document.createTextNode(selectedText));
        tdNode4.appendChild(editButton);
        tdNode4.appendChild(deleteButton);
        trNode.appendChild(tdNode);
        trNode.appendChild(tdNode2);
        trNode.appendChild(tdNode3);
        trNode.appendChild(tdNode4);
        document.getElementById("results").appendChild(trNode);
    })
  }

  window.onload = function() {
    //recieve session info here

    //clear tables    
   
    
    fetch( '/queryLogin', {
      method:'POST', 
    })
    .then (function(creds){
      return creds.text();
    }).then(function(creds){
      return creds.split(',');
    }).then(function(user){
      if (user[0] != ""){
        localAppData = []
        currentUser = user[0];
        document.getElementById("login").innerHTML = "Logout"
        document.getElementById("t").innerHTML = currentUser + "'s Travel Dictionary App"
        document.getElementById("login").href = "/"

      }
    });
    
     let rows = document.getElementsByTagName("tr")
    for(let i = 0; i < rows.size; i++){
      rows[i].remove()
    }
    
    
    fetch( '/userData', {
      method:'POST', 
    })
    .then (function(guts){
      return guts.json();
    }).then(function(allData){ 
      for(let i = 0; i < allData.length; i++ ){
        if(currentUser == allData[i].user){
          let json = { word: allData[i].word , translation: allData[i].translation, lang:allData[i].lang, action: allData[i].action, id: allData[i].id, user: allData[i].user, pass: allData[i].pass}
          let body = JSON.stringify(json)
          let data = json
         
              let tdNode = document.createElement("td");
              let tdNode2 = document.createElement("td");
              let tdNode3 = document.createElement("td");
              let tdNode4 = document.createElement("td");
              let trNode = document.createElement("tr");
              let langSelect = document.getElementById("lang");
              let selectedText = langSelect.options[langSelect.selectedIndex].text;

              let deleteButton = document.createElement("button")
              let editButton = document.createElement("button")

              deleteButton.className = "pure-button deleteButton"
              deleteButton.innerHTML = "Delete";
              editButton.className = "pure-button editButton"
              editButton.innerHTML = "Edit";

                    deleteButton.onclick =  function deleteRow() {
                       let p=this.parentNode.parentNode;
                       p.parentNode.removeChild(p);
                       json.action = "delete"
                       json.id = allData[i].id;
                       body = JSON.stringify( json )
                       fetch( '/submit', {
                        method:'POST',
                        body
                       })
                    }

                   editButton.onclick =  function editRow() {
                      document.getElementById("editScreen").style.display = "block";
                       let p=this.parentNode.parentNode;
                        p.parentNode.removeChild(p);
                      document.getElementById("submitEdits").onclick = function() {
                        json.action = "edit"
                        json.id = allData[i].id;
                        json.user = currentUser;
                        json.lang = document.querySelector('#switchLang').value
                        body = JSON.stringify( json )

                        fetch( '/submit', {
                              method:'POST',
                              body
                             }).then(function(ret){
                               return ret.json();
                             }).then(function(edits){

                                let langSelect2 = document.getElementById("switchLang");
                                let selectedText2 = langSelect2.options[langSelect2.selectedIndex].text;

                                let tdNode5 = document.createElement("td");
                                let tdNode6 = document.createElement("td");
                                let tdNode7 = document.createElement("td");
                                let tdNode8 = document.createElement("td");
                                let trNode2 = document.createElement("tr");
                                tdNode5.appendChild(document.createTextNode(edits.word));
                                tdNode6.appendChild(document.createTextNode(edits.translation));
                                tdNode7.appendChild(document.createTextNode(selectedText2));
                                tdNode8.appendChild(editButton);
                                tdNode8.appendChild(deleteButton);
                                trNode2.appendChild(tdNode5);
                                trNode2.appendChild(tdNode6);
                                trNode2.appendChild(tdNode7);
                                trNode2.appendChild(tdNode8);
                                document.getElementById("results").appendChild(trNode2);
                                document.getElementById("editScreen").style.display = "none"
                                return false
                                     });
                        return false
                            }
                     return false
                     }

                    tdNode.appendChild(document.createTextNode(data.word));
                    tdNode2.appendChild(document.createTextNode(data.translation));
                    tdNode3.appendChild(document.createTextNode(langFinder(data.lang)));
                    tdNode4.appendChild(editButton);
                    tdNode4.appendChild(deleteButton);
                    trNode.appendChild(tdNode);
                    trNode.appendChild(tdNode2);
                    trNode.appendChild(tdNode3);
                    trNode.appendChild(tdNode4);
                    document.getElementById("results").appendChild(trNode);
                
          } 
      }
     
    });
    

    //
    //document.location.reload()
    const button = document.getElementById( 'translate' )
    button.onclick = submit
  }

//document.location.reload()
