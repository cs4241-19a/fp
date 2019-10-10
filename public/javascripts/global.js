var createdAccount = false

function setFalse() {
    createdAccount = false;
}

function setTrue() {
    createdAccount = true;
    console.log(createdAccount)
    setTimeout(function(){
        createdAccount = true;
        window.location.href = "/login";
        createdAccount = true;
    }, 1000);
    //window.location.href = "/login";
}

export  {createdAccount, setTrue, setFalse }