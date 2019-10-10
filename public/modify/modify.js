window.onload = function() {
    let fizzyText = new FizzyText('Modify Profile')
}

document.getElementById('cancel-btn').onclick = function(e) {
    location.href = '../table/table.html'
    e.preventDefault()
    return false
}

document.getElementById('delete-btn').onclick = function(e) {
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

fetch('/getYou', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
}).then(function(response) {
    return response.json()
}).then(function(you) {
    const name = document.querySelector('#input-nickname')
    const age = document.querySelector('#input-age')
    const whatsUp = document.querySelector('#input-whatsup')
    const genderS = document.getElementsByName('customRadio')
    const hobbyS = document.getElementById('select-hobby')
    const salary = document.querySelector('#input-salary')
    const loc = document.querySelector('#input-location')
    const selfIntro = document.querySelector('#input-selfintro')
    const img = document.querySelector('img')

    name.defaultValue = you.name
    age.defaultValue = you.age
    if (you.whatsUp) whatsUp.defaultValue = you.whatsUp
    for (let i = 0; i < genderS.length; i++) {
        if (genderS[i].value === you.gender) {
            genderS[i].checked = true
            break
        }
    }
    for (let j = 0; j < hobbyS.options.length; j++) {
        if (hobbyS.options[j].value === you.hobby) {
            hobbyS.selectedIndex = j
            break
        }
    }
    if (you.salary) salary.defaultValue = you.salary
    if (you.location) loc.defaultValue = you.location
    if (you.selfIntro) selfIntro.defaultValue = you.selfIntro

    let imgSrc
    const previewContainer = document.getElementById('imagePreview')
    const previewImage = previewContainer.querySelector('.image-preview__image')
    const previewDefaultText = previewContainer.querySelector('.image-preview__default-text')
    if (you.pic) {
        previewDefaultText.style.display = 'none'
        previewImage.style.display = 'block'
        imgSrc = you.pic
        previewImage.setAttribute('src', you.pic)
    }
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

    document.getElementById('update-btn').onclick = function(e) {
        let gender
        for (let i = 0; i < genderS.length; i++) {
            if (genderS[i].checked) gender = genderS[i].value
        }
        let hobby = hobbyS.options[hobbyS.selectedIndex].value
        const json = {
            name: name.value,
            age: parseInt(age.value),
            whatsUp: whatsUp.value,
            gender: gender,
            hobby: hobby,
            pic: imgSrc,
            salary: salary.value,
            location: loc.value,
            selfIntro: selfIntro.value
        }
        fetch(`/updateInfo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(json)
        }).then(function(response) {
            swal(`Hello ${name.value}!`, `You have successfully updated your profile!`, "success")
                .then(() => location.href = '../profile/profile.html')
            console.log("Post sent to server: " + response);
        })
        e.preventDefault()
        return false
    }
})