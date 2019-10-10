const express = require('express');
const router = express.Router();
const { User } = require('./models/models');


router.get('/login.html', function (req, res) {
    res.render('login', {
        title: 'Login Page',
        errorMsg: undefined
    })
});

router.post('/loginValidate.html', async function (req, res) {
    let __loginInfo = {
        email: req.body.email,
        password: req.body.password
    }
    let __rs = await User.find(__loginInfo);
    console.log(__rs);
    if (__rs.length > 0) {
        let __user = __rs[0]
        if (__user.isActivated) {
            req.session.username = __user.username;
            req.session.isLogin = true;
            req.session.email = __user.email;
            req.session.userId = __user._id;
            res.redirect('/forum/index.html');
        } else {
            res.render('login', {
                title: 'Login Page',
                errorMsg: 'The account has not been activated!'
            });
        }
    } else {
        res.render('login', {
            title: 'Login Page',
            errorMsg: 'Your username or password is wrong!'
        });
    }
    // console.log(req.body);
});

module.exports = router;