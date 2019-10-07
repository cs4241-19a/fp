document.getElementById('logout').onclick = function(e) {
    location.href = '../index.html'
    e.preventDefault()
    return false
}
document.getElementById('modify').onclick = function(e) {
    location.href = '../modify/modify.html'
    e.preventDefault()
    return false
}

const updateYou = function(you) {
    fetch('/updateYou', {
        method: 'POST',
        body: JSON.stringify(you),
        headers: { 'Content-Type': 'application/json' }
    }).then(function(response) {
        console.log("Post sent to server: " + response)
    })
}

const createNode = function(element) { return document.createElement(element) }
const append = function(parent, el) { return parent.appendChild(el) }

const makeGender = function(row) {
    let gender = createNode('i')
    if (row.gender === 'Male') gender.className = 'fa fa-male'
    else gender.className = 'fa fa-female'
    return gender
}

fetch('/getYou', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
}).then(function(response) {
    console.log(response)
    return response.json();
}).then(function(data) {
    console.log(data)
    let you = data
    const table = document.getElementById('table');
    const head = document.getElementById('theHead');
    const greet = document.getElementById('greet');

    greet.innerHTML = 'Hello ' + you.name + '!'

    const makeHeadings = function() {
        let th1 = createNode('th');
        let th2 = createNode('th');
        let th3 = createNode('th');
        let th4 = createNode('th');
        let th5 = createNode('th');
        th1.innerHTML = 'Name';
        th2.innerHTML = 'Gender';
        th3.innerHTML = 'Age';
        th4.innerHTML = 'Hobby';
        th5.innerHTML = 'Match Score';
        let tr = createNode('tr');
        append(tr, th1);
        append(tr, th2);
        append(tr, th3);
        append(tr, th4);
        append(tr, th5);
        append(table, tr);
    };

    const makeHeart = function(row) {
        let heart = createNode('i');
        if (you.likedList.includes(row.username)) heart.className = 'fa fa-heart';
        else heart.className = 'fa fa-heart-o';

        heart.onclick = function(e) {
            if (heart.className === 'fa fa-heart') {
                heart.className = 'fa fa-heart-o'
                you.likedList = you.likedList.filter((value => { return value !== row.username }))
                updateYou(you)
                refresh()
            } else {
                heart.className = 'fa fa-heart'
                you.likedList.push(row.username)
                updateYou(you)
                refresh()
            }
            e.preventDefault()
            return false
        };
        return heart;
    };
    const makeBomb = function(row) {
        let bomb = createNode('i');
        if (head.innerHTML === 'Black List') bomb.className = 'fa fa-recycle';
        else bomb.className = 'fa fa-bomb';

        bomb.onclick = function(e) {
            if (bomb.className === 'fa fa-bomb') {
                you.blackList.push(row.username)
                updateYou(you)
                refresh()
            } else {
                you.blackList = you.blackList.filter((value => { return value !== row.username }))
                updateYou(you)
                refresh()
            }
            e.preventDefault();
            return false;
        };
        return bomb;
    };
    const calculateScore = function(row) {
        let score = 0;
        if (you.gender === row.gender) score -= 30;
        else score += 30;
        if (you.hobby === row.hobby) score += 10;
        else score -= 10;
        score -= Math.abs(you.age - row.age);
        return score;
    };
    const makeRow = function(row) {
        let tr = createNode('tr');
        let td1 = createNode('th');
        let td2 = createNode('th');
        let td3 = createNode('th');
        let td4 = createNode('th');
        let td5 = createNode('th');
        let td6 = createNode('th');
        let td7 = createNode('th');

        td1.innerHTML = row.name;
        append(td2, makeGender(row));
        td3.innerHTML = row.age;
        td4.innerHTML = row.hobby;
        td5.innerHTML = calculateScore(row);
        append(td6, makeHeart(row));
        append(td7, makeBomb(row));

        append(tr, td1);
        append(tr, td2);
        append(tr, td3);
        append(tr, td4);
        append(tr, td5);
        append(tr, td6);
        append(tr, td7);

        return tr;
    };

    const refresh = function() {
        fetch('/refreshAll', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            table.innerHTML = "";
            makeHeadings();
            data.map(function(row) {
                if (row.username !== you.username) {
                    switch (head.innerHTML) {
                        case 'Overview':
                            if (!you.blackList.includes(row.username)) append(table, makeRow(row));
                            break;
                        case 'Liked List':
                            if (you.likedList.includes(row.username)) append(table, makeRow(row));
                            break;
                        case 'Black List':
                            if (you.blackList.includes(row.username)) append(table, makeRow(row));
                            break;
                        default:
                            console.log('default')
                    }
                }
            })
        })
    }
    refresh()
})