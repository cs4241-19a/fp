const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const config = require('./config/config');
const uuid = require('uuid');

const { User } = require('./models/models')

router.get("/register.html", function (req, res) {
    res.render("register", {
        title: 'Register Page',
        isLogin: req.session.isLogin,
        username: req.session.username
    });
});

/**
 * check whether or not the email is duplicated
 */
router.post('/emailCheck.json', async function (req, res) {
    let __checkEmail = req.body.email;
    console.log('checked email: {}', __checkEmail);
    let __result = {
        code: 0,
        msg: 'ok',
        title: '',
        info: ''
    }
    let __rs = await User.find({
        email: __checkEmail
    });
    console.log('query result: ', __rs);
    // the condition where the email has existed
    if (__rs.length > 0) {
        __result.code = -1;
        __result.msg = "The email has existed!";
        res.json(__result);
    } else {
        // the condition where the input email does not exist
        /**
         * validate successfully, and store the user email into database
         */
        // generate the activate code
        let __activateCode = uuid.v1().split('-').join('');
        let __insertedRs = await User.insertMany([
            {
                username: uuid.v1().split('-').join(''),
                email: __checkEmail,
                activateCode: __activateCode
            }
        ]);
        if (__insertedRs.length > 0) {
            let transporter = nodemailer.createTransport(config.emailConfig);
            const sendHtml = `<div>
            <div><h2>please click this link to activate you account</h2>
            <a href="${config.baseName}/forum/account/activate.html?activateCode=${__activateCode}&email=${__checkEmail}">activate</a></div>
            </div>`;

            const mailOptions = {
                // the sender address
                from: config.emailConfig.auth.user,
                // receiver email address
                to: __checkEmail,
                // email subject
                subject: 'Successfully, you have register a account!',
                html: sendHtml
            };
            // send email and invoke the callback function
            await transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('error: ', error);
                } else {
                    req.session.activateCode = __activateCode;
                    req.session.activateEmail = __checkEmail;
                    __result.title = "Successfully!";
                    __result.info = "Please go to you email to activate your account!";
                    res.json(__result);
                }
                console.log('Message sent: ' + info);
            });
        }
    }
});

/**
 * redirect to the activate page
 */
router.get('/account/activate.html', async function (req, res) {
    let __activateCode = req.query.activateCode;
    let __email = req.query.email;

    let __rs = {
        title: 'Activate Page',
        isLogin: req.session.isLogin,
        username: req.session.username,
        tip: '',
        msg: '',
        code: -1
    };

    // firstly, validate whether the user exists
    let __user = await User.find({
        email: __email,
        activateCode: __activateCode
    });
    if (__user.length <= 0) {
        __rs.tip = 'Sorry!';
        __rs.msg = 'Your email does not exist.';
        res.render('activate', __rs);
    } else {
        // console.log('activate code: ', __activateCode);
        // console.log('activate email: ', __email);
        let user = __user[0];
        if (user.isActivated) {
            __rs.tip = 'Sorry!';
            __rs.msg = 'Your email has been activated.';
            res.render('activate', __rs);
        } else {
            __rs.code = 0;
            req.session.isLogin = true;
            req.session.username = user.username;
            // activate successfully and modify the activate status of user
            try {
                await User.findByIdAndUpdate({
                    _id: user._id,
                }, {
                    $set: { isActivated: true }
                });
            } catch (err) {
                console.log('error...');
            }
            res.redirect('/forum/backend/user/settings.html');
        }
    }
});

module.exports = router;