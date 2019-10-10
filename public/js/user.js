import {parseJobCode, parseStatus} from './jobs.js'

window.onload = function() {
  const nameSlot = document.getElementById('name');
  const jobSlot = document.getElementById('job');
  const daySlot = document.getElementById('day');
  const statusSlot = document.getElementById('status');
  const pointSlot = document.getElementById('points');
  //const rankSlot = document.getElementById('rank');
  const historyTable = document.getElementById('historyTable');
  let user = '';

  // Get user info
  this.fetch('/userData', {
    method: 'GET',
    credentials: 'include'
  })
  .then(res => {
    return res.json();
  })
  // Fill in value on page
  .then(userData => { 
    // Fill in Job/values
    user = userData.name;
    nameSlot.innerHTML += user;
    pointSlot.innerHTML += userData.point;
    //rankSlot.innerHTML += userData.rank;

    // Insert and populate history table
    let html = '';
    userData.jobs.forEach(job => {
      html+="<tr>";
      html+="<td>" + parseJobCode(job.jobCode).name + "</td>";
      html+="<td>" + parseStatus(job) + "</td>";
      html+="<td>" + job.point + "</td>";

      html+="</tr>";
    });
    historyTable.innerHTML += html;
  });

  this.fetch('/jobList', {
    method: 'GET',
    credentials: 'include'
  })
  .then(res => {
    return res.json();
  })
  .then(jobList => {
    let hasJob = false;
    jobList.forEach(function(job) {
      if(job.name === user) {
        hasJob = true;
        let parsedCode = parseJobCode(job.jobCode);
        jobSlot.innerHTML += parsedCode.name;
        daySlot.innerHTML += parsedCode.day;
        statusSlot.innerHTML += parseStatus(job);
      }
    })
    if(!hasJob) {
      jobSlot.innerHTML += 'None';
      daySlot.innerHTML += 'Not This Week';
      statusSlot.innerHTML += 'N/A';
    };
  });
};