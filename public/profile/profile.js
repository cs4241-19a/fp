window.onload = function() {
    $('.toast').toast({ autohide: false })
    $('.toast').toast('show')
    document.getElementById('goTop-btn').onclick = function() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }
}

function refreshProfile() {
    fetch('/getYou', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(function(response) {
        return response.json();
    }).then(function(you) {
        let user
        fetch('/refreshAll', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(function(response) {
            return response.json()
        }).then(function(data) {
            data.map(function(row) {
                if (row._id === localStorage.id) user = row
            })

            if (user.pic) document.getElementById('avatar').style.backgroundImage = `url(${user.pic})`
            document.getElementById('name').innerHTML = user.name
            document.getElementById('name2').innerHTML = you.name
            document.getElementById('favCount').innerHTML = user.favCount
            document.getElementById('likes').innerHTML = user.likes
            document.getElementById('dislikes').innerHTML = user.dislikes
            document.getElementById('gender').innerHTML = user.gender
            document.getElementById('age').innerHTML = user.age
            document.getElementById('hobby').innerHTML = user.hobby
            document.getElementById('salary').innerHTML = user.salary
            document.getElementById('location').innerHTML = user.location
            document.getElementById('self-intro').innerHTML = user.selfIntro
            document.getElementById('personal-msg').innerHTML = user.whatsUp
            document.getElementById('comment-img').src = you.pic

            // const heart = document.getElementById('like-ico')
            // if (user._id === you._id) {
            //     heart.className = 'fa fa-heart'
            //     heart.style.color = 'red'
            // } else {
            //     if (you.likedList.includes(user.name)) {
            //         heart.className = 'fa fa-heart'
            //         heart.style.color = 'red'
            //     } else {
            //         console.log('here')
            //         heart.className = 'fa fa-heart-o'
            //         heart.style.color = 'black'
            //     }
            // }
            // heart.onclick = function(e) {
            //     if (heart.className === 'fa fa-heart') {
            //         heart.className = 'fa fa-heart-o';
            //         heart.style.color = 'black';
            //         you.favCount -= 1
            //         you.likedList = you.likedList.filter((value => { return value !== user.username }))
            //     } else {
            //         heart.className = 'fa fa-heart';
            //         heart.style.color = 'red';
            //         you.favCount += 1
            //         you.likedList.push(user.username)
            //     }
            //     update(you)
            //     e.preventDefault()
            //     return false
            // }
            document.getElementById('up-ico').onclick = function(e) {
                user.likes += 1
                update(user)
                e.preventDefault()
                return false
            }
            document.getElementById('down-ico').onclick = function(e) {
                user.dislikes += 1
                update(user)
                e.preventDefault()
                return false
            }

            const update = function(user) {
                fetch('/updateUser', {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: { 'Content-Type': 'application/json' }
                }).then(function(response) {
                    console.log("Post sent to server: " + response)
                    refreshProfile()
                })
            }
            document.getElementById('comment-btn').onclick = function(e) {
                user.comments.push([you.pic, you.name, document.getElementById('comment-text').value])
                update(user)
                e.preventDefault()
                return false
            }

            const comments = document.getElementById('comments')
            comments.innerHTML = ''
            const createNode = function(element) { return document.createElement(element) }
            const append = function(parent, el) { return parent.appendChild(el) }
            user.comments.map(function(comment) {
                let img = createNode('img')
                img.src = comment[0]
                img.className = 'rounded mr-2'

                let strong = createNode('strong')
                strong.innerHTML = comment[1]
                strong.className = 'mr-auto'

                let header = createNode('div')
                header.className = 'toast-header'
                append(header, img)
                append(header, strong)

                let body = createNode('div')
                body.innerHTML = comment[2]
                body.className = 'toast-body'

                let toast = createNode('div')
                toast.role = 'alert'
                toast.className = 'toast fade show'
                append(toast, header)
                append(toast, body)
                append(comments, toast)
            })
        })
    })
}
refreshProfile()