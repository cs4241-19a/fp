const modifyForm = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault();
    
    var jobBox = document.getElementById("job");
    var jobCode = jobBox.options[jobBox.selectedIndex].value;
    var day = document.querySelector('input[name="day"]:checked').value;
    
    const job = day+jobCode;
    var mod =  document.getElementById(job).innerHTML;
    
    
}

const submitForm = async function( e ){
    e.preventDefault();

    console.log(data);

}

function forceUpdate() {
    fetch('/forceUpdate', {
        method: 'POST',
        credentials: 'include'
    })
    .then(res => console.log(res));
}
