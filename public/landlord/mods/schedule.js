import {scheduleScreen, calendarScreen, managementScreen, populate} from '../landlordscript.js'

console.log('schedule.js')

function hello () {
    console.log('hi from schedule.js')
}


const addPayment = function(e){
    e.preventDefault()
    let amount = document.getElementById("amount").value
    let due = document.getElementById("due").value
    let desc = document.getElementById("paydescription").value
    let apt = parseInt(document.getElementById("paymentapartment").value, 10)
    let paymentid = desc + apt

    let payment = {
        amount: amount,
        due: due,
        desc: desc,
        apt: apt,
        paymentid: paymentid
    }

    document.getElementById("amount").value = ""
    document.getElementById("due").value = ""
    document.getElementById("paydescription").value = ""
    document.getElementById("paymentapartment").value = ""

    const data = JSON.stringify(payment)

    fetch("/addPayment", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: data
    })
        .then(function(response){
            if(response.status === 200) {
                console.log(payment)
               // switchToCalendar();
                managementScreen.style.display = 'none'
                calendarScreen.style.display = 'block'
                scheduleScreen.style.display = 'none'
            }
            else {
                alert("Payment already scheduled!")
            }
        })
}

const addService = function(e){
    e.preventDefault()
    let servicetitle = document.getElementById("servicetitle").value
    let date = document.getElementById("date").value
    let desc = document.getElementById("servicedescription").value
    let apt = parseInt(document.getElementById("serviceapartment").value, 10)
    let serviceid = servicetitle + apt

    let service = {
        service: servicetitle,
        date: date,
        desc: desc,
        apt: apt,
        serviceid: serviceid
    }
    console.log(service)

    document.getElementById("servicetitle").value = ""
    document.getElementById("date").value = ""
    document.getElementById("servicedescription").value = ""
    document.getElementById("serviceapartment").value = ""

    const data = JSON.stringify(service)

    fetch("/addService", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: data
    })
        .then(function(response){
            if(response.status === 200) {
                console.log(service)
                managementScreen.style.display = 'none'
                calendarScreen.style.display = 'block'
                scheduleScreen.style.display = 'none'
            }
            else {
                alert("Service already scheduled!")
            }
        })
}

const addEvent = function(e){
    e.preventDefault()
    let eventname = document.getElementById("eventname").value
    let day = document.getElementById("day").value
    let desc = document.getElementById("eventdescription").value
    let apt = parseInt(document.getElementById("eventapartment").value, 10)
    let eventid = eventname + apt

    let event = {
        eventname: eventname,
        day: day,
        desc: desc,
        apt: apt,
        eventid: eventid
    }

    document.getElementById("eventname").value = ""
    document.getElementById("day").value = ""
    document.getElementById("eventdescription").value = ""
    document.getElementById("eventapartment").value = ""

    const data = JSON.stringify(event)

    fetch("/addEvent", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: data
    })
        .then(function(response){
            if(response.status === 200) {
                console.log(event)
                managementScreen.style.display = 'none'
                calendarScreen.style.display = 'block'
                scheduleScreen.style.display = 'none'
            }
            else {
                alert("Event already scheduled!")
            }
        })
}

$(document).ready(function(){
    $("#paymentDetails").css("display", "none");
    $("#paymentForm").css("display", "none");
    $("#serviceDetails").css("display", "none");
    $("#eventDetails").css("display", "none");
});

$("#PaymentBtn").click(function() {
    $("#serviceDetails").css("display", "none");
    $("#eventDetails").css("display", "none");
    $("#paymentDetails").css("display", "");
    $("#paymentForm").css("display", "");
    populate('paymentapartment');
});

$("#ServiceBtn").click(function() {
    $("#paymentDetails").css("display", "none");
    $("#paymentForm").css("display", "none");
    $("#eventDetails").css("display", "none");
    $("#serviceDetails").css("display", "");
    populate('serviceapartment');
});

$("#EventBtn").click(function() {
    $("#paymentDetails").css("display", "none");
    $("#paymentForm").css("display", "none");
    $("#serviceDetails").css("display", "none");
    $("#eventDetails").css("display", "");
    populate('eventapartment');
});

// Export functions and const
export { hello, addService, addPayment, addEvent }
