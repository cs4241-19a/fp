addLoadEvent(() => {
    const scores = $("#scoreModal");
    scores.on("show.bs.modal", fillScores);
    initGameDD();
});

/**
 *
 */
function fillScores() {
    // get drop down value
    // get game scores
    // fill game scores
}

/**
 * Get the game scores for the given game.
 * @author: jk
 * @param {string} gameId
 */
function getGameScores(gameId) {

}

/**
 * Add the game names and id's to both the user and global the game dropdown.
 * @author: jk
 */
function initGameDD() {

}