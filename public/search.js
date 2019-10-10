let token

(function getData() {
    (async () => {
        const rawResponse = await fetch('/token', {
            method: 'GET'
        })
        let response = await rawResponse.json()
        token = response.token
    })()
})()

window.onload = function (e) {
    let searchButton = document.getElementById("songSearch")
    searchButton.onclick = searchSpotify
    let searchInput = document.getElementById("songName")
    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("songSearch").click();
        }
    });
    searchInput.onsubmit = searchSpotify
}

$('#scrollable-table').on('click', 'tbody tr', function (event) {
    $(this).addClass('highlight').siblings().removeClass('highlight');
    let songName = $(this).find('td:eq(0)').html();
    let artistName = $(this).find('td:eq(1)').html();
    let idNumber = $(this).find('td:eq(2)').html();
    document.getElementById("secretSongID").innerHTML = idNumber
    document.getElementById("secretArtist").innerHTML = artistName
    document.getElementById("secretSongName").innerHTML = songName
    console.log("currently selected song: " + songName + "\n\t\t" +
        "artist: " + artistName + "\n\t\t" +
        "id: " + idNumber + "\n\t\t")
});

function searchSpotify() {
    let songName = document.getElementById("songName").value

    const BASE_URL = 'https://api.spotify.com/v1/search?'
    const FETCH_URL = `${BASE_URL}q=track:${songName}&type=track&market=US&limit=10`

    fetch(FETCH_URL, {
        method: 'GET',
        headers: new Headers({
            Accept: "application/json",
            Authorization: "Bearer " + token
        })
    })
        .then(response => response.json())
        .then(json => search(json))

}

function search(json) {
    let tracks = json.tracks.items
    $("tbody").empty()
    for (let i = 0; i < tracks.length; i++) {
        $("tbody").append("<tr>" +
            "                   <td>" + tracks[i].name + "</td>\n" +
            "                   <td>" + tracks[i].artists[0].name + "</td>" +
            "                   <td class = 'hidden-data d-none'>" + tracks[i].uri.split('track:')[1] + "</td>" +
            "             </tr>"
        )
    }
}
