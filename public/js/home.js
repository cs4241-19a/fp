const MAXIMUM_ENTRIES_LOADED = 25
const refreshBtn = document.getElementById("refresh-btn")
const addRecBtn = document.getElementById("add-rec-btn")
const list = document.getElementById("recommendation-list")
const recText = document.getElementById("exampleFormControlTextarea2")
let username = "badUsernameZQFMGB"

const addRecommendation = function () {
    let rating = -1;
    if (document.getElementById("star5").checked) rating = 5;
    else if (document.getElementById("star4").checked) rating = 4;
    else if (document.getElementById("star3").checked) rating = 3;
    else if (document.getElementById("star2").checked) rating = 2;
    else if (document.getElementById("star1").checked) rating = 1;
    else return false

    if (rating === -1) return false
    if (username === "badUsernameZQFMGB") return false
    let songID = document.getElementById("secretSongID").innerHTML
    if (songID === "-1") return
    const newRecommendation = {
        username: username,
        tracknumber: songID,
        rating: rating,
        caption: recText.value
    }

    const body = JSON.stringify(newRecommendation);
    fetch("/recommendation", {
        method: "POST",
        body,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(getRecommendations)
}

const getData = function () {
    (async () => {
        const rawResponse = await fetch('/user', {
            method: 'GET'
        })
        let usr = await rawResponse.json()
        username = usr.user.username
        document.getElementById("secretUsername").innerHTML = username
        document.getElementById("logoutLink").innerHTML = "Log out " + username
    })()
}

const getRecommendations = function () {
    (async () => {
        const rawResponse = await fetch('/recommendation', {
            method: 'GET'
        })
        let res = await rawResponse.json()

        let numEntries = res.length
        if (numEntries > MAXIMUM_ENTRIES_LOADED) numEntries = MAXIMUM_ENTRIES_LOADED

        if (numEntries === 0) {
            list.innerHTML =
                `<div class="card" id="rec-error-msg">\n` +
                `   <div class="card-body">\n` +
                `      <p class="card-text">No recommendations found</p>\n` +
                `   </div>\n` +
                `</div>`
        } else {
            list.innerHTML = ""
            for (let i = 0; i < numEntries; i++) {
                let element = res[i]
                let songname = element.tracknumber //TODO: Replace with code getting song name from Spotify
                let username = element.username
                let rating = element.rating
                let caption = element.caption

                if (isNaN(rating)) {
                    //console.log(rating + " - Rating not a number")
                    rating = Math.floor((Math.random() * 5) + 1)
                } else if (rating < 1) {
                    //console.log(rating + " - Rating too low")
                    rating = 1
                } else if (rating > 5) {
                    //console.log(rating + " - Rating too high")
                    rating = 5
                }

                list.innerHTML +=
                    `<div class="card" id="recommendation${i}">\n` +
                    `   <div class="card-body">\n` +
                    `      <h5 class="card-title">` + songname + `</h5>\n` +
                    `      <p class="card-text">` + username + " rated this song " + rating + " out of 5" + `</p>\n` +
                    `      <p class="card-text"><i>` + "\"" + caption + "\"" + `</i></p>\n` +
                    `   </div>\n` +
                    `</div>`
            }
        }
    })()
}

getData()
getRecommendations()
refreshBtn.onclick = getRecommendations
addRecBtn.onclick = addRecommendation
