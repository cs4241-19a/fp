const information = [];

const informationList = document.getElementById("iDataInfo");
const informationForm = document.forms[0];
const nameInput = informationForm.elements["iNameData"];
const passInput = informationForm.elements["iPassData"];
const idInput = "";
const inputString = { username: nameInput, password: passInput };


const appendNewInformation = function(iItem) {
  const newListItem = document.createElement("li");
  newListItem.innerHTML = iItem;
  console.log("This is iItem", iItem);
  informationList.appendChild(newListItem);
};

const iGetAllData = function(e) {
  event.preventDefault();
  
  fetch("/iGetAll", {
    method: "GET"
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(responseJSON) {
      let temp = [];
      for (let i = 0; i < responseJSON.length; i++) {
        temp = [
          responseJSON[i]._id,
          responseJSON[i].username,
          responseJSON[i].password
        ];
        information.push(temp);
        appendNewInformation(temp);
      }
  });
};

const iAddData = function(e) {
  event.preventDefault();
  const input_1 = document.querySelector("#iNameData");
  const input_2 = document.querySelector("#iPassData");
  fetch("/iAdd", {
    method: "POST",
    body: JSON.stringify({ username: input_1.value, password: input_2.value }),
    headers: { "Content-Type": "application/json" }
  }).then(console.log);
};

const iRemoveData = function(e) {
  e.preventDefault();
  const removeName = document.querySelector("#iRemoveNameData");
  const removePass = document.querySelector("#iRemovePassData");
  const removeID = document.querySelector("#iRemoveIDData");
  
  fetch("/iRemove", {
    method: "POST",
    body: JSON.stringify({ username: removeName.value, password: removePass.value, _id:removeID.value }),
    headers: { "Content-Type": "application/json" }
  }).then(console.log);

};

const iClearing = function(e) {
  
  fetch("/iClear", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
    //.then(document.location.reload())
  .then(document.location='/')
    .then(console.log);
};

const goingToGrammar = function() {
  
  fetch("/gotoGrammar", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
    //.then(document.location.reload())
  .then(document.location='/gotoGrammar')
    .then(console.log);
};

const iUpdating = function(e){
  e.preventDefault();
  const removeName = document.querySelector("#iUpdateNameData");
  const removePass = document.querySelector("#iUpdatePassData");
  const removeID = document.querySelector("#iUpdateIDData");
  fetch("/iUpdate", {
    method: "POST",
    body: JSON.stringify({ username: removeName.value, password: removePass.value, _id:removeID.value }),
    headers: { "Content-Type": "application/json" }
  }).then(console.log);
};

window.onload = function() {
  const button = document.querySelector("#iAddInfo");
  const button2 = document.querySelector("#iAllInfo");
  const button3 = document.querySelector("#iRemoveData");
  const button4 = document.querySelector("#iUpdateData");
  const button5 = document.querySelector("#iClear");
  const button6 = document.querySelector("#gotoGrammar");
  //button.onclick = submitFunction();
  button.onclick = iAddData;
  button2.onclick = iGetAllData;
  button3.onclick = iRemoveData;
  button4.onclick= iUpdating;
  button5.onclick = iClearing;
  button6.onclick = goingToGrammar;  
};

//building a new button
//place new button on index or whichever page you need
//next note the id of the button.
//go to the client side js page that has the button and add it to the event listener for
//the page. Add the onclick event. Assign it to the clicking function.
//in the fetch, fetch the path /whatever and then
//next go to the server page and hook it up to /whatever there. Use Get or Post
//
