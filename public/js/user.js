import {parseJobCode} from './jobs.js'

window.onload = function() {
  const nameSlot = document.getElementById('name');
  const jobSlot = document.getElementById('job');
  const daySlot = document.getElementById('day');
  const statusSlot = document.getElementById('status');
  const pointSlot = document.getElementById('points');
  const rankSlot = document.getElementById('rank');
  const historyTable = null;
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
    user = userData.name
    nameSlot.innerHTML += user
    pointSlot.innerHTML += userData.points
    rankSlot.innerHTML += userData.rank
  });

  this.fetch('/jobList', {
    method: 'GET',
    credentials: 'include'
  })
  .then(res => {
    return res.json();
  })
  .then(jobList => {
    jobList.forEach(function(job) {
      if(job.name === user) {
        console.log("I got called");
        let parsedCode = parseJobCode(job.jobCode);
        console.log('Parsed Code:', parsedCode);
        jobSlot.innerHTML += parsedCode.name;
        daySlot.innerHTML += parsedCode.day;
        let msg = '';
        if(job.status.complete) {msg= 'Signed Off'}
        else {msg = 'Incomplete'};
        if(job.status.late) {msg += '(Late)'};
        statusSlot.innerHTML += msg;
      }
    }
  )});

  // Insert and populate table
};