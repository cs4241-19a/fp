addLoadEvent(() => {
    const scores = $("#scoreModal");
    scores.on("show.bs.modal", () => fillScores(CURGAME));
});

/**
 *
 */
async function fillScores(game) {
    if (!game.gameId) {  // get game info off first game in dropdown
        const dataSet = document.getElementById("scoreGameDD").firstElementChild.dataset;
        game = {gameId: dataSet.gameId, name: dataSet.name}
    }
    const context = {scoresData: await getScores(game.gameId)};
    console.log(context);
    const source = document.getElementById("scoresBodyTemplate").innerHTML;
    const template = Handlebars.compile(source);
    document.getElementById("userScores").innerHTML = template(context);
    document.getElementById("globalScores").innerHTML = template(context);
}

async function getScores(gameId) {
    const url = `/data/games/${gameId}/scores`;
    const request = new Request(url, {
        method: "GET",
    });

    return fetch(request)
        .then((resp) => resp.json())
        .then(function( arr ) {
            // do something with the response
            return arr;
        })
        .catch(function (error) {
            console.log( error );
        });
}

async function onGameChange(elm) {
    fillScores({gameId: elm.dataset.gameId, name: elm.dataset.name});
}