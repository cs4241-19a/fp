const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const config = require('../config/config');
const { User } = require('../models/models')

const uploadedPath = config.rootUploadedPath;

/**
 * user information show
 */
router.get('/settings.html', async function (req, res) {
    console.log('user name: ', req.session.username);
    console.log('is login: ', req.session.isLogin)
    let __userInfo = await User.find({
        username: req.session.username
    }, {
        password: 0
    });
    console.log('user infor: ', __userInfo[0]);
    res.render('backend/userSettings', {
        title: 'User Information Settings',
        isLogin: req.session.isLogin,
        username: req.session.username,
        email: req.session.email,
        userId: req.session.userId,
        userInfo: __userInfo[0],
        tips: ''
    });
});

/**
 * user information modification
 */
router.post('/username/modify.html', async function (req, res) {
    let __info = req.body;
    console.log('modification information: ', __info);
    // judge whether the username exist
    let __existedUser = await User.find({
        username: __info.username
    });
    if (__existedUser.length > 0) {
        res.render('backend/userSettings', {
            title: 'User Settings Page',
            isLogin: req.session.isLogin,
            username: req.session.username,
            email: req.session.email,
            userId: req.session.userId,
            userInfo: __existedUser[0],
            tips: 'The user name has existed!'
        });
    } else {
        await User.findByIdAndUpdate({
            _id: __info._id
        }, {
            $set: { username: __info.username }
        });
        console.log('updated result: ', __info);
        req.session.isLogin = true;
        req.session.username = __info.username;
        req.session.email = __info.email;
        req.session.userId = __info._id;
        res.redirect("/forum/backend/user/settings.html");
    }
});

/**
 * redirect to the page of modifying password
 */
router.get('/password.html', async function (req, res) {
    let __user = await User.find({
        username: req.session.username
    });
    res.render('backend/userPassword', {
        title: 'User Password Modification',
        isLogin: req.session.isLogin,
        username: req.session.username,
        email: req.session.email,
        userId: req.session.userId
    });
});

/**
 * modify user password
 */
router.post('/password/modify.json', async function (req, res) {
    let __updatedInfo = req.body;
    await User.findByIdAndUpdate({
        _id: __updatedInfo._id
    }, {
        $set: {password: __updatedInfo.password}
    });
    res.json({
        code: 0,
        msg: 'ok'
    });
});

/**
 * redirect to the page of modify avatar
 */
router.get('/avatar.html', async function (req, res) {
    // query the avatar of the current user
    let __user = await User.find({
        username: req.session.username
    }, {
        password: 0
    });
    req.session.email = __user[0].email;
    res.render('backend/userAvatar', {
        title: 'User Avatar Modification',
        isLogin: req.session.isLogin,
        username: req.session.username,
        email: req.session.email,
        userId: req.session.userId,
        userInfo: __user[0],
        errorTips: undefined
    });
});

/**
 * create file folder if the file folder accessing does not exist
 * @param {*} filePath 
 */
const createFileFolder = function (filePath) {
    try {
        fs.accessSync(filePath);
    } catch (e) {
        fs.mkdirSync(filePath);
    }
}

/**
 * get the extension of the file name
 * @param {*} filename 
 */
const getExt = function (filename) {
    let ext = "";
    if (filename) {
        let __arr = filename.split(".");
        if (__arr && __arr.length > 0) {
            ext = __arr[__arr.length - 1];
        }
    }
    return ext;
}

/**
 * self-define the file store style
 */
const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        let __default = "default";
        let __email = req.session.email;
        if (__email) {
            __default = __email;
        }
        console.log('user email ', __email);

        __fileFoler = uploadedPath + __default;
        // create file folder if it does not exist
        createFileFolder(__fileFoler);
        cb(null, __fileFoler);
    },
    filename: function (req, file, cb) {
        console.log("request object: ", req.headers.origin);
        // define the file name in the format of filename-time
        cb(null, Date.now() + "." + getExt(file.originalname));
    }
});

/**
 * check whether or not the uploaded file is image format
 * @param {*} mineType 
 */
const imageJudge = function (mineType) {
    // record the file extension
    var extName = '';
    console.log("mine type: ", mineType)
    switch (mineType) {
        case 'image/pjpeg':
            extName = 'jpg';
            break;
        case 'image/jpeg':
            extName = 'jpg';
            break;
        case 'image/png':
            extName = 'png';
            break;
        case 'image/x-png':
            extName = 'png';
            break;
        case 'image/gif':
            extName = 'gif';
            break;
    }
    return extName.length > 0;
};

/**
 * filter the specificed image format
 * @param {*} req 
 * @param {*} file 
 * @param {*} cb 
 */
const fileFilter = function (req, file, cb) {
    // console.log("file: ", file);
    let _mimetype = file.mimetype;
    if (imageJudge(_mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
        cb(new Error('Not support this file type.', 403));
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });
const uploadedPhoto = upload.single('photo');

const updatePhotoPath = async function (condition, data) {
    let __rs = await User.findByIdAndUpdate(condition, data);
    // console.log('updated result: ', __rs);
    return __rs;
}

/**
 * user avatar modification
 * 
 * this process could totally be divided into following steps:
 * 1. Firstly, use the multer component to get the uploaded image;
 * 2. Then, update the photo path of the current user to the database;
 * 3. Finally, delete the original photo image of the current user
 * 
 */
router.post('/avatar/modify.html', async function (req, res) {
    let __users = await User.find({
        username: req.session.username
    });

    uploadedPhoto(req, res, function (err) {

        if (err) {
            // occur error when it upload image
            let __error = "Don't support this image type(Just support these type, such as: jpg、jpeg、png、gif)";
            console.log(err.message);
            console.log(err.code);
            res.render('backend/userAvatar', {
                title: 'User Avatar Modification Page',
                isLogin: req.session.isLogin,
                username: req.session.username,
                email: req.session.email,
                userId: req.session.userId,
                errorTips: __error,
                userInfo: __users[0]
            });
        } else {
            let __newPath = '/' + req.file.path;
            console.log('new file path: ', __newPath);
            console.log('user info: ', __users[0]);
            // get original photo path and remove the it expcet for the default.jpg
            let __deletePhotoPath = __users[0].photo.substring(1);
            console.log('deleted path: ', __deletePhotoPath, __deletePhotoPath.search(config.DEFAULT_PHOTO));
            if (fs.existsSync(__deletePhotoPath) && __deletePhotoPath.search(config.DEFAULT_PHOTO) <= 0) {
                if (!fs.statSync(__deletePhotoPath).isDirectory()) {
                    console.log('remove original photo file....');
                    fs.unlinkSync(__deletePhotoPath);
                }
            }

            // update the new photo path to database
            updatePhotoPath({
                _id: __users[0]._id
            }, {
                $set: { photo: __newPath }
            });

            // refresh current page
            res.redirect('/forum/backend/user/avatar.html');
        }
    });
});

module.exports = router;