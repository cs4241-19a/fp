console.log('manage.js')

// Screen Assets
var landlordProfileScreen = document.getElementById("landlordProfile");
var addApartmentScreen = document.getElementById("addApartment")
var apartmentInfoScreen = document.getElementById("apartmentInfo")

// Landlord Profile
var landlordName = document.getElementById("profileName")
var userinfoPhone = document.getElementById("userPhone")
var userinfoEmail = document.getElementById('userEmail')


var firstNameForm = document.getElementById("FirstName")
var lastNameForm = document.getElementById("LastName")
var phoneNumberForm = document.getElementById("PhoneNumber")
var emailForm = document.getElementById("Email")

var updateProfileBtn = document.getElementsByClassName("updateBtnFun")

// Add Apartment
var apartmentAddressForm = document.getElementById("Address")
var addApartmentBtn = document.getElementsByClassName("addApartmentBtnFun")

// Apartment Info
var apartmentName = document.getElementById("apartmentName")
var landlordkey = document.getElementById("landlordkey")

// reset fields and refresh page
const reset = function () {

  // reset 
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

    landlordName.innerText = firstName + " " + lastName
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

    apartmentAddressForm.value = ""
    apartmentAddressForm.placeholder = "100 Institute Road"

    // load apartments
    fetch('/getApartments', {
      method: 'GET'
    }).then(function (response) {
      return response.json()
    }).then(function (data) {

      // clear apartments
      const myNode = document.querySelector(".apartment-group");
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }

      console.log(data)
      for (let apartment of data) {

        var apartmentBtn = document.createElement('button')
        apartmentBtn.innerText = apartment.address

        apartmentBtn.onclick = function () {

          landlordProfileScreen.style.display = "none"
          addApartmentScreen.style.display = "none"
          apartmentInfoScreen.style.display = "block"

          // clear tenants
          const myTenant = document.querySelector(".tenants-group");
          while (myTenant.firstChild) {
            myTenant.removeChild(myTenant.firstChild);
          }

          apartmentName.innerText = apartment.address
          landlordkey.innerText = "Key: " + apartment.key

          let key = apartment.key

          fetch('/getUsers', {
            method: 'GET'
          }).then(function (response) {
            return response.json()
          }).then(function (data) {

            for (let user of data) {
              if (key === user.key) {
                var roommateBlock = document.createElement('div')
                roommateBlock.className = "tenant"

                var newline = document.createElement("br")

                var space = document.createElement('p')
                space.innerText = " "

                var morespace = document.createElement('br')

                var nameblock = document.createElement('a')
                nameblock.innerText = user.first + " " + user.last

                var phoneIcon = document.createElement('i')
                phoneIcon.className = "fa fa-phone"

                var phoneblock = document.createElement('b')
                phoneblock.innerHTML = '&nbsp;&nbsp;' + user.phone

                var emailIcon = document.createElement('i')
                emailIcon.className = "fa fa-envelope"

                var emailblock = document.createElement('c')
                emailblock.innerHTML = '&nbsp;&nbsp;' + user.email

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
              }
            }

            /*
              <div class="tenant">
                <a>FirstName LastName</a><br><br>
                <i class="fa fa-phone"></i>&nbsp;&nbsp;<b>123-456-7890</b><br><br>
                <i class="fa fa-envelope"></i>&nbsp;&nbsp;<c>jonsmith@wpi.edu</c>
              </div>
            */

            console.log("loading Apartment")
          })

        }

        document.querySelector(".apartment-group").appendChild(apartmentBtn)

      }
      /*
          <button id="testbtn">Apartment 1</button>
                  <button>Apartment 2</button>
                  <button>Apartment 3</button>
                  <button>Apartment 4</button>
                  <button>Apartment 5</button>
                  <button>Apartment 6</button>
                  <button>Apartment 2</button>
                  <button>Apartment 3</button>
                  <button>Apartment 4</button>
                  <button>Apartment 5</button>
                  <button>Apartment 6</button>
                  */

      console.log("loading apartments")
    })

  })

}

// Load Right Screens 
const loadProfile = function (e) {
  e.preventDefault()

  // main button screens
  landlordProfileScreen.style.display = "block"
  addApartmentScreen.style.display = "none"
  apartmentInfoScreen.style.display = "none"

  console.log("loading Profile")
}

const loadAddApartment = function (e) {
  e.preventDefault()

  landlordProfileScreen.style.display = "none"
  addApartmentScreen.style.display = "block"
  apartmentInfoScreen.style.display = "none"

  console.log("loading Add Apartment")
}

// Add Apartment Screen
const addApartment = function (e) {
  e.preventDefault()

  var username;

  fetch('/currentUser', {
    method: 'GET'
  }).then(function (response) {
    return response.json()
  }).then(function (data) {
    username = data.username;

    const address = document.querySelector('#Address'),
      landlord = username;

    const json = { address: address.value, landlord: landlord },
      body = JSON.stringify(json)

    // order sent to server
    fetch('/addApartment', {
      method: 'POST',
      body
    })

      .then(function (response) {
        console.log(response)

        reset()
        console.log("adding apartment")
        return false
      })
  })


}

// Landlord Profile Screen
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
export { reset, loadProfile, loadAddApartment, addApartment, updateProfile }
