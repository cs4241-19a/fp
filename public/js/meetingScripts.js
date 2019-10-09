// Code specifically for viewing and managing a task list for each meeting

let isHidden = true;

// Each task has one meeting and one assigned user that it relates to, although names can be shared
// Each meeting has a unique ID, and is findable as a unique combination for the meeting maker's username and the MeetingName

const submitTask = function( e ) { // Submit request for a new task for a user
  // prevent default form action from being carried out
  e.preventDefault()

  const nameInput = document.querySelector( '#meetingname' ),
        userInput = document.querySelector( '#assigneename' ),
        taskInput = document.querySelector( '#taskname' ),
        detailsInput = document.querySelector( '#details' ),
        json = { meeting: nameInput.value,  task: taskInput.value, name: userInput.value, details: detailsInput.value },
        body = JSON.stringify( json );

  fetch( '/submitTask', { //Note that on the server side, this will also give the assigned user a new message about their task
    method:'POST',
    body: JSON.stringify( json ),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include' 
  })
  .then( function( response ) {
    // Update the task list for the user
    console.log( response );
    response.json().then((data) => {
      document.getElementById("tablePrint").innerHTML = '<table></table>';
      if (!isHidden) {
        viewMeetingTasks(e);
      }
      if (data.taskAdded === false) {
        alert("Cannot add task: Meeting not found")
      }
    });
  });
  return false;
}

const viewMeetingTasks = function(e) {
  e.preventDefault();
  let tasksArray;

  const nameInput = document.querySelector( '#meetingname' ),
        json = { meeting: nameInput.value, },
        body = JSON.stringify( json );
  
  fetch( '/viewTasks', {
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
      if (data.tasksArray) {
        tasksArray = data.tasksArray;
        let numTasks = tasksArray.length;
        let myTable = '<table class ="pageText"><tr><td></td><td>' + nameInput.value + '<td></tr><tr><td>Task Name:</td>';
        myTable += "<td>Assigned to:</td>";
        myTable += "<td>Date:</td>";
        myTable += "<td>Details:</td></tr>";
        for (let i = 0; i < numTasks; i++) { // Make the table with one row per task
          myTable += "<tr><td>" + tasksArray[i].taskName + "</td>";
          myTable += "<td>" + tasksArray[i].assigneeName + "</td>";
          myTable += "<td>" + tasksArray[i].date + "</td>";
          myTable += "<td>" + tasksArray[i].details + "</td></tr>";
        }
        myTable += "</table>";
        document.getElementById("tablePrint").innerHTML = myTable;
        isHidden = false;
      } else {
        alert("You have not made a meeting with the name that you entered.")
      }
    });
  });
  return false;
}

const hide = function( e ) {
  e.preventDefault();
  document.getElementById("tablePrint").innerHTML = '<table></table>';
  isHidden = true;
}

const deleteTask = function( e ) { // Delete a task with a specified id number
  // prevent default form action from being carried out
  e.preventDefault();

  const userInput = document.querySelector( '#assigneename' ),
        taskInput = document.querySelector( '#taskname' ),
        nameInput = document.querySelector( '#meetingname' ),
        json = { name: userInput.value, meeting: nameInput.value, task: taskInput.value, };

  fetch( '/removeTask', {
    method:'DELETE',
    body: JSON.stringify( json ),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
  .then( function( response ) {
    // Simply redisplay the table on the response after the deletion occurs
    // if it is not hidden
    console.log( response );
    response.json().then((data) => {
      console.log(data);
      document.getElementById("tablePrint").innerHTML = '<table></table>';
      if (!isHidden) {
        viewMeetingTasks(e);
      }
    });
  });
  return false;
}

window.onload = function() { // Link each button to its respective function
  const inButton = document.querySelector( '#inputButton' );
  const viButton = document.querySelector( '#viewButton' );
  const deButton = document.querySelector( '#removeButton' );
  const hiButton = document.querySelector( '#hideButton' );
  hiButton.onclick = hide;
  viButton.onclick = viewMeetingTasks;
  inButton.onclick = submitTask;
  deButton.onclick = deleteTask;
}
