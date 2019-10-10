// client-side js
// run by the browser each time your view template is loaded

// define variables that reference elements on our page
const loginForm = document.forms[0]
const loginUsernameInput = loginForm.elements["username"]
const loginPasswordInput = loginForm.elements["password"]

// listen for the form to be submitted and add a new dream when it is
loginForm.onsubmit = function(event)
{
  // stop our form submission from refreshing the page
  event.preventDefault();
  
  fetch("/login",
  {
    "method": "POST",
    "body": JSON.stringify(
    {
      "username": loginUsernameInput.value,
      "password": loginPasswordInput.value,
    }),
    headers: {"Content-Type": "application/json"}
  })
  .then(res =>
  {
    if (res.status === 200)
    {
      window.location.href = "/tasks"
    }
    else
    {
      alert("Authentication failed, bad username or password")
      //loginUsernameInput.value = ""
      loginPasswordInput.value = ""
    }
  })
}


// define variables that reference elements on our page
const signupForm = document.forms[1]
const signupUsernameInput = signupForm.elements["username"]
const signupPasswordInput = signupForm.elements["password"]

// listen for the form to be submitted and add a new dream when it is
signupForm.onsubmit = function(event)
{
  // stop our form submission from refreshing the page
  event.preventDefault();
  
  fetch("/signup",
  {
    "method": "POST",
    "body": JSON.stringify(
    {
      "username": signupUsernameInput.value,
      "password": signupPasswordInput.value,
    }),
    headers: {"Content-Type": "application/json"}
  })
  .then(res => res.json())
  .then(json =>
  {
    alert("Account successfully created! Please log in.")
    signupUsernameInput.value = ""
    signupPasswordInput.value = ""
  })
  .catch(err =>
  {
    alert("Account creation failed, choose a different username!")
    signupUsernameInput.value = ""
    signupPasswordInput.value = ""
  })
}
