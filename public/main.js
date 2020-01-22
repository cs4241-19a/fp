document.getElementById('loginBtn').onclick = function(e) {
    fetch('/login', {
            method: 'POST',
            body: JSON.stringify({
                username: document.querySelector('#username').value,
                password: document.querySelector('#password').value
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            location.href = 'table/table.html'
        })
        .catch(err => {
            console.log(err)
            document.getElementById('hint').innerHTML = 'Invalid Input'
        })
    e.preventDefault();
    return false;
};

document.getElementById('registerBtn').onclick = function(e) {
    location.href = 'register/register.html';
    e.preventDefault();
    return false;
};