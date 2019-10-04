const getData = function() {
    (async () => {
        const rawResponse = await fetch('/user', {
            method: 'GET'
        })
        let usr = await rawResponse.json()
        document.getElementById("logoutLink").innerHTML = "Log out " + usr.user.username
    })()
}

const recommendations = function() {
    (async () => {
        const rawResponse = await fetch('/recommendation', {
            method: 'GET'
        })
        let res = await rawResponse.json()
        console.log(res)
    })()
}

getData()
recommendations()
