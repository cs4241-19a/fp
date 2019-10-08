// Login function for button
const login = function() {
  let username = document.getElementById('username').value,
      password = document.getElementById('password').value;
      user = {username: username, password: password};

  if(username === '' || password === '') {
    alert('Missing credentials, please enter a username and password');
    return;
  }

  fetch('/login', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {'Content-Type': 'application/json'}
  })
  // TODO redirect to user profile page
}



// Setting up button
window.onload = function() {
  const loginBtn = document.querySelector('.login');
  loginBtn.onclick = login;
};