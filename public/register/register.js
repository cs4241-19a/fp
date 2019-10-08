document.getElementById('cancel-btn').onclick = function(e) {
    location.href = '../index.html';
    e.preventDefault();
    return false;
}

const username = document.querySelector('#input-username')
const password = document.querySelector('#input-password')
const name = document.querySelector('#input-nickname')
const age = document.querySelector('#input-age')
const genderS = document.getElementsByName('customRadio')
const hobbyS = document.getElementById('select-hobby')

let imgSrc
const previewContainer = document.getElementById('imagePreview')
const previewImage = previewContainer.querySelector('.image-preview__image')
const previewDefaultText = previewContainer.querySelector('.image-preview__default-text')
document.getElementById('inpFile').addEventListener('change', function(e) {
    const file = this.files[0]
    if (file) {
        const reader = new FileReader()
        previewDefaultText.style.display = 'none'
        previewImage.style.display = 'block'
        reader.addEventListener('load', function() {
            imgSrc = this.result
            previewImage.setAttribute('src', this.result)
        })
        reader.readAsDataURL(file)
    } else {
        previewDefaultText.style.display = null
        previewImage.style.display = null
        previewImage.setAttribute('src', '')
    }
    e.preventDefault()
    return false
})

const registerBtn = document.getElementById('register-btn')
registerBtn.onclick = function(e) {
    let gender
    for (let i = 0; i < genderS.length; i++) {
        if (genderS[i].checked) gender = genderS[i].value
    }
    let hobby = hobbyS.options[hobbyS.selectedIndex].value
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
        dislikes: 0,
        pic: imgSrc
    }
    fetch(`/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json)
    }).then(function(response) {
        swal(`Hello ${name.value}!`, `You have successfully registered!`, "success")
            .then(() => location.href = '../index.html')
        console.log("Post sent to server: " + response)
    })
    e.preventDefault()
    return false
}