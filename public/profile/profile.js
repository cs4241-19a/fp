window.onload = function() {
    $('.toast').toast({ autohide: false })
    $('.toast').toast('show')
    document.getElementById('goTop-btn').onclick = function() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }
    refreshProfile()
}

function refreshProfile() {
    fetch('/getYou', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(function(response) {
        return response.json();
    }).then(function(you) {
        if (you.pic) document.getElementById('avatar').style.backgroundImage = `url(${you.pic})`
        document.getElementById('name').innerHTML = you.name
        document.getElementById('name2').innerHTML = you.name
        document.getElementById('favCount').innerHTML = you.favCount
        document.getElementById('likes').innerHTML = you.likes
        document.getElementById('dislikes').innerHTML = you.dislikes
        document.getElementById('gender').innerHTML = you.gender
        document.getElementById('age').innerHTML = you.age
        document.getElementById('hobby').innerHTML = you.hobby
        document.getElementById('salary').innerHTML = you.salary
        document.getElementById('location').innerHTML = you.location
        document.getElementById('self-intro').innerHTML = you.selfIntro
        document.getElementById('personal-msg').innerHTML = you.whatsUp
        document.getElementById('comment-img').src = you.pic

        const update = function(user) {
            fetch('/updateUser', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: { 'Content-Type': 'application/json' }
            }).then(function(response) {
                console.log("Post sent to server: " + response)
                setTimeout(function() { refreshProfile() }, 1500)
            })
        }
        document.getElementById('comment-btn').onclick = function(e) {
            you.comments.push([you.pic, you.name, document.getElementById('comment-text').value])
            update(you)
            e.preventDefault()
            return false
        }

        const comments = document.getElementById('comments')
        comments.innerHTML = ''
        const createNode = function(element) { return document.createElement(element) }
        const append = function(parent, el) { return parent.appendChild(el) }
        you.comments.map(function(comment) {
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
}