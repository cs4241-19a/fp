fetch('/getYou', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
}).then(function(response) {
    return response.json();
}).then(function(you) {
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

    const table = document.getElementById('table');
    const head = document.getElementById('theHead');
    const greet = document.getElementById('greet');

    const createNode = function(element) { return document.createElement(element) }
    const append = function(parent, el) { return parent.appendChild(el) }
    const makeHeadings = function() {
        let th1 = createNode('th');
        let th2 = createNode('th');
        let th3 = createNode('th');
        let th4 = createNode('th');
        let th5 = createNode('th');
        let th6 = createNode('th');
        let th7 = createNode('th');
        th1.innerHTML = 'Name';
        th2.innerHTML = 'Gender';
        th3.innerHTML = 'Age';
        th4.innerHTML = 'Hobby';
        th5.innerHTML = 'Match Score';
        th6.innerHTML = 'Likes';
        th7.innerHTML = 'Dislikes';
        let tr = createNode('tr');
        append(tr, th1);
        append(tr, th2);
        append(tr, th3);
        append(tr, th4);
        append(tr, th5);
        append(tr, th6);
        append(tr, th7);
        append(table, tr);
    };

    const makeGender = function(row) {
        let gender = createNode('i')
        if (row.gender === 'Male') gender.className = 'fa fa-male'
        else gender.className = 'fa fa-female'
        return gender
    }

    greet.innerHTML = 'Hello ' + you.name + '!'

    const update = function(user) {
        // console.log(user)
        fetch('/updateUser', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        }).then(function(response) {
            console.log("Post sent to server: " + response)
        })
    }

    const makeHeart = function(row) {
        let heart = createNode('i');
        if (you.likedList.includes(row.username)) heart.className = 'fa fa-heart';
        else heart.className = 'fa fa-heart-o';

        heart.onclick = function(e) {
            if (heart.className === 'fa fa-heart') {
                heart.className = 'fa fa-heart-o'
                you.likedList = you.likedList.filter((value => { return value !== row.username }))
                update(you)
                refresh()
            } else {
                heart.className = 'fa fa-heart'
                you.likedList.push(row.username)
                update(you)
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
                update(you)
                refresh()
            } else {
                you.blackList = you.blackList.filter((value => { return value !== row.username }))
                update(you)
                refresh()
            }
            e.preventDefault();
            return false;
        };
        return bomb
    }
    const makeLike = function(row) {
        let like = createNode('i')
        like.className = 'fa fa-thumbs-o-up'
        like.onmouseover = function() { like.className = 'fa fa-thumbs-up' }
        like.onmouseleave = function() { like.className = 'fa fa-thumbs-o-up' }
        like.onclick = function(e) {
            row.likes += 1
            update(row)
            refresh()
            e.preventDefault()
            return false
        }
        return like
    }
    const makeDislike = function(row) {
        let dislike = createNode('i')
        dislike.className = 'fa fa-thumbs-o-down'
        dislike.onmouseover = function() { dislike.className = 'fa fa-thumbs-down' }
        dislike.onmouseleave = function() { dislike.className = 'fa fa-thumbs-o-down' }
        dislike.onclick = function(e) {
            row.dislikes += 1
            update(row)
            refresh()
            e.preventDefault()
            return false
        }
        return dislike
    }
    const calculateScore = function(row) {
        let score = 0;
        if (you.gender === row.gender) score -= 30;
        else score += 30;
        if (you.hobby === row.hobby) score += 10;
        else score -= 10;
        score -= Math.abs(you.age - row.age);
        return score;
    }
    const makeImg = function(row) {
        let img = createNode('img')
        if (row.pic) img.src = row.pic
        return img
    }
    const makeRow = function(row) {
        let tr = createNode('tr')
        let td1 = createNode('th')
        let td2 = createNode('th')
        let td3 = createNode('th')
        let td4 = createNode('th')
        let td5 = createNode('th')
        let td6 = createNode('th')
        let td7 = createNode('th')
        let td8 = createNode('th')
        let td9 = createNode('th')
        let td10 = createNode('th')

        td1.innerHTML = row.name;
        append(td2, makeGender(row));
        td3.innerHTML = row.age;
        td4.innerHTML = row.hobby;
        td5.innerHTML = calculateScore(row)
        td6.innerHTML = row.likes + ' '
        append(td6, makeLike(row))
        td7.innerHTML = row.dislikes + ' '
        append(td7, makeDislike(row))
        append(td8, makeHeart(row))
        append(td9, makeBomb(row))
        append(td10, makeImg(row))

        append(tr, td1)
        append(tr, td2)
        append(tr, td3)
        append(tr, td4)
        append(tr, td5)
        append(tr, td6)
        append(tr, td7)
        append(tr, td8)
        append(tr, td9)
        append(tr, td10)

        return tr
    }

    const refresh = function() {
        fetch('/refreshAll', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(function(response) {
            return response.json()
        }).then(function(data) {
            table.innerHTML = "";
            makeHeadings()
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