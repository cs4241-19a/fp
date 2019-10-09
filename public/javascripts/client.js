  
 let count = 0;
 let localAppData = []
 let currentUser = ""

    e.preventDefault()
      

    window.onload = function() {
   
  }

//document.location.reload()
/*
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
  
*/