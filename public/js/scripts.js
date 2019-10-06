const viewLeaderboard = function() {
    document.getElementById('table').style.display = "flex";
    document.getElementById('main-button-container').style.display = "none";
    document.getElementById('leaderboard-button').style.display = "none";

    fetchLeaderboard();
    return false;
};

const fetchLeaderboard = async function() {
    const response = await fetch('/leaderboard', {method: 'GET'});
    const data = await response.json();
    const users = data.users;

    let HTMLDiv = document.getElementById("leaderboard");

    HTMLDiv.innerHTML = '<tr>\n' + '<th>Username</th>\n' +
        '<th>Score</th>\n' + '</tr>';

    for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        let row = '<tr>\n';
        row += (`<td> ${currentUser.username} </td>\n`);
        row += (`<td> ${currentUser.score} </td>\n`);
        row += '</tr>';
        HTMLDiv.innerHTML += row;
    }

    return false;
};

const login = function (e) {
    debugger;
    e.preventDefault();

    const loginInfo = {
        username: document.getElementById("login-username").value,
        password: document.getElementById("password").value
    };

    const body = JSON.stringify(loginInfo);
    fetch( '/login', {
        method:'POST',
        body,
        headers: { 'Content-Type': 'application/json' }
    })
    .then( function( response ) {
        document.getElementById('main-button-container').style.display = "flex";
        document.getElementById('leaderboard-button').style.display = "flex";
        document.getElementById('login').style.display = "none";
    });
};