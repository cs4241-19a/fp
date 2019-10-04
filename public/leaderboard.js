let leaderboard = document.getElementById('leaderboard');

getLeaderboardData = function() {
    fetch('/getLeaderboardData', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }).catch(err => {
        console.log(err)
    }).then(response => {
        response.json().catch(err => {
            console.log(err);
        }).then(data => {
            return data;
        });
    });
};

sortLeaderboardData = function(a, b) {
    'use strict';
    return a.time - b.time;
};

updateLeaderboard = function(leaderboardData) {
    'use strict';
    let rowLength = leaderboard.rows.length - 1;
    leaderboardData.filter(function(a, b) {
        sortLeaderboardData(a, b);
    }).forEach(entry => {
        let newRow = leaderboard.insertRow(rowLength);
        let username = newRow.insertCell(0);
        let time = newRow.insertCell(1);
        let attempts = newRow.insertCell(2);
        username.innerHTML = entry.username;
        time.innerHTML = entry.time;
        attempts.innerHTML = entry.attempts;
        rowLength = leaderboard.rows.length - 1;
    });
};

resetLeaderboard = function(rowlength) {
    'use strict';
    for (rowlength-1; rowlength > 0; rowlength--) {
        leaderboard.deleteRow(rowlength);
    }
};

window.onload = function () {
    'use strict';
    let rowLength = leaderboard.rows.length;
    resetLeaderboard(rowLength);
    let leaderboardData = getLeaderboardData();
    updateLeaderboard(leaderboardData);
};