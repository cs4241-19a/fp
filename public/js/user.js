window.onload = function() {
  const nameSlot = document.getElementById('name');
  const jobSlot = document.getElementById('job');
  const daySlot = document.getElementById('day');
  const statusSlot = document.getElementById('status');
  const pointSlot = document.getElementById('points');
  const rankSlot = document.getElementById('rank');
  const historyTable = null;

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
    nameSlot.innerHTML += userData.name
    pointSlot.innerHTML += userData.points
    rankSlot.innerHTML += userData.rank
  });

  //this.fetch('/userJob', {
  //  method: 'GET',
  //  credentials: 'include'
  //})
  //.then(res => {
  //  return res.json();
  //})
  //.then(job => {
  //  let jobName = '', day = '';
  //
  //  jobSlot.innerHTML += job.name
  //  daySlot.innerHTML += job.day
  //  statusSlot.innerHTML += userData.rank
  //});

  // Insert and populate table
};