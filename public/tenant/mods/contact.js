console.log('contact.js')

// Tenant Profile
var tenantName = document.getElementById("profileName")
var userinfoPhone = document.getElementById("userPhone")
var userinfoEmail = document.getElementById('userEmail')


var firstNameForm = document.getElementById("FirstName")
var lastNameForm = document.getElementById("LastName")
var phoneNumberForm = document.getElementById("PhoneNumber")
var emailForm = document.getElementById("Email")

var landlordName = document.getElementById("landlordName")
var landlordPhone = document.getElementById("landlordPhone")
var landlordEmail = document.getElementById("landlordEmail")

var updateProfileBtn = document.getElementsByClassName("updateBtnFun")

const reset = function () {

  fetch('/currentUser', {
    method: 'GET'
  }).then(function (response) {
    return response.json()
  }).then(function (data) {

    const welcomeTxt = document.querySelector('.welcome')
    welcomeTxt.innerText = "Welcome " + data.first + " " + data.last

    var firstName = data.first
    var lastName = data.last
    var phone = data.phone
    var email = data.email

    // used for getting roommates later on b/c you don't grab yourself
    var username = data.username

    tenantName.innerText = firstName + " " + lastName
    userinfoPhone.innerText = phone
    userinfoEmail.innerText = email

    firstNameForm.value = firstName
    lastNameForm.value = lastName
    phoneNumberForm.value = phone
    emailForm.value = email

    firstNameForm.placeholder = firstName
    lastNameForm.placeholder = lastName
    phoneNumberForm.placeholder = phone
    emailForm.placeholder = email

    fetch('/getAdmin', {
      method: 'GET'
    }).then(function (response) {
      return response.json()
    }).then(function (data) {
      
      landlordName.innerText = data.first + " " + data.last
      landlordPhone.innerText = data.phone
      landlordEmail.innerText = data.email

      fetch('/getRoommates', {
        method: 'GET'
      }).then(function (response) {
        return response.json()
      }).then(function (data) {
        
        // clear roommates
        const myNode = document.querySelector(".tenants-group");
        while (myNode.firstChild) {
          myNode.removeChild(myNode.firstChild);
        }

        for(var i=0;i<data.length;i++) {

          // don't list self as roommate
          if (data[i].username === username) {
            continue;
          }
        
          console.log(data[i])

          /* Rooommate HTML
          <div class="tenant">
              <a>FirstName LastName</a><br><br>
              <i class="fa fa-phone"></i>&nbsp;&nbsp;<b>123-456-7890</b><br><br>
              <i class="fa fa-envelope"></i>&nbsp;&nbsp;<c>jonsmith@wpi.edu</c>
            </div>
          */
         
          var roommateBlock = document.createElement( 'div' )
          roommateBlock.className = "tenant"

          var newline = document.createElement( "br" )

          var space = document.createElement( 'p' )
          space.innerText = " "

          var morespace = document.createElement( 'br' )
          
          var nameblock = document.createElement( 'a' )
          nameblock.innerText = data[i].first + " " + data[i].last
          
          var phoneIcon = document.createElement( 'i')
          phoneIcon.className = "fa fa-phone"

          var phoneblock = document.createElement( 'b' )
          phoneblock.innerHTML = '&nbsp;&nbsp;' + data[i].phone

          var emailIcon = document.createElement( 'i' )
          emailIcon.className = "fa fa-envelope"

          var emailblock = document.createElement( 'c' )
          emailblock.innerHTML = '&nbsp;&nbsp;' + data[i].email

          roommateBlock.appendChild(nameblock)
          roommateBlock.appendChild(space)
          roommateBlock.appendChild(newline)
          roommateBlock.appendChild(morespace)
          roommateBlock.appendChild(phoneIcon)
          roommateBlock.appendChild(phoneblock)
          roommateBlock.appendChild(space)
          roommateBlock.appendChild(emailIcon)
          roommateBlock.appendChild(emailblock)

          document.querySelector(".tenants-group").appendChild(roommateBlock)

          // add roommate code one at a time
        }
        
      })
    })
    console.log("reset")
  })
}

const updateProfile = function (e) {
  e.preventDefault()

  fetch('/currentUser', {
    method: 'GET'
  }).then(function (response) {
    return response.json()
  }).then(function (data) {

    const firstNameForm = document.querySelector('#FirstName'),
      lastNameForm = document.querySelector('#LastName'),
      phoneNumberForm = document.querySelector('#PhoneNumber'),
      emailForm = document.querySelector('#Email')

    const json = { firstName: firstNameForm.value, lastName: lastNameForm.value, phone: phoneNumberForm.value, email: emailForm.value, username: data.username },
      body = JSON.stringify(json)

    // order sent to server
    fetch('/updateProfile', {
      method: 'POST',
      body
    })

      .then(function (response) {
        console.log(response)

        // load data into queue table
        reset()
        console.log("updating profile")

        return false;

      })
  })
}

// Export functions and const
export { reset, updateProfile }
