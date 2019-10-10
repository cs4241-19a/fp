const registerAccount = function(e) {
  e.preventDefault()
  // Get filled in fields
  // The contents of the HTML element: <tag id="someID"></tag>
  // Can be checked with the function: document.querySelector("#someID").value
  let username = document.querySelector("#username").value
  let email = document.querySelector("#email").value
  let password = document.querySelector("#password").value
  let confirmPassword = document.querySelector("#confirmPassword").value
  let state = document.querySelector("#success")

  // Check if all fields are filled
  if (username == "" ||  email == "" || password == "") {
    window.alert("Please fill all fields.")
  }
  // Check if password was repeated correctly
  else if (password != confirmPassword) {
    window.alert("Passwords don't match.")
  }
  // Send registration request
  else {
    const json = { username: username,
                  email:email,
                  password: password
                 };
    const body = JSON.stringify(json);
    console.log(body)
    fetch("/createUser", {
      method: "POST",
      body: body,
      headers: { "Content-Type": "application/json" }
    }).then( response => {
      console.log(response.status)
      response.text()
      .then( message => {
        if (response.status == 201) {
        // Success
        fetch("/login", {
          method: "GET"
        }).then(function(){
          //state.innerHTML = "Success!"
          
          location.href = "https://cs4241final.glitch.me"
        })
      } else if(response.status == 403) {
        alert("Error")
      }
      })
    })
  }
}

