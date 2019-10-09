/**
 * createAvailabilityTable()
 * Input: no input, fetches the selected room name from the form
 * Output: creates the availability table
 */
const createAvailabilityTable = async function () {
  try {
    document.getElementById('prebookingMsg').style.display = "none";
    let selected_room = document.getElementById('selectRoomName').value;
    const body = JSON.stringify({name: selected_room});
    const resp = await fetch('/specificRoomAvailability', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body
    });
    const data = await resp.json();
    const availability = data.data;

    // change table label to requested room name
    document.getElementById('room-table-label').innerText = selected_room;

    if (availability) {
      // get the table
      let htmlDiv = document.getElementById('room-avail-table');

      // build the header row
      htmlDiv.innerHTML = '<tr>\n' +
          '              <thead class="thead-light"></thead>\n' +
          '                <th role="columnheader" scope="col" style="text-align: center"></th>\n' +
          '                <th role="columnheader" scope="col" style="text-align: center">Sunday</th>\n' +
          '                <th role="columnheader" scope="col" style="text-align: center">Monday</th>\n' +
          '                <th role="columnheader" scope="col" style="text-align: center">Tuesday</th>\n' +
          '                <th role="columnheader" scope="col" style="text-align: center">Wednesday</th>\n' +
          '                <th role="columnheader" scope="col" style="text-align: center">Thursday</th>\n' +
          '                <th role="columnheader" scope="col" style="text-align: center">Friday</th>\n' +
          '                <th role="columnheader" scope="col" style="text-align: center">Saturday</th>\n' +
          '              </thead>' +
          '            </tr>' +
          '          <tbody>';

      //TODO: change military time to user friendly time
      for (let i = 9; i < 18; i++) {
        // build each interval row
        htmlDiv.innerHTML += createRow(availability, `${i}:00`, true);
        htmlDiv.innerHTML += createRow(availability, `${i}:30`, false);
      }

      htmlDiv.innerHTML += '</tbody>';

    } else {
      document.getElementById('room-avail').innerText = "Could not find room.";
    }
  } catch (err) {
    console.log('Error occurred when retrieving room.')
  }
};

/**
 * fetchRoomAvailability()
 * Input: roomName (String), name of the desired room
 * Output: an availability JSON for the given room
 */
async function fetchRoomAvailability(roomName) {
  try {
    const body = JSON.stringify({name: roomName});
    const resp = await fetch('/specificRoomAvailability', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body
    });
    const data = await resp.json();
    const roomAvailability = data.data;

    if (roomAvailability) {
      return roomAvailability;
    } else {
      document.getElementById('room-avail').innerText = "Could not find room.";
    }
  } catch (err) {
    console.log('Error occurred when retrieving room.');
  }
}

/**
 * helper for fetchRoomAvailability()
 */
function createRow(availability, time, topHalf) {
  let newRow;
  if (topHalf) {
    newRow = '<tr style="border-bottom: thin dotted #ddd;">\n' +
        `<th class="time" scope="row">${time}</th>`;
  } else {
    newRow = '<tr>\n' +
        `<th class="time" scope="row">${time}</th>`;
  }

  if (availability.sunday.includes(time)) {
    newRow += (`<td class="unavailable">unavailable</td>\n`);
  } else {
    newRow += (`<td></td>\n`);
  }

  if (availability.monday.includes(time)) {
    newRow += (`<td class="unavailable">unavailable</td>\n`);
  } else {
    newRow += (`<td ></td>\n`);
  }

  if (availability.tuesday.includes(time)) {
    newRow += (`<td class="unavailable">unavailable</td>\n`);
  } else {
    newRow += (`<td ></td>\n`);
  }

  if (availability.wednesday.includes(time)) {
    newRow += (`<td class="unavailable">unavailable</td>\n`);
  } else {
    newRow += (`<td ></td>\n`);
  }

  if (availability.thursday.includes(time)) {
    newRow += (`<td class="unavailable">unavailable</td>\n`);
  } else {
    newRow += (`<td ></td>\n`);
  }

  if (availability.friday.includes(time)) {
    newRow += (`<td class="unavailable">unavailable</td>\n`);
  } else {
    newRow += (`<td ></td>\n`);
  }

  if (availability.saturday.includes(time)) {
    newRow += (`<td class="unavailable">unavailable</td>\n`);
  } else {
    newRow += (`<td ></td>\n`);
  }

  newRow += '</tr>';

  return newRow;
}

/**
 * updateRoomAvailability()
 * Input: name of the room to update (String), availability to update (JSON in the following format:
 *    const availability = {
 *      sunday: [],
 *      monday: [],
 *      tuesday: [],
 *      etc...
 *    }
 * Output: none
 */
function updateRoomAvailability(roomName, availability) {
  const newAvailability = {
    name: roomName,
    availability: availability
  };

  const body = JSON.stringify(newAvailability);
  fetch('/updateRoomAvailability', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body
  }).then(function () {
  });

}

/** BOOKING FORM METHODS **/
function populateTimeInput() {
  let start_value = 9;
  let halfHours = ["00", "30"];
  let times = [];
  let i;
  let j;
  let time;

  for (i = start_value; i < 17; i++) {
    for (j = 0; j < 2; j++) {
      time = i + ":" + halfHours[j];
      times.push(time);
    }
  }

  time = i + ":00";
  times.push(time);

  let selectStartTime = document.getElementById("selectStartTime");

  for (let i = 0; i < times.length; i++) {
    let option = document.createElement("OPTION"),
        txt = document.createTextNode(times[i]);
    option.appendChild(txt);
    option.setAttribute("value", times[i]);
    selectStartTime.insertBefore(option, selectStartTime.lastChild);
  }
}

const childDropDown = function (e) {
  e.preventDefault();
  let start_value = document.getElementById("selectStartTime").value;
  document.getElementById("selectChild").options.length = 0;

  let selectedTime = start_value.split(":");
  let minutes = selectedTime[1];
  let i;
  let j;
  let time;
  start_value = selectedTime[0];

  start_value = parseInt(start_value);// + 1;

  let halfHours = ["00", "30"];
  let times = [];
  for (i = start_value; i < 18; i++) {
    for (j = 0; j < 2; j++) {
      time = i + ":" + halfHours[j];
      times.push(time);
    }
  }

  time = i + ":00";
  times.push(time);

  let selectChild = document.getElementById("selectChild");

  let start_loop = 1;
  if (minutes == "30") {
    start_loop = 2;
  }

  for (let i = start_loop; i < times.length; i++) {
    let option = document.createElement("OPTION"),
        txt = document.createTextNode(times[i]);
    option.appendChild(txt);
    option.setAttribute("value", times[i]);
    selectChild.insertBefore(option, selectChild.lastChild);
  }
};

const submitButtonClicked = function (e) {
  e.preventDefault();
  let selected_room = document.getElementById('selectRoomName').value;
  let start_value;
  let selected_day = document.getElementById("selectDay").value;
  let selected_start_time = document.getElementById("selectStartTime").value;
  let selected_end_time = document.getElementById("selectChild").value;
  let selectedStartTime = selected_start_time.split(":");
  let selectedEndTime = selected_end_time.split(":");

  let minutes = selectedStartTime[1];
  start_value = selectedStartTime[0];
  start_value = parseInt(start_value);// + 1;
  let end_hour = selectedEndTime[0];
  let end_minutes = selectedEndTime[1];
  let halfHours = ["00", "30"];
  let times = [];

  let i, j, time;

  for (i = start_value; i < end_hour; i++) {
    for (j = 0; j < 2; j++) {
      time = i + ":" + halfHours[j];
      times.push(time);
    }
  }
  time = i + ":00";
  times.push(time);
  let start_loop = 0;
  if (minutes == "30") {
    start_loop = 1;
  }
  let out_put_times = [];
  for (let i = start_loop; i < times.length; i++) {
    out_put_times.push(times[i])
  }
  if (end_minutes == "30") {
    out_put_times.push(selected_end_time);
  }
  out_put_times.pop();

  const newAvailability = {
    room: selected_room,
    day: selected_day,
    times: out_put_times
  };

  buildAvailability(newAvailability).then(() => console.log(''));

  const emailList = document.querySelectorAll('.emailRecipient');
  let emailAddresses = [];
  emailList.forEach((email) => {
    emailAddresses.push(email.value);
  });
  if (emailAddresses) {
    sendEmail(selected_room, selected_start_time, selected_end_time, selected_day, emailAddresses).then(console.log());
  }
};

async function sendEmail(room, startTime, endTime, day, emailList) {
  try {
    const body = JSON.stringify({
      from: 'meetingnotification.wpi@gmail.com',
      to: emailList.toString(),
      subject: `Meeting created for ${day}`,
      text: `You have been invited to a meeting in ${room} on ${day}. The room is booked from ${startTime} to ${endTime}.`
    });
    console.log(body);
    await fetch('/sendEmail', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body
    });
  } catch {
    console.log('error sending email');
  }
}

async function buildAvailability(availability) {
  try {
    const roomAvail = await fetchRoomAvailability(availability.room);
    if (roomAvail) {
      switch (availability.day) {
        case "Sunday":
          availability.times.forEach((time) => {
            roomAvail.sunday.push(time);
          });
          break;
        case "Monday":
          availability.times.forEach((time) => {
            roomAvail.monday.push(time);
          });
          break;
        case "Tuesday":
          availability.times.forEach((time) => {
            roomAvail.tuesday.push(time);
          });
          break;
        case "Wednesday":
          availability.times.forEach((time) => {
            roomAvail.wednesday.push(time);
          });
          break;
        case "Thursday":
          availability.times.forEach((time) => {
            roomAvail.thursday.push(time);
          });
          break;
        case "Friday":
          availability.times.forEach((time) => {
            roomAvail.friday.push(time);
          });
          break;
        case "Saturday":
          availability.times.forEach((time) => {
            roomAvail.saturday.push(time);
          });
          break;
        default:
          break;
      }
      updateRoomAvailability(availability.room, roomAvail);
      createAvailabilityTable();
    }
  } catch {
    console.log('Error building room availability JSON.');
  }
}


const addEmail = function (e) {
  e.preventDefault();
  let container = $('#emailList');
  let emailField = container.find('.default').clone();
  emailField.removeClass('default');
  emailField.appendTo(container).show();
};

const delEmail = function (element) {
  $(element).closest('.row').remove();
};

window.onload = function () {
  const selectedRoomInput = document.getElementById('selectRoomName');
  selectedRoomInput.onchange = createAvailabilityTable;

  populateTimeInput();
  const submissionButton = document.getElementById('submit_times');
  submissionButton.onclick = submitButtonClicked;

  const startTimeInput = document.getElementById('selectStartTime');
  startTimeInput.onchange = childDropDown;

  const addEmailButton = document.getElementById('add-email');
  addEmailButton.onclick = addEmail;
};

function main() {
}