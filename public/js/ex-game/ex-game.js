function validate(e){
    var theEvent = e || window.e;
    // Handle key press
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

function giveScore(){
    let score = document.getElementById('submitvalue').value;
    const scoreModel = $("#gameScoreFormModal");
    attachHeading(`Score: ${score} points`);
    //scoreModel.on("hidden.bs.modal", load);
    attachSubmit({score: score}, () => {
        scoreModel.modal("hide");
    });
    scoreModel.modal("show");  // user jQuery to show the modal
}