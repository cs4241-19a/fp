window.onload = function() {
    $('.toast').toast({ autohide: false })
    $('.toast').toast('show')
}
document.getElementById('goTop-btn').onclick = function() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
}

fetch('/getYou', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
}).then(function(response) {
    return response.json();
}).then(function(you) {
    document.getElementById('avatar').style.backgroundImage = `url(${you.pic})`
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

// const makeBody = function() {
//     let gender;
//     for (let i = 0; i < genderS.length; i++)
//         if (genderS[i].checked) gender = genderS[i].value;
//     let hobby;
//     for (let i = 0; i < hobbyS.length; i++)
//         if (hobbyS[i].checked) hobby = hobbyS[i].value;

//     if (name.value && age && gender && hobby) {
//         hint.innerHTML = "";
//         const json = {
//             name: name.value,
//             age: parseInt(age.value),
//             gender: gender,
//             hobby: hobby
//         };
//         return JSON.stringify(json);
//     } else {
//         console.log("There are missing fields!");
//         hint.innerHTML = "There are missing fields!";
//         return ""
//     }
// }
// document.getElementById('update').onclick = function(e) {
//     let body = makeBody()
//     fetch(`/updateInfo`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body
//     }).then(function(response) {
//         swal(`Hello ${name.value}!`, `You have successfully updated your profile!`, "success")
//             .then(() => location.href = '../tables/overview.html')
//         console.log("Post sent to server: " + response);
//     });
//     e.preventDefault()
//     return false
// }

// document.getElementById('delete').onclick = function(e) {
//     swal({
//         title: "Are you sure?",
//         text: "Once deleted, you will not be able to recover your account!",
//         icon: "warning",
//         buttons: true,
//         dangerMode: true,
//     }).then((willDelete) => {
//         if (willDelete) {
//             swal("Goodbye!", {
//                 icon: "success",
//             }).then(() => {
//                 fetch('/delete', {
//                     method: 'POST'
//                 }).then(function(response) {
//                     console.log("Post sent to server: " + response)
//                     location.href = '../index.html'
//                 })
//             })
//         } else swal("Great!")
//     })
//     e.preventDefault()
//     return false
// }

// document.getElementById('cancel').onclick = function(e) {
//     location.href = '../tables/overview.html'
//     e.preventDefault()
//     return false
// }