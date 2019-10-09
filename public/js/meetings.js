async function fetchUserMeetings() {
  try {
    const resp = await fetch('/currentUserMeetings', {
      method: 'GET'
    });
    const data = await resp.json();
    const userMeetings = data.data;

    if (userMeetings) {
      return userMeetings;
    } else {
      console.log('No user meetings');
      document.getElementById('login-redirect').style.display = "flex";
      document.getElementById('meeting-table').style.display = "none";
    }
  } catch (err) {
    document.getElementById('login-redirect').style.display = "flex";
    document.getElementById('meeting-table').style.display = "none";
    console.log('Error occurred when retrieving user meetings.');
  }
}

async function removeMeetingFromDB(meeting) {
  const body = JSON.stringify(meeting);
  await fetch('/deleteMeeting', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  }).then(() => {
    fetchUserMeetings().then(
      function (meetings) {
        buildMeetingTable(meetings);
      }
    );
  });
};

const cancelMeeting = function (element) {
  let meeting = decodeURIComponent(element.dataset.string);
  meeting = JSON.parse(meeting);
  removeMeetingFromDB(meeting).then(() => {$(element).closest('.row').remove();});
};

function createMeetingRow(day, meetings) {
  let newRow = '<tr>\n' +
    `<td style="text-align:center;vertical-align:middle;">${day}</td>`;
  newRow += '<td>';
  // blue: #a0ccd4
  // pink: #d6a1b9
  // green: #74cfae

  if (meetings.length == 0) {
    newRow += '<span class="noMeeting meetingSpan">No meetings scheduled.</span>';
  } else {
    meetings.forEach((meeting) => {
      const newMeeting = {
        day: day,
        meeting: meeting
      };
      const stringMeeting = JSON.stringify(newMeeting);
      const meetingRow = '<div class="row" style="width: 100%; margin: 0px;">'+
        `  <div class="column col-10 col-xl-11 col-lg-11 col-md-11 meetingSpan ${meeting.name.split(" ", 1)}">`+
        `${meeting.name}, ${meeting.time[0]} to ${meeting.time[1]}`+
        '  </div>'+
        '  <div class="column col-2 col-xl-1 col-lg-1 col-md-1" style="padding:0px; align-self: center; width: 100%; text-align: center;">'+
        `<button class="del-meeting" onclick="cancelMeeting(this)" data-string=` +
          encodeURIComponent(stringMeeting) +
        `><span class="glyphicon glyphicon-remove"></span></button>` +
        '  </div>'+
        '</div>';
      newRow += meetingRow;
    })
  }

  newRow += '</td>';
  newRow += '</tr>';

  return newRow;
}

function buildMeetingTable(meetings) {
  // get the table
  let htmlDiv = document.getElementById('meeting-table');

  // build the header row
  htmlDiv.innerHTML = '<thead style="text-align:center;">\n' +
    '              <tr>\n' +
    '                <th role="columnheader" scope="col" style="text-align: center">Day</th>\n' +
    '                <th role="columnheader" scope="col" style="text-align: center">Room & Time</th>\n' +
    '              </tr>\n' +
    '            </thead>' +
    '          <tbody>';

  htmlDiv.innerHTML += createMeetingRow('Sunday', meetings.sunday);
  htmlDiv.innerHTML += createMeetingRow('Monday', meetings.monday);
  htmlDiv.innerHTML += createMeetingRow('Tuesday', meetings.tuesday);
  htmlDiv.innerHTML += createMeetingRow('Wednesday', meetings.wednesday);
  htmlDiv.innerHTML += createMeetingRow('Thursday', meetings.thursday);
  htmlDiv.innerHTML += createMeetingRow('Friday', meetings.friday);
  htmlDiv.innerHTML += createMeetingRow('Saturday', meetings.saturday);

  htmlDiv.innerHTML += '          </tbody>';
}

const logout = function() {
  fetch( '/logout', {
    method:'GET'
  }).then(function () {
  });

  return false;
};

function main() {
    fetchUserMeetings().then(
      function (meetings) {
        buildMeetingTable(meetings);
      }
    );

  const logoutButton = document.getElementById('logout-link');
  logoutButton.addEventListener('click', logout);
}