const pull = require("./src/pullData");
const express = require("express");
const indexRouter = express.Router();

indexRouter.get("/", async function(req, res) {
    const gameData = await pull.getGames();
    const dropdownData = pull.getGameDropdownData(gameData);
    res.render("index", {gameData: gameData, scoresGameDropdownData: dropdownData});
});

indexRouter.get('/users/:uid', async function(req, res) {
    const userData = await pull.getUserData(req.params.uid);
    const context = {
        userData: [
            'Name: ' + userData.name,
            'Email: ' + userData.email,
            'Member Since: ' + userData.memberSince,
        ]
    };
    res.render('user', context);
});

module.exports = indexRouter;