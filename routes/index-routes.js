const pull = require("./src/pullGameData");
const express = require("express");
const indexRouter = express.Router();

indexRouter.get("/", async function(req, res) {
    const gameData = await pull.getGames();
    const dropdownData = pull.getGameDropdownData(gameData);
    res.render("index", {gameData: gameData, scoresGameDropdownData: dropdownData});
});


module.exports = indexRouter;
