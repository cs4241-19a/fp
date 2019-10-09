let leaderboard = document.getElementById('leaderboard');

sortLeaderboardData = function(a, b) {
    'use strict';
    return a.time - b.time;
};

updateLeaderboard = function(leaderboardData) {
    'use strict';
    let rowLength = leaderboard.rows.length;
    console.log(leaderboardData);
    leaderboardData = leaderboardData.sort(function(a, b) {
        sortLeaderboardData(a, b);
    });
    console.log(leaderboardData);
    leaderboardData.forEach(entry => {
        console.log(rowLength);
        let newRow = leaderboard.insertRow(rowLength);
        let username = newRow.insertCell(0);
        let time = newRow.insertCell(1);
        let attempts = newRow.insertCell(2);
        username.innerHTML = entry.user;
        time.innerHTML = entry.time;
        // attempts.innerHTML = entry.attempts;
        rowLength = leaderboard.rows.length;
    });
};

resetLeaderboard = function(rowlength) {
    'use strict';
    if (rowlength !== 1) {
        for (rowlength-1; rowlength > 0; rowlength--) {
            leaderboard.deleteRow(rowlength);
        }
    }
};

window.onload = function () {
    'use strict';
    let rowLength = leaderboard.rows.length;
    resetLeaderboard(rowLength);
    fetch('/getLeaderboardData', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }).catch(err => {
        console.log(err)
    }).then(response => {
        response.json().catch(err => {
            console.log(err);
        }).then(data => {
            updateLeaderboard(data);
        });
    });
};