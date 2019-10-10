import * as mod1 from './module1.js'
import * as mod2 from './module2.js'

mod1.hello()
mod2.hello()

console.log('main.js')

let userType

function goToSignUp() {
  window.location.href = '/signup.html';
}

function goToLogin() {
  window.location.href = '/login.html';
}

function goToLandlordPage() {
    window.location.href = '/landlord/landlord.html';
}
function goToTenantPage() {
    window.location.href = '/tenant/tenant.html';
}

const tenantReg = function(e){
    e.preventDefault()
    userType = "tenant"
    document.getElementById("form").style.display = ""
    document.getElementById("userType").style.display = "none"
}

const landlordReg = function(e){
    e.preventDefault()
    userType = "landlord"
    document.getElementById("form").style.display = ""
    document.getElementById("userType").style.display = "none"
    document.getElementById("KeyInput").style.display = "none"
}

const addUser = function(e) {
    e.preventDefault()
    let firstName = document.getElementById("FirstName").value
    let lastName = document.getElementById("LastName").value
    let username = document.getElementById("Username").value
    let password = document.getElementById("Password").value
    let phoneNum = document.getElementById("PhoneNumber").value
    let email = document.getElementById("Email").value

    if (firstName === "" ||
        lastName === "" ||
        username === "" ||
        password === "" ||
        phoneNum === "" ||
        email === "") {
        alert("Please fill in all sections")
    } else {
        let user = {
            userType: userType,
            first: firstName,
            last: lastName,
            username: username,
            password: password,
            phone: phoneNum,
            email: email
        }

        if(userType === "tenant") {
            let key = document.getElementById("Key").value
            if(key === "") {
                alert("Landlord key invaild")
                return
            }
            else {
                user.key = parseInt(key, 10)
            }
        }

        const data = JSON.stringify(user)
        console.log(user)

        fetch("/signUp", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: data
        }).then(function (response) {
                if (response.status === 200) {
                    goToLogin();
                }
                else{
                    alert("username already exist")
                }
            })
    }
}

const login = function(e){
    e.preventDefault();
    const username=document.getElementById('username').value,
        password= document.getElementById('password').value;
    const user = {
            'username': username,
            'password' : password
        },
        body = JSON.stringify(user);

    console.log(user)

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    }).then(function(response){
        if(response.status===200){
            console.log("200 Sent successfully")
        }else{
            //console.log("error")
            window.alert("Username or password not found")
        }
        return response.json()
    }).then(function(data){

        if(data === "tenant"){
            goToTenantPage()
        }
        else{
            goToLandlordPage()
        }
    })
}

const signUpFromLogin = function(e) {
    e.preventDefault()
    goToSignUp()
}

/* Vandana Code in login.html
<script>

  const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault();

    fetch( '/submit', { //url name = /submit
      method:'POST',
      headers: { 'Content-Type': 'application/json' },

    })
            .then( function( response ) {
              document.getElementById('mainForm').style.display = "";
              document.getElementById('loginForm').style.display ="none"
            });

    return false
  };

  window.onload = function() {
    fetch( '/test', {
      method:'POST',
      credentials: 'include'
    }).then( console.log )
            .catch( err => console.error );
    const button = document.querySelector( '#submitForm' );
    button.onclick = submit;

    const loginBtn = document.querySelector('#loginButton');
    loginBtn.onclick = login

  }

</script>
*/

    export {tenantReg, landlordReg, addUser, login, signUpFromLogin}