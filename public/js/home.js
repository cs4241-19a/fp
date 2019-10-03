(function getData() {
    (async () => {
        const rawResponse = await fetch('/user', {
            method: 'GET'
        })
        let usr = await rawResponse.json()
        document.getElementById("logoutLink").innerHTML = "Log out " + usr.user.username
    })()
})()
