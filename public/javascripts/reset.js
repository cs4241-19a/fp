function clearMessages(){
    window.alert("clearing messages!")
    let json = { isThisImportant: false }
    let body = JSON.stringify(json)

    fetch( '/messaging/deleteMessages', {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: body
    }).then(function(res){

    });
}

function clearUsers(){
    window.alert("clearing users!")
    let json = { isThisImportant: false }
    let body = JSON.stringify(json)

    fetch( '/api/users/deleteUsers', {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: body
    }).then(function(res){

    });
}

function clearBooks() {
    window.alert("clearing books!")
    let json = { isThisImportant: false }
    let body = JSON.stringify(json)

    fetch( '/api/books/deleteBooks', {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: body
    }).then(function(res){

    });
}

document.getElementById("messages").onclick = clearMessages
document.getElementById("users").onclick = clearUsers
document.getElementById("books").onclick = clearBooks