const addBtn = document.getElementById('add');
const cancelBtn = document.getElementById('cancel');
let hint = document.getElementById('hint');

const username = document.querySelector('#username');
const password = document.querySelector('#password');
const name = document.querySelector('#name');
const age = document.querySelector('#age');
const genderS = document.getElementsByName('gender');
const hobbyS = document.getElementsByName('hobby');

let gender
let hobby

const submit = function(e) {
    for (let i = 0; i < genderS.length; i++) {
        if (genderS[i].checked) gender = genderS[i].value
    }
    for (let i = 0; i < hobbyS.length; i++) {
        if (hobbyS[i].checked) hobby = hobbyS[i].value
    }

    fetch('/checkDup', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        hint.innerHTML = ""
        for (let i = 0; i < data.length; i++) {
            if (data[i] === username.value) hint.innerHTML = "Username already exists!"
        }
        if (!name.value || !password.value || !name.value || !age.value || !gender || !hobby) {
            hint.innerHTML = "There are missing fields!"
        }
        if (hint.innerHTML === "") {
            const json = {
                username: username.value,
                password: password.value,
                name: name.value,
                age: parseInt(age.value),
                gender: gender,
                hobby: hobby,
                likedList: [],
                blackList: [],
                comments: [],
                likes: 0,
                dislikes: 0
            }
            fetch(`/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(json)
            }).then(function(response) {
                swal(`Hello ${name.value}!`, `You have successfully registered!`, "success")
                    .then((value) => location.href = '../index.html')
                console.log("Post sent to server: " + response)
            })
        }
    })
    e.preventDefault()
    return false
}
addBtn.onclick = submit;

cancelBtn.onclick = function(e) {
    location.href = '../index.html';
    e.preventDefault();
    return false;
};