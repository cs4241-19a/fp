
function getPayments(payBtn, details){
    fetch('/payments', {
        method:'GET',
    }).then(function(response){
        return response.json()
    }).then(function(listPayment){
        displayDates(listPayment, payBtn, details)
    })
}

function displayDates(listPayment, payBtn, details){
    let str = "";
    for(let pay of listPayment){
        str+='<button class="payBtn" id="' + pay.due+ '">' + pay.due + '</button>'
    }
    payBtn.innerHTML = str;
    for(let p of listPayment){
        let btn = document.getElementById(p.due)
        btn.onclick = function(){
            let str ="";
            str += '<p class="paytext">Amount: ' + p.amount + '</p>';
            str += '<p class="paytext">For: ' + p.desc + '</p>';
            str += '<p class="paytext">Due Date: ' + p.due + '</p>';
            str += '<button id="paypal"><a href="https://www.paypal.com/us/for-you/transfer-money/send-money">Pay Here!</a></button>'

            details.innerHTML = str;
        }
    }
}

export {getPayments}