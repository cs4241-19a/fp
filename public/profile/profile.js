window.onload = function() {
    $('.toast').toast({ autohide: false })
    $('.toast').toast('show')
}
document.getElementById('goTop-btn').onclick = function() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
}
document.getElementById('edit-info').onclick = function(e) {
    location.href = '../modify/modify.html'
    e.preventDefault()
    return false
}

fetch('/getYou', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
}).then(function(response) {
    return response.json();
}).then(function(you) {
    if (you.pic) document.getElementById('avatar').style.backgroundImage = `url(${you.pic})`
    document.getElementById('name').innerHTML = you.name
    document.getElementById('name2').innerHTML = you.name
    document.getElementById('likes').innerHTML = you.likes
    document.getElementById('dislikes').innerHTML = you.dislikes
    document.getElementById('gender').innerHTML = you.gender
    document.getElementById('age').innerHTML = you.age
    document.getElementById('hobby').innerHTML = you.hobby

    const comments = document.getElementById('comments')
    const createNode = function(element) { return document.createElement(element) }
    const append = function(parent, el) { return parent.appendChild(el) }
    you.comments.map(function(comment) {
        // console.log(comment[0], comment[1], comment[2])
        comments.innerHTML = ''

        let img = createNode('img')
        img.src = comment[0]
        img.style.height = '50px'
        img.style.width = '70px'
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
        toast.className = 'toast'
        append(toast, header)
        append(toast, body)
        append(comments, toast)
    })
})