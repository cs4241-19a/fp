// Some Javascript code here, to run on the front end on the login page

window.onload = function() { // Link each button to its respective function
  const newButton = document.querySelector( '#signupButton' );
  newButton.onclick = signUpFunc;
  const logButton = document.querySelector( '#loginButton' );
  logButton.onclick = loginFunc;
}

const signUpFunc = function( e ) {
  e.preventDefault();
  // Handles a new user signing up

  const nameInput = document.querySelector( '#newname' ),
        passInput = document.querySelector( '#newpass' ),
        json = { username: nameInput.value,  password: passInput.value},
        body = JSON.stringify( json );
        console.log(body);

  fetch( '/signUp', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    // Inform the user of what the letter grade of the student is, and
    // refresh the table view with the new student in it
    response.json().then((data) => {
      console.log(data);
      if (data.userAdded === true) {
        alert("New user added: " + nameInput.value);
      } else {
        alert("That username has already been taken!");
      }
    })
  return false;
  })
}

const loginFunc = function( e ) { // Handles logins
  e.preventDefault();
  const nameInput = document.querySelector( '#loginName' ),
        passInput = document.querySelector( '#pass' ),
        json = { username: nameInput.value,  password: passInput.value},
        body = JSON.stringify( json );
        console.log(body);

  fetch( '/login', {
    method:'POST',
    body: body,
    headers: { 'Content-Type': 'application/json' }
  })
  .then( function( response ) {
    // Inform the user of what the letter grade of the student is, and
    // refresh the table view with the new student in it
    console.log( response.status );
    if (response.status === 200 || response.status === 304) {
      loginRedir();
    } else {
      alert("Login failed!");
    }
  return false;
  })
}
        
const loginRedir = function( e ) {
  window.location.replace('https://fp-start.glitch.me/mainview.html');
}
