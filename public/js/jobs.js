var parseJobCode = function(jobCode) {
  let name = '', day = '';

  day = jobCode.substring(0, 4);
  if(day === 'tues') {day = 'Tuesday'}
  else {if(day === 'thur') {day = 'Thursday'}};

  switch(jobCode.substring(4)) {
    case 'knob':
      name = 'Knobs + Rags';
      break;
    case '3br':
      name = '3rd Floor Bathroom';
      break;
    case '2brVan':
      name = '2nd Floor Bathroom, Toilet and Vanity';
      break;
    case '2brFloor':
      name = '2nd Floor Bathroom, Showers and Floors';
      break;
    case '1br':
      name = '1st Floor Bathroom';
      break;
    case 'foyer':
      name = 'Foyer + Library Floor';
      break;
    case 'lib':
      name = 'Library';
      break;
    case 'stair':
      name = 'Stairs'
      break;
    case 'tv':
      name = 'TV Room';
      break;
    case 'hall':
      name = '2nd + 3rd Floor Halls'
      break;
    case 'base':
      name = 'Basement';
      break;
    case 'laund':
      name = 'Laundry Room';
      break;
  }

  return {name: name, day: day};
}

var parseStatus = function(job) {
  let msg = '';
  if(job.status.complete) {msg= 'Signed Off'}
  else {msg = 'Incomplete'};
  if(job.status.late) {msg += '(Late)'};
  return msg;
}

export {parseJobCode, parseStatus};