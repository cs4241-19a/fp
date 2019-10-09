// Here is where the js will go for allowing users to add, remove, and display meetings by date

let isHidden = true;
let isHiddenTasks = true;

const drawCal = function (date) {
  let dateInput = document.querySelector( '#enteredDate' );
  if (date) {
    dateInput.value = date;
  }
  const calendarHeader = document.querySelector( '#calendarHeader' );
  const month = dateInput.value.substring(5, 7);
  const yearStr = dateInput.value.substring(0, 4);
  let monthStr;
  let dayLimit;
  if (month === "01") {
    monthStr = "January";
    dayLimit = 31;
  } else if (month === "02") {
    monthStr = "February";
    dayLimit = 28;
    // Take leap years into account
    if (Number(yearStr) % 4 === 0 && (Number(yearStr) % 100 !== 0 || Number(yearStr) % 400 === 0)) {
      dayLimit++;
    }
  } else if (month === "03") {
    monthStr = "March";
    dayLimit = 31;
  } else if (month === "04") {
    monthStr = "April";
    dayLimit = 30;
  } else if (month === "05") {
    monthStr = "May";
    dayLimit = 31;
  } else if (month === "06") {
    monthStr = "June";
    dayLimit = 30;
  } else if (month === "07") {
    monthStr = "July";
    dayLimit = 31;
  } else if (month === "08") {
    monthStr = "August";
    dayLimit = 31;
  } else if (month === "09") {
    monthStr = "September";
    dayLimit = 30;
  } else if (month === "10") {
    monthStr = "October";
    dayLimit = 31;
  } else if (month === "11") {
    monthStr = "November";
    dayLimit = 30;
  } else if (month === "12") {
    monthStr = "December";
    dayLimit = 31;
  }
  calendarHeader.innerHTML = "Calendar: " + monthStr + " " + yearStr;
  const canvas = document.getElementById('myCanvas');
  // Get our 2D drawing context
  const ctx = canvas.getContext('2d');
  const draw = function () {
    ctx.fillStyle = '#212529';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    // Draw the lines on the calendar
    for (let i = 100; i < 700; i+=100) {
      ctx.fillRect(i, 0, 1, canvas.height);
      ctx.fillRect(0, i, canvas.width, 1);
    }
    ctx.font = "30px Times New Roman";
    // Fill the top row with day names
    ctx.fillText("Sun", 25, 75);
    ctx.fillText("Mon", 125, 75);
    ctx.fillText("Tue", 225, 75);
    ctx.fillText("Wed", 325, 75);
    ctx.fillText("Thu", 425, 75);
    ctx.fillText("Fri", 525, 75);
    ctx.fillText("Sat", 625, 75);
    
    // Now start filling in the days of the month
    let date = new Date(dateInput.value + "T00:00:00");
    // Get the weekday of the first day of the month
    let firstDay = date.getDate();
    let weekday = date.getDay();
    while (firstDay % 7 != 1) {
      firstDay--;
      weekday--;
      if (weekday === -1) {
        weekday = 6;
      }
    }
    // weekday now corresponds to the day in the week for the first day of the month
    let currentHeight = 175;
    let currentX = 25 + (100 * weekday); // Set the x position based on the starting weekday
    for (let i = 1; i < dayLimit+1; i++) {
      if (i === date.getDate()) {
        ctx.fillStyle = '#ff4000';
        ctx.fillText(i, currentX, currentHeight);
        ctx.fillStyle = '#ffffff';
      } else {    
        ctx.fillText(i, currentX, currentHeight);
      }
      currentX += 100;
      if (currentX > 625) {
        currentX = 25;
        currentHeight += 100;
      }
    }
  }
  draw();
}

// Hide the table of tasks
const hide = function( e ) {
  e.preventDefault();
  document.getElementById("tablePrintM").innerHTML = '<table></table>';
  isHiddenTasks = true;
}

// Get all meetings from the database for this date and this user
const view = function(e) {
  e.preventDefault();

  const dateInput = document.querySelector( '#enteredDate' );
  if (dateInput.value !== "") {
    let meetingsArray;
        const json = { date: dateInput.value, },
        body = JSON.stringify( json );
  
  fetch( '/viewMeetings', {
    method:'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: body
  })
  .then( function( response ) {
    
    // Fetch all tasks for this meeting in the database to add to a table
    console.log( response );
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
    drawCal();
    });
  });
  return false;
  } else {
    alert("Enter a full date to see meetings on that date that you have made");
  }
}

const viewTasks = function(e) {
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
      console.log( data );
      if (data.tasksArray) {
        tasksArray = data.tasksArray;
        let numTasks = tasksArray.length;
        let myTable = '<table class ="pageText"><tr><td>' + nameInput.value + '</tr><td><tr><td>Task Name:</td>';
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
        document.getElementById("tablePrintM").innerHTML = myTable;
        isHidden = false;
      } else {
        alert("You have not made a meeting with the name that you entered.")
      }
    });
  });
  return false;
}

window.onload = function() { // Link each button to its respective function
  const viButton = document.querySelector( '#viewButton' ),
  viTaButton = document.querySelector(' #viewButtonM '),
  hiButton = document.querySelector( '#hideButtonM' );
  viButton.onclick = view;
  hiButton.onclick = hide;
  viTaButton.onclick = viewTasks;
  let today = new Date();
  let day = String(today.getDate()).padStart(2, '0');
  let month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let year = today.getFullYear();
  today = year + '-' + month + '-' + day;
  drawCal(today);
}
