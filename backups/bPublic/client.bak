const information = [];

// define variables that reference elements on our page - see UL - id
const informationList = document.getElementById("dataInfo");
const informationForm = document.forms[0];
const nameInput = informationForm.elements["nameData"];
const passInput = informationForm.elements["passData"];
const idInput = "";
const inputString = { username: nameInput, password: passInput };

// a helper function that creates a list item for a given data
const appendNewInformation = function(iItem) {
  const newListItem = document.createElement("li");
  newListItem.innerHTML = iItem;
  console.log("This is iItem", iItem);
  informationList.appendChild(newListItem);
};


/*
// iterate through every data item and add it to our page - parameter name is
//whatever you want it to be
information.forEach(function(jItem) {
  appendNewInformation(jItem);
});*/


const getAllData = function(e) {
  event.preventDefault();
  //this function will find the inital data values and output them to the list
  //these items will have a remove button next to them
  fetch("/getAll", {
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
      //console.log("here is all data: ", responseJSON[0]._id)
    });
};

const addData = function(e) {
  event.preventDefault();
  const input_1 = document.querySelector("#nameData");
  const input_2 = document.querySelector("#passData");
  fetch("/add", {
    method: "POST",
    body: JSON.stringify({ username: input_1.value, password: input_2.value }),
    headers: { "Content-Type": "application/json" }
  }).then(console.log);
  //input_1 by itself without .value is an HTMLElement it needs to have .value to be useful info
  //.then(appendNewInformation([input_1.value,input_2.value]));
};

const removeData = function(e) {
  e.preventDefault();
  const removeName = document.querySelector("#removeNameData");
  const removePass = document.querySelector("#removePassData");
  const removeID = document.querySelector("#removeIDData");
  //alert("I'm removing");
  fetch("/remove", {
    method: "POST",
    body: JSON.stringify({ username: removeName.value, password: removePass.value, _id:removeID.value }),
    headers: { "Content-Type": "application/json" }
  }).then(console.log);
 
};

const clicking = function(e) {
  //alert("I'm clicking");
  fetch("/clickerish", {
    method: "POST",

    headers: { "Content-Type": "application/json" }
  }).then(document.location.reload())
    .then(console.log);
};

const updating = function(e){
  e.preventDefault();
  const removeName = document.querySelector("#removeNameData");
  const removePass = document.querySelector("#removePassData");
  const removeID = document.querySelector("#removeIDData");
  fetch("/update", {
    method: "POST",
    body: JSON.stringify({ username: removeName.value, password: removePass.value, _id:removeID.value }),
    headers: { "Content-Type": "application/json" }
  }).then(console.log); 
};

window.onload = function() {
  const button = document.querySelector("#addInfo");
  const button2 = document.querySelector("#allInfo");
  const button3 = document.querySelector("#removeData");
  const button4 = document.querySelector("#updateData");
  const button5 = document.querySelector("#clicker");
  //button.onclick = submitFunction();
  button.onclick = addData;
  button2.onclick = getAllData;
  button3.onclick = removeData;
  button4.onclick= updating;
  button5.onclick = clicking;
};

//building a new button
//place new button on index or whichever page you need
//next note the id of the button.
//go to the client side js page that has the button and add it to the event listener for
//the page. Add the onclick event. Assign it to the clicking function.
//in the fetch, fetch the path /whatever and then 
//next go to the server page and hook it up to /whatever there. Use Get or Post
//
