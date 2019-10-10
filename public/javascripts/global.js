var createdAccount = false

function setFalse() {
    createdAccount = false;
}

function setTrue() {

    console.log("we trying")
    createdAccount = true;
    setTimeout(function(){
        window.location.href = "/login";
    }, 2000);
    //window.location.href = "/login";
}

export  {createdAccount, setTrue, setFalse }