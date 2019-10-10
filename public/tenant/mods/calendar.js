console.log('calendar.js')

function calendar(element, payment, eventdiv, service, day) {
    let myCalendar = jsCalendar.new({
        target: element,
        monthFormat: "month YYYY"
    });
    //get a list of dates
    fetch('/getDatesTenant',{
        method: 'GET'
    }).then(function(response){
        return response.json()
    }).then(function(dateList){
        myCalendar.onDateRender(function(date, element, info){
            for(let singleDate of dateList){
                if (!info.isCurrent && reformat(date.toString().substring(4, 15)) === singleDate) {
                    element.style.fontWeight = 'bold';
                    element.style.color = (info.isCurrentMonth) ? '#c32525' : '#ffb4b4';
                }
            }

        });
    });

    myCalendar.onDateClick(function(event, date){
        //selecting a day
        myCalendar.clearSelected();
        myCalendar.select(date);

        //filteredEvents.innerHTML = "<p id='date'</p>" + date.toString().substring(4, 15) +
        // '<p id="pay" class="eventType">Payment</p>' + getPayment() +
        // '<p id="event" class="eventType">Event</p>' + getEvent() +
        // '<p id="service" class="eventType">Service</p>' + getService()
        let formatedDate = reformat(date.toString().substring(4, 15));
        day.innerText = formatedDate
        getPayment(payment, formatedDate)
        getEvent(eventdiv, formatedDate)
        getService(service, formatedDate)
    });


}

function reformat(date){
    let month = date.substring(0, 3)
    if(month === "Jan")
        month = "01"
    else if(month === "Feb")
        month = "02"
    else if(month === "Mar")
        month = "03"
    else if(month === "Apr")
        month = "04"
    else if(month === "May")
        month = "05"
    else if(month === "Jun")
        month = "06"
    else if(month === "Jul")
        month = "07"
    else if(month === "Aug")
        month = "08"
    else if(month === "Sep")
        month = "09"
    else if(month === "Oct")
        month = "10"
    else if(month === "Nov")
        month = "11"
    else if(month === "Dec")
        month = "12"

    let day = date.substring(4, 6)
    let year = date.substring(7)
    return year + "-" + month + "-" + day;
}

function getPayment(pay, date) {
    fetch('/getPayTenant', {
        method: 'GET'
    }).then(function(res){
        return res.json()
    }).then(function(payList){
        let filteredList = filter(payList, date)
        let htmlString = '<ul>'
        for(let p of filteredList) {
            htmlString += '<li>Amount Due: ' + p.amount + '<br>Description: ' + p.desc + '</li>'
        }
        htmlString += '</ul>'
        pay.innerHTML = '<p id="payTitle" class="eventType">Payments</p>' + htmlString
    })
}

function getEvent(event, date) {
    fetch('/getEventsTenant', {
        method: 'GET'
    }).then(function(res){
        return res.json()
    }).then(function(EventList){
        let filteredList = filter(EventList, date)
        let htmlString = '<ul>'
        for(let e of filteredList) {
            htmlString += '<li>Event name: ' + e.eventname + '<br>Description: ' + e.desc + '</li>'
        }
        htmlString += '</ul>'
        event.innerHTML = '<p id="eventTitle" class="eventType">Events</p>' + htmlString
    })
}

function getService(service, date) {
    fetch('/getServiceTenant', {
        method: 'GET'
    }).then(function(res){
        return res.json()
    }).then(function(EventList){
        let filteredList = filter(EventList, date)
        let htmlString = '<ul>'
        for(let s of filteredList) {
            htmlString += '<li>Service: ' + s.service + '<br>Description: ' + s.desc + '</li>'
        }
        htmlString += '</ul>'
        service.innerHTML = '<p id="serviceTitle" class="eventType">Service</p>' + htmlString
    })
}

function filter(eventList, date) {
    let filteredList = []
    for(let i = 0; i < eventList.length; i++) {
        if(date === eventList[i].day || date === eventList[i].due || date === eventList[i].date) {
            filteredList.push(eventList[i])
        }
    }
    return filteredList
}

// Export functions and const
export {calendar}