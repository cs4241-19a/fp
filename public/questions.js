var _roomCode = undefined
var _userName = undefined
var _isHost = undefined
// Used to tremember the user's information on refresh
const rememberSession = function() {
  _isHost = false
  _roomCode = sessionStorage.getItem('code')
  _userName = sessionStorage.getItem('username')
  setRoomCode(_roomCode)
}

const rememberHostSession = function() {
  _isHost = true
  _roomCode = sessionStorage.getItem('code')
  _userName = sessionStorage.getItem('username')
  var codeDisplay = document.querySelector(".classcode")
  console.log(codeDisplay)
  codeDisplay.innerHTML = _roomCode;
  loadQuestions()
}

const askQ = function( ) {
  //e.preventDefault()
  let username = _userName,
      code = _roomCode

  // User didn't join class
  if (code == "invalid") {
      window.alert("You must join a class before you can post a question!")
  }
  // User is in class
  else {
    fetch( '/makeId', {method:'POST'})
      .then(function (response){
        response.text()
        .then(function (message) {
          const uuid = message
        console.log(uuid)
          var text = document.querySelector(".questionInput");
          if(text.value.trim() != '') {
            makeQuestion(text.value, 0, uuid, false);
          }
          
          let json = {
            question: text.value,
            quid: uuid,
            username: username,
            code: code
          }
          
          text.value = "";
          text.innerHTML = "";

          let body = JSON.stringify(json)

          fetch('/saveQuestion', {
            method: 'POST',
            body: body,
            headers: { 'Content-Type': 'application/json' }
          })
          .then(function (response){
            response.text()
            .then(function(message){
              console.log(message)
            })
          })
        })
      })
  }
}

const incrementUpvote = function( id ) {
  console.log("Incrementing...");
  //console.log( id )
  var label = document.querySelector(".upvotes#"+id);
  //console.log( label )
  var num = parseInt(label.innerHTML);
  label.innerHTML = num + 1;
  
  let json = {
            quid: id,
            upvote: num
          }
  let body = JSON.stringify(json);
  console.log(body)
  fetch('/modifyUpvote', {
            method: 'POST',
            body: body,
            headers: { 'Content-Type': 'application/json' }
          }).then(function( response ) {
    console.log(response)
  })
}

const loadQuestions = function(){
  // Clear current list of questions
  abandonOffspring()
  
  // Load questions from database
    console.log("Loading questions...")
  const json = {code: _roomCode},
        body = JSON.stringify(json)
  console.log(body)
    fetch( '/loadQuestions', {
      method:'POST',
      body: body,
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    })
      .then( function( response ) {
        response.text()
        .then(function (message){
        let questions = JSON.parse(message)
        console.log('Server said back: ', questions)
        
        questions.sort(function(a, b){
          return parseInt(b.upvote) - parseInt(a.upvote)});
          
        var first = true
        for (let entry of questions){
          if(_isHost && first){
            makeHeadQuestion(entry.question,entry.upvote, entry.quid)
            first = false
          } else {
            makeQuestion(entry.question,entry.upvote, entry.quid, _isHost)
          }
        }
      })
    })
}

const makeQuestion = function(question, upvotes, uuid, isTeacher) {
  var start = document.querySelector("#question-list")

  //CREATE CHILDREN
  var questionElement = document.createElement("li")
  questionElement.setAttribute("class", "question-format");
  questionElement.setAttribute("id", uuid);  //sets uuid


  var questionLabel = document.createElement("label");
  questionLabel.setAttribute("class", "question");
  questionLabel.setAttribute("id", uuid);  //sets uuid
  questionLabel.innerHTML = question;       //Includes the Question

  var rightDiv = document.createElement("div");
  rightDiv.setAttribute("class", "right");

  var upvotesLabel = document.createElement("label");
  upvotesLabel.setAttribute("class", "upvotes");
  upvotesLabel.setAttribute("id", uuid);   //set uuid
  upvotesLabel.innerHTML = upvotes;          //Include Number of Upvotes

  var button = document.createElement("button");
  button.setAttribute("id", uuid)  //set uuid   
  console.log(uuid)

  var image = document.createElement("img");
  if(isTeacher) {
    button.setAttribute("class", "resolveButton");
    button.setAttribute("onclick", "resolveQuestion('"+uuid+"')")      
    image.setAttribute("src", "https://cdn.glitch.com/33f61a64-3dc4-418d-b67f-1456d58e0a6f%2Fcheckmark.png?v=1570583137096");
  } else {
    button.setAttribute("class", "upvoteButton");
    button.setAttribute("onclick", "incrementUpvote('"+uuid+"')")      
    image.setAttribute("src", "https://cdn.glitch.com/33f61a64-3dc4-418d-b67f-1456d58e0a6f%2Fuparrow.png?v=1570584249451");
  }
  image.setAttribute("width", "30");
  image.setAttribute("height", "30");

  //APPEND CHILDREN
  button.appendChild(image);

  rightDiv.appendChild(upvotesLabel);
  rightDiv.appendChild(button);

  questionElement.appendChild(questionLabel);
  questionElement.appendChild(rightDiv);

  start.appendChild(questionElement);


  /* QUESTION FORMAT
  
      <li class="question-format">
        <label class="question">Where do things go when they are lost?</label>
        <div class="right">
          <label class="upvotes">24</label>
          <button class="upvoteButton">
            <img src="https://cdn.glitch.com/33f61a64-3dc4-418d-b67f-1456d58e0a6f%2Fuparrow.png?v=1570584249451" width="30" height="30">
          </button>
        </div>
      </li>
  */
      
}

const makeHeadQuestion = function(question, upvotes, uuid) {
  var start = document.querySelector(".start")
  
  //CREATE CHILDREN
  var questionElement = document.createElement("div")
  questionElement.setAttribute("class", "question-format");
  questionElement.setAttribute("data", "active");
  questionElement.setAttribute("id", uuid);  //sets uuid
  
  var questionLabel = document.createElement("label");
  questionLabel.setAttribute("class", "question");
  questionLabel.setAttribute("id", uuid);  //sets uuid
  questionLabel.innerHTML = question;       //Includes the Question

  var rightDiv = document.createElement("div");
  rightDiv.setAttribute("class", "right");

  var upvotesLabel = document.createElement("label");
  upvotesLabel.setAttribute("class", "upvotes");
  upvotesLabel.setAttribute("id", uuid);   //set uuid
  upvotesLabel.innerHTML = upvotes;          //Include Number of Upvotes

  var button = document.createElement("button");
  button.setAttribute("id", uuid)  //set uuid   
  console.log(uuid)  
  button.setAttribute("class", "resolveButton");
  button.setAttribute("onclick", "resolveQuestion('"+uuid+"')")      
  
  var image = document.createElement("img");
  image.setAttribute("src", "https://cdn.glitch.com/33f61a64-3dc4-418d-b67f-1456d58e0a6f%2Fcheckmark.png?v=1570583137096");
  image.setAttribute("width", "30");
  image.setAttribute("height", "30");
  
  //APPEND CHILDREN
  button.appendChild(image);

  rightDiv.appendChild(upvotesLabel);
  rightDiv.appendChild(button);

  questionElement.appendChild(questionLabel);
  questionElement.appendChild(rightDiv);
  
  start.appendChild(questionElement);
  
  /*  QUESTION FORMAT
          <div class="question-format" data="active"> 
              <label class="question">How do you find the square root of pi?</label>
              <div class="right">
                <label class="upvotes">43</label>
                <button class="resolveButton" onsubmit="resolveQuestion()">
                    <img src="https://cdn.glitch.com/33f61a64-3dc4-418d-b67f-1456d58e0a6f%2Fcheckmark.png?v=1570583137096" width="40" height="40">          
                </button>
              </div>
          </div>
  */

}


const setRoomCode = function(roomCode){
  if (!roomCode ){
    if(document.querySelector(".classcodeInput").value.trim() != ""){
      var roomCode = document.querySelector(".classcodeInput").value  
    } else {
      var roomCode = "None"
    }
  }
  _roomCode = roomCode
  console.log("Room code: ", roomCode)
  sessionStorage.setItem("code", roomCode)
  var codeDisplay = document.querySelector("#classcode")
  console.log(codeDisplay)
  codeDisplay.innerHTML = roomCode;
  loadQuestions()
}

const abandonOffspring = function() {
  var header = document.querySelector(".start")
  console.log(header)

  if(header != null){
    while(header.childNodes[0] != null){
      header.removeChild(header.childNodes[0])
    }
  }
  console.log("yeah")
  console.log(header)

  var list = document.querySelector("ul")
  while(list.childNodes[0] != null){
    list.removeChild(list.childNodes[0])
  }
}

const resolveQuestion = function(id) {
  //id.preventDefault();
  
  var listElement = document.querySelector("li#"+id);
  if(listElement == null) {
    listElement = document.querySelector("div#"+id);
  }
  console.log(listElement)
  listElement.parentNode.removeChild(listElement);
  
   const json = {id: id},
    body = JSON.stringify(json)
  console.log(body)
    fetch( '/deleteQuestion', {
      method:'POST',
      body: body,
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    })
  .then(function(response) {
    response.text()
    })
    .then(function(message){
      console.log(message)
    })
}
