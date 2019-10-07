const updateBtn = document.getElementById('update');
let hint = document.getElementById('hint');

const name = document.querySelector('#name')
const age = document.querySelector('#age')
const genderS = document.getElementsByName('gender')
const hobbyS = document.getElementsByName('hobby')

const makeBody = function() {
    let gender;
    for (let i = 0; i < genderS.length; i++)
        if (genderS[i].checked) gender = genderS[i].value;
    let hobby;
    for (let i = 0; i < hobbyS.length; i++)
        if (hobbyS[i].checked) hobby = hobbyS[i].value;

    if (name.value && age && gender && hobby) {
        hint.innerHTML = "";
        const json = {
            name: name.value,
            age: parseInt(age.value),
            gender: gender,
            hobby: hobby
        };
        return JSON.stringify(json);
    } else {
        console.log("There are missing fields!");
        hint.innerHTML = "There are missing fields!";
        return ""
    }
}
updateBtn.onclick = function(e) {
    let body = makeBody()
    fetch(`/updateInfo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    }).then(function(response) {
        swal(`Hello ${name.value}!`, `You have successfully updated your profile!`, "success")
            .then((value) => location.href = '../tables/overview.html')
        console.log("Post sent to server: " + response);
    });
    e.preventDefault()
    return false
}

const deleteBtn = document.getElementById('delete');
deleteBtn.onclick = function(e) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover your account!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            swal("Goodbye!", {
                icon: "success",
            }).then(() => {
                fetch('/delete', {
                    method: 'POST'
                }).then(function(response) {
                    console.log("Post sent to server: " + response)
                    location.href = '../index.html'
                })
            })
        } else swal("Great!")
    })
    e.preventDefault()
    return false
}

const cancelBtn = document.getElementById('cancel');
cancelBtn.onclick = function(e) {
    location.href = '../tables/overview.html';
    e.preventDefault()
    return false
}