/*
 * fetchRoomAvailability()
 * Input: the name of a room (String)
 * Output: the availability of the given room (JSON)
*/
async function fetchRoomAvailability(roomName) {
  try {
    const body = JSON.stringify({name: roomName});
    const resp = await fetch('/specificRoomAvailability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    });
    const data = await resp.json();
    const availability = data.data;

    // change table label to requested room name
    document.getElementById('room-table-label').innerText = roomName;

    if (availability){
      // document.getElementById('room-avail').innerText = JSON.stringify(availability);

      /* INSERT TABLE BUILDING HERE */
      // get the table
      let htmlDiv = document.getElementById('room-avail-table');

      // build the header row
      htmlDiv.innerHTML = '<tr>\n' +
        '              <th role="columnheader" scope="col"></th>\n' +
        '              <th role="columnheader" scope="col">Sunday</th>\n' +
        '              <th role="columnheader" scope="col">Monday</th>\n' +
        '              <th role="columnheader" scope="col">Tuesday</th>\n' +
        '              <th role="columnheader" scope="col">Wednesday</th>\n' +
        '              <th role="columnheader" scope="col">Thursday</th>\n' +
        '              <th role="columnheader" scope="col">Friday</th>\n' +
        '              <th role="columnheader" scope="col">Saturday</th>\n' +
        '            </tr>' +
        '            <tbody>';

      //TODO: change military time to user friendly time
      for (let i = 9; i < 18; i++) {
        // build each interval row
        htmlDiv.innerHTML += createRow(availability[0], `${i}:00`);
        // htmlDiv.innerHTML += createRow(availability[0], `${i}:15`);
        htmlDiv.innerHTML += createRow(availability[0], `${i}:30`);
        // htmlDiv.innerHTML += createRow(availability[0], `${i}:45`);
      }

      htmlDiv.innerHTML += '</tbody>';

    } else {
      document.getElementById('room-avail').innerText = "Could not find room.";
    }
  } catch (err) {
    console.log('Error occurred when retrieving room.')
  }
};

function createRow (availability, time) {
  let newRow = '<tr>\n';

  newRow += (`<td> ${time} </td>`);

  if (availability.sunday.includes(time)) {
    console.log('unavailable');
    newRow += (`<td style="background-color: red;">unavailable</td>\n`);
  } else {
    console.log('available');
    newRow += (`<td style="background-color: green;">available</td>\n`);
  }

  if (availability.monday.includes(time)) {
    console.log('unavailable');
    newRow += (`<td style="background-color: red;">unavailable</td>\n`);
  } else {
    console.log('available');
    newRow += (`<td style="background-color: green;">available</td>\n`);
  }

  if (availability.tuesday.includes(time)) {
    console.log('unavailable');
    newRow += (`<td style="background-color: red;">unavailable</td>\n`);
  } else {
    console.log('available');
    newRow += (`<td style="background-color: green;">available</td>\n`);
  }

  if (availability.wednesday.includes(time)) {
    console.log('unavailable');
    newRow += (`<td style="background-color: red;">unavailable</td>\n`);
  } else {
    console.log('available');
    newRow += (`<td style="background-color: green;">available</td>\n`);
  }

  if (availability.thursday.includes(time)) {
    console.log('unavailable');
    newRow += (`<td style="background-color: red;">unavailable</td>\n`);
  } else {
    console.log('available');
    newRow += (`<td style="background-color: green;">available</td>\n`);
  }

  if (availability.friday.includes(time)) {
    console.log('unavailable');
    newRow += (`<td style="background-color: red;">unavailable</td>\n`);
  } else {
    console.log('available');
    newRow += (`<td style="background-color: green;">available</td>\n`);
  }

  if (availability.saturday.includes(time)) {
    console.log('unavailable');
    newRow += (`<td style="background-color: red;">unavailable</td>\n`);
  } else {
    console.log('available');
    newRow += (`<td style="background-color: green;">available</td>\n`);
  }

  newRow += '</tr>';

  return newRow;
}

/*
 * fetchUserAvailability()
 * Input: the email address of a user (String)
 * Output: the availability of the given user (JSON)
*/
async function fetchUserAvailability(user) {
  try {
    const body = JSON.stringify({email: user});
    const resp = await fetch('/specificUserAvailability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    });
    const data = await resp.json();
    const availability = data.data;
    if (availability){
      document.getElementById('user-avail').innerText = JSON.stringify(availability);
    } else {
      document.getElementById('user-avail').innerText = "Could not find user";
    }

  } catch (err) {
    console.log('Error occurred when retrieving user.');
  }
};

/*
 * fetchUserList()
 * Input: none
 * Output: the information of all users (array of JSONs)
*/
async function fetchUserList() {
  try{
    const resp = await fetch('/alluserInfo', {
      method: 'GET'
    });
    const data = await resp.json();
    const users = data.data;
    document.getElementById('user-list').innerText = JSON.stringify(users);
  } catch (err) {
    console.log('Error occurred when retrieving user list.');
  }
}

/*
 * fetchRoomList()
 * Input: none
 * Output: the availability of all rooms (array of JSONs)
*/
async function fetchRoomList() {
  try{
    const resp = await fetch('/allRoomInfo', {
      method: 'GET'
    });
    const data = await resp.json();
    const rooms = data.data;
    document.getElementById('room-list').innerText = JSON.stringify(rooms);
  } catch (err) {
    console.log('Error occurred when retrieving room list.');
  }
}

/*
 * fetchCurrentUserInfo()
 * Input: none
 * Output: the information of the user that is currently logged in (JSON)
*/
async function fetchCurrentUserInfo() {
  try{
    const resp = await fetch('/currentUserInfo', {
      method: 'GET'
    });
    const data = await resp.json();
    const user = data.data;
    document.getElementById('current-user-info').innerText = JSON.stringify(user);
  } catch (err) {
    document.getElementById('current-user-info').innerText = 'User not logged in';
    console.log('Error occurred when retrieving current user information. Please make sure you are logged in');
  }
}

/*
 * updateArchive()
 * Input: name of the new archive (String), availability to archive (JSON in the following format:
 *    const availability = {
 *      sunday: [],
 *      monday: [],
 *      tuesday: [],
 *      etc...
 *    }
 * Output: none
*/
function updateArchive(archiveName, availability) {
  // e.preventDefault();

  const newArchive = {
    name: archiveName,
    availability: availability
  };

  const body = JSON.stringify(newArchive);
  fetch('/updateUserArchive', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  }).then(function () {
    fetchCurrentUserInfo();
  });
};

/*
 * updateUserAvailability()
 * Input: availability to update (JSON in the following format:
 *    const availability = {
 *      sunday: [],
 *      monday: [],
 *      tuesday: [],
 *      etc...
 *    }
 * Output: none
*/
function updateUserAvailability(availability) {
  // e.preventDefault();
  const newAvailability = {
    availability: availability
  };

  const body = JSON.stringify(newAvailability);
  fetch('/updateUserAvailability', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  }).then(function () {
    fetchCurrentUserInfo();
  });
}

/*
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
  // e.preventDefault();
  const newAvailability = {
    name: roomName,
    availability: availability
  };

  const body = JSON.stringify(newAvailability);
  fetch('/updateRoomAvailability', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  }).then(function () {
    fetchRoomList();
  });

}

function main() {
  const newAvailability = {
    sunday: ["9:00", "9:15", "9:30", "9:45"],
    monday: [],
    tuesday: [],
    wednesday: ["8:00"],
    thursday: [],
    friday: ["3:00"],
    saturday: []
  };

  const defaultAvailability = {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: ["8:00"],
    thursday: [],
    friday: ["3:00"],
    saturday: []
  };

  fetchRoomAvailability('Room 1');
  // fetchUserAvailability('ciduarte@wpi.edu');
  // fetchUserList();
  // fetchRoomList();
  // fetchCurrentUserInfo();

  // document.getElementById('update-room-avail').addEventListener('click', function (evt) {
  //   updateRoomAvailability('Room 2', newAvailability);
  // });
  //
  // document.getElementById('update-user-avail').addEventListener('click', function (evt) {
  //   updateUserAvailability(newAvailability);
  // });
  //
  // document.getElementById('update-user-archive').addEventListener('click', function (evt) {
  //   updateArchive("Default", defaultAvailability);
  // });
}