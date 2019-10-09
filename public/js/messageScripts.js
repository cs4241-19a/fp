// Code specifically for messages and tasks that the user has received

// Note that we don't allow for users to send messages themselves, but messages will be automatically
// generated for them whenever they are assigned a task in another meeting
let isHidden = true;
let isHiddenTasks = true;

const submit = function( e ) { // Submit request for a new or updated student's grades
  // prevent default form action from being carried out
  e.preventDefault()

  const nameInput = document.querySelector( '#yourname' ),
        gradeInput = document.querySelector( '#yourgrade' ),
        json = { yourname: nameInput.value,  yourgrade: gradeInput.value },
        body = JSON.stringify( json );

  fetch( '/submit', {
    method:'POST',
    body: JSON.stringify( json ),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include' 
  })
  .then( function( response ) {
    // Inform the user of what the letter grade of the student is, and
    // refresh the table view with the new student in it
    console.log( response );
    response.json().then((data) => {
      document.getElementById("tablePrint").innerHTML = '<table></table>';
      if (!isHidden) {
        view(e);
      }
      alert("The grade of this student is : "
              + data.numericGrade + " (" + data.letterGrade + ")");
    });
  });
  return false;
}

// Get all messages from the db for this user
const view = function(e) {
  e.preventDefault();

  fetch( '/viewMessages', {
    method:'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  })
  .then( function( response ) {
    
    // Fetch all students in the database to add to a table
    console.log( response );
    response.json().then((data) => {
      console.log(data);
      let messagesArray = data.messagesArray;
      let num = messagesArray.length;
    let myTable = '<table class ="pageText"><tr><td>From:</td>';
    myTable += "<td>Contents:</td></tr>";
    for (let i = 0; i < num; i++) { // Make the table with one row per student
      myTable += "<tr><td>" + messagesArray[i].sender + "</td>";
      myTable += "<td>" + messagesArray[i].contents + "</td></tr>";
    }
    myTable += "</table>";
    document.getElementById("tablePrint").innerHTML = myTable;
    isHidden = false;
    });
  });
  return false;
}

const hide = function( e ) {
  e.preventDefault();
  document.getElementById("tablePrint").innerHTML = '<table></table>';
  isHidden = true;
}

// Get all tasks from the db from this user
const viewMeetingTasks = function(e) {
  e.preventDefault();
  let tasksArray;

  //const //nameInput = document.querySelector( '#meetingname' ),
  const json = { },
        body = JSON.stringify( json );
  
  fetch( '/viewMyTasks', {
    method:'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: body
  })
  .then( function( response ) {
    
    // Fetch all tasks for this meeting in the database to add to a table
    console.log( response );
    response.json().then((data) => {
      console.log(data);
      tasksArray = data.tasksArray;
      let numTasks = tasksArray.length;
    let myTable = '<table class ="pageText"><tr><td>Task Name:</td>';
    myTable += "<td>Meeting:</td>"
    myTable += "<td>Date:</td>"
    myTable += "<td>Details:</td></tr>";
    for (let i = 0; i < numTasks; i++) { // Make the table with one row per task
      myTable += "<tr><td>" + tasksArray[i].taskName + "</td>";
      myTable += "<td>" + tasksArray[i].meetingName + "</td>";
      myTable += "<td>" + tasksArray[i].date + "</td>";
      myTable += "<td>" + tasksArray[i].details + "</td></tr>";
    }
    myTable += "</table>";
    document.getElementById("tableTasksPrint").innerHTML = myTable;
    isHiddenTasks = false;
    });
  });
  return false;
}

const hideTasks = function( e ) {
  e.preventDefault();
  document.getElementById("tableTasksPrint").innerHTML = '<table></table>';
  isHiddenTasks = true;
}

window.onload = function() { // Link each button to its respective function
  const viButton = document.querySelector( '#viewButton' );
  const hiButton = document.querySelector( '#hideButton' );
  hiButton.onclick = hide;
  viButton.onclick = view;
  const viTaButton = document.querySelector( '#viewTasksButton' );
  const hiTaButton = document.querySelector( '#hideTasksButton' );
  hiTaButton.onclick = hideTasks;
  viTaButton.onclick = viewMeetingTasks;
}
