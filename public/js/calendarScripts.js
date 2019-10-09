// Here is where the js will go for allowing users to add, remove, and display meetings by date

let isHidden = true;

const hide = function( e ) {
  e.preventDefault();
  document.getElementById("tablePrint").innerHTML = '<table></table>';
  isHidden = true;
}

// Get all meetings from the database for this date
const view = function( e ) {
  e.preventDefault();

  const dateInput = document.querySelector( '#enteredDate' );
  if (dateInput.value !== "") {
    let meetingsArray;
        const json = { date: dateInput.value, },
        body = JSON.stringify( json );
  
  fetch( '/viewMyMeetings', {
    method:'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: body
  })
  .then( function( response ) {
    
    // Fetch all tasks for this meeting in the database to add to a table
    response.json().then((data) => {
      meetingsArray = data.meetingsArray;
      let numTasks = meetingsArray.length;
    let myTable = '<table class ="pageText"><td>Meeting Name:</td>';
    myTable += "<td>Meeting Date:</td>";
    myTable += "<td>Meeting Creator:</td>";
    myTable += "<td>Meeting Details:</td></tr>";
    for (let i = 0; i < numTasks; i++) { // Make the table with one row per task
      myTable += "<tr><td>" + meetingsArray[i].name + "</td>";
      myTable += "<td>" + meetingsArray[i].date + "</td>";
      myTable += "<td>" + meetingsArray[i].username + "</td>";
      myTable += "<td>" + meetingsArray[i].details + "</td></tr>";
    }
    myTable += "</table>";
    document.getElementById("tablePrint").innerHTML = myTable;
    isHidden = false;
    });
  });
  return false;
  } else {
    alert("Enter a full date to see meetings on that date");
  }
}

const submit = function( e ) { // Submit request for a new meeting
  e.preventDefault()

  const nameInput = document.querySelector( '#meetingName' ),
        detailsInput = document.querySelector( '#meetingDetails' ),
        dateInput = document.querySelector('#enteredDate'),
        json = { name: nameInput.value,  date: dateInput.value, details: detailsInput.value },
        body = JSON.stringify( json );

  fetch( '/submitMeeting', { //This meeting will be made originally with no tasks in it, just details
    method:'POST',
    body: JSON.stringify( json ),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include' 
  })
  .then( function( response ) {
    // Update the task list for the user
    response.json().then((data) => {
      //act now that the new meeting has been created
      if (data.meetingAdded) {
        alert("Meeting created");
      } else {
        alert("You already have a meeting of that name");
      }
      if (!isHidden) {
        view(e);
      }
    });
  });
  return false;
}

const remove = function( e ) { // Delete a task with a specified id number
  // prevent default form action from being carried out
  e.preventDefault();

  const nameInput = document.querySelector( '#meetingName' ),
        dateInput = document.querySelector('#enteredDate'),
        json = { name: nameInput.value,  date: dateInput.value },
        body = JSON.stringify( json );

  fetch( '/removeMeeting', {
    method:'DELETE',
    body: JSON.stringify( json ),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
  .then( function( response ) {
    // Simply redisplay the table on the response after the deletion occurs
    // if it is not currently hidden
    response.json().then((data) => {
      document.getElementById("tablePrint").innerHTML = '<table></table>';
      if (!isHidden) {
        view(e);
      }
    });
  });
  return false;
}

window.onload = function() { // Link each button to its respective function
  const viButton = document.querySelector( '#viewButton' ),
  siButton = document.querySelector( '#submitButton' ),
  hiButton = document.querySelector( '#hideButton' ),
  reButton = document.querySelector( '#removeButton' );
  viButton.onclick = view;
  siButton.onclick = submit;
  hiButton.onclick = hide;
  reButton.onclick = remove;
}
