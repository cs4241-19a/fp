const MAXIMUM_ENTRIES_LOADED = 25
const refreshBtn = document.getElementById("refresh-btn")
const addRecBtn = document.getElementById("add-rec-btn")
const list = document.getElementById("recommendation-list")
const recText = document.getElementById("exampleFormControlTextarea2")
let username = "badUsernameZQFMGB"

const addRecommendation = function () {
    let rating = -1
    if (document.getElementById("star5").checked) rating = 5
    else if (document.getElementById("star4").checked) rating = 4
    else if (document.getElementById("star3").checked) rating = 3
    else if (document.getElementById("star2").checked) rating = 2
    else if (document.getElementById("star1").checked) rating = 1
    else return false

    if (rating === -1) return false
    if (username === "badUsernameZQFMGB") return false
    let songID = document.getElementById("secretSongID").innerHTML
    if (songID === "-1") return
    let songname = document.getElementById("secretSongName").innerHTML
    if (songname === "-1") return
    let artist = document.getElementById("secretArtist").innerHTML
    if (artist === "-1") return
    const newRecommendation = {
        username: username,
        songid: songID,
        rating: rating,
        caption: recText.value,
        songname: songname,
        artist: artist
    }

    const body = JSON.stringify(newRecommendation)
    fetch("/recommendation", {
        method: "POST",
        body,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        document.getElementById("secretSongID").innerHTML = "-1"
        document.getElementById("secretArtist").innerHTML = "-1"
        document.getElementById("secretSongName").innerHTML = "-1"
        getRecommendations()
    })
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
            for (let i = numEntries - 1; i >= 0; i--) {
                let element = res[i]
                let songid = element.songid
                let username = element.username
                let rating = element.rating
                let caption = element.caption
                let songname = element.songname
                let artist = element.artist

                if (isNaN(rating) || rating < 1 || rating > 5) continue

                let newRecommendation =
                    `<div class="card" id="recommendation${i}">\n` +
                    `   <div class="card-body">\n` +
                    `      <h5 class="card-title">` + username + " rated \"" + songname + "\" by " + artist + `</h5>\n` +
                    `      <p class="card-text">`

                for (let j = 0; j < rating; j++)
                    newRecommendation += `<img src="../images/fullstar.png" alt="Star"/>`
                for (let j = rating; j < 5; j++)
                    newRecommendation += `<img src="../images/emptystar.png" alt="Blank Star"/>`

                newRecommendation += `</p>\n` +
                    `      <p class="card-text"><i>` + "\"" + caption + "\"" + `</i></p>\n` +
                    `      <p class="invisible" id="songid${i}">` + songid + `</p>\n` +
                    `      <a class="btn btn-primary" href="#" onclick="playSomeTrackID('` + songid + `')">Play</a>` +
                    `   </div>\n` +
                    `</div>`

                list.innerHTML += newRecommendation
            }
        }
    })()
}

getData()
getRecommendations()
//refreshBtn.onclick = getRecommendations
addRecBtn.onclick = addRecommendation
