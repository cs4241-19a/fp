const express = require('express');
const router = express.Router();

router.get('/logout.html', function(req, res) {
    req.session.isLogin = false;
    req.session.username = undefined;
    res.redirect('/forum/index.html');
});

module.exports=router;