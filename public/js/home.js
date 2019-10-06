const MAXIMUM_ENTRIES_LOADED = 25
const refreshBtn = document.getElementById("refresh-btn")
const list = document.getElementById("recommendation-list")

const getData = function () {
    (async () => {
        const rawResponse = await fetch('/user', {
            method: 'GET'
        })
        let usr = await rawResponse.json()
        document.getElementById("logoutLink").innerHTML = "Log out " + usr.user.username
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
                    console.log(rating + " - Rating not a number")
                    rating = Math.floor((Math.random() * 5) + 1)
                } else if (rating < 1) {
                    console.log(rating + " - Rating too low")
                    rating = 1
                } else if (rating > 5) {
                    console.log(rating + " - Rating too high")
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
