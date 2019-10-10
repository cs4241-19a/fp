import * as contact from './mods/contact.js'
import * as calendar from './mods/calendar.js'
import * as payment from './mods/payment.js'

// Nav Buttons
var contactBtn = document.getElementById("contact")
var calendarBtn = document.getElementById("calendar")
var paymentBtn = document.getElementById("payment")

// Content Screens
var contactScreen = document.getElementById("contactScreen")
var calendarScreen = document.getElementById("calendarScreen")
var paymentScreen = document.getElementById("paymentScreen")

let element = document.getElementById("my-calendar");
let day = document.getElementById("date")
let calpayment = document.getElementById("CalPayment")
let event = document.getElementById("Event")
let service = document.getElementById("Service")
calendar.calendar(element, calpayment, event, service, day)

let payBtns = document.getElementById("payButtons")
let paydetails = document.getElementById("payInfo")
payment.getPayments(payBtns, paydetails)

window.onload = function () {
    const contactBtn = document.querySelector('#contact')
    contactBtn.onclick = switchToContact
    const calendarBtn = document.querySelector('#calendar')
    calendarBtn.onclick = switchToCalendar
    const paymentBtn = document.querySelector('#payment')
    paymentBtn.onclick = switchToPayment

    fetch('/currentUser', {
        method: 'GET'
    }).then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log("data", data)
        console.log(data.first)
        console.log(data.last)
        const welcomeTxt = document.querySelector('.welcome')
        welcomeTxt.innerText = "Welcome " + data.first + " " + data.last
    })
    // Contact Screen
    contact.reset()
    const updateProfileBtn = document.querySelector(".updateBtnFun")
    updateProfileBtn.onclick = contact.updateProfile
}

const switchToContact = function(e) {
    e.preventDefault()
    
    contactScreen.style.display = 'block'
    calendarScreen.style.display = 'none'
    paymentScreen.style.display = 'none'

    console.log("Contact")
}

const switchToCalendar = function(e) {
    e.preventDefault()
    
    contactScreen.style.display = 'none'
    calendarScreen.style.display = 'block'
    paymentScreen.style.display = 'none'

    console.log("Calendar")
}

const switchToPayment = function(e) {
    e.preventDefault()
    
    contactScreen.style.display = 'none'
    calendarScreen.style.display = 'none'
    paymentScreen.style.display = 'block'

    console.log("Payment")
}


