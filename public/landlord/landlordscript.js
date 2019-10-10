import * as manage from './mods/manage.js'
import * as calendar from './mods/calendar.js'
import * as schedule from './mods/schedule.js'

// Content Screens
var managementScreen = document.getElementById("manageScreen")
var calendarScreen = document.getElementById("calendarScreen")
var scheduleScreen = document.getElementById("scheduleScreen")

let apts;
let element = document.getElementById("my-calendar");
let day = document.getElementById("caldate")
let payment = document.getElementById("Payment")
let event = document.getElementById("Event")
let service = document.getElementById("Service")
calendar.calendar(element, payment, event, service, day)

window.onload = function () {
    const managementBtn = document.querySelector('#manage')
    managementBtn.onclick = switchToManagement
    const calendarBtn = document.querySelector('#calendar')
    calendarBtn.onclick = switchToCalendar
    const scheduleBtn = document.querySelector('#schedule')
    scheduleBtn.onclick = switchToSchedule

    // Manage Screen
    manage.reset()          
    const profileScreenBtn = document.querySelector(".profileBtn")
    profileScreenBtn.onclick = manage.loadProfile
    const addApartmentScreenBtn = document.querySelector(".addApartmentBtn")
    addApartmentScreenBtn.onclick = manage.loadAddApartment
    const updateProfileBtn = document.querySelector(".updateBtnFun")
    updateProfileBtn.onclick = manage.updateProfile
    const addApartmentBtn = document.querySelector(".addApartmentBtnFun")
    addApartmentBtn.onclick = manage.addApartment

    /*
    const testBtn = document.querySelector("#testbtn")
    testBtn.onclick = manage.loadApartment
    */

    // Calendar Screen

    // Schedule Screen
}

function populate(id) {
    var ele = document.getElementById(id);
    ele.innerHTML = '<option value="">-- Select an apartment key --</option>'
    for (var i = 0; i < apts.length; i++) {
        // POPULATE SELECT ELEMENT WITH JSON.
        ele.innerHTML = ele.innerHTML +
            '<option value="' + apts[i]['key'] + '">' + 'Key #: ' + apts[i]['key'] + ', ' + apts[i]['address'] + '</option>';
    }
}

const switchToManagement = function(e) {
    e.preventDefault()
    
    managementScreen.style.display = 'block'
    calendarScreen.style.display = 'none'
    scheduleScreen.style.display = 'none'

    manage.reset()

    console.log("Manage")
}

const switchToCalendar = function(e) {
    e.preventDefault()
    
    managementScreen.style.display = 'none'
    calendarScreen.style.display = 'block'
    scheduleScreen.style.display = 'none'

    console.log("Calendar")
}

const switchToSchedule = function(e) {
    e.preventDefault()
    
    managementScreen.style.display = 'none'
    calendarScreen.style.display = 'none'
    scheduleScreen.style.display = 'block'

    console.log("Schedule")

    fetch('/getApartments', {
        method: 'GET'
    }).then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log("data", data)
        // console.log(data.address)
        // console.log(data.landlord)
        for(let i = 0; i < data.length; i++) {
            console.log("Address " + data[i].address)
            console.log("Landlord " + data[i].landlord)
            console.log("Key " + data[i].key)
        }
        apts = data;
    })

}

$("input[data-type='currency']").on({
    keyup: function() {
        formatCurrency($(this));
    },
    blur: function() {
        formatCurrency($(this), "blur");
    }
});


function formatNumber(n) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


function formatCurrency(input, blur) {
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.

    // get input value
    var input_val = input.val();

    // don't validate empty input
    if (input_val === "") { return; }

    // original length
    var original_len = input_val.length;

    // initial caret position
    var caret_pos = input.prop("selectionStart");

    // check for decimal
    if (input_val.indexOf(".") >= 0) {

        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimal_pos = input_val.indexOf(".");

        // split number by decimal point
        var left_side = input_val.substring(0, decimal_pos);
        var right_side = input_val.substring(decimal_pos);

        // add commas to left side of number
        left_side = formatNumber(left_side);

        // validate right side
        right_side = formatNumber(right_side);

        // On blur make sure 2 numbers after decimal
        if (blur === "blur") {
            right_side += "00";
        }

        // Limit decimal to only 2 digits
        right_side = right_side.substring(0, 2);

        // join number by .
        input_val = "$" + left_side + "." + right_side;

    } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        input_val = formatNumber(input_val);
        input_val = "$" + input_val;

        // final formatting
        if (blur === "blur") {
            input_val += ".00";
        }
    }

    // send updated string to input
    input.val(input_val);

    // put caret back in the right position
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);
}

 export {calendarScreen, managementScreen, scheduleScreen, populate}
