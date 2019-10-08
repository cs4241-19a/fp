window.onload = async function() {
    const button = document.querySelector('.modify');
    button.onclick = modifyForm;
    const button2 = document.querySelector('.submit');
    button2.onclick = submitForm;

    
}

const modifyForm = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault();
    
    var jobBox = document.getElementById("job");
    var jobCode = jobBox.options[jobBox.selectedIndex].value;
    var day = document.querySelector('input[name="day"]:checked').value;
    
    const job = day+jobCode;
    //console.log(job);
    var mod =  document.getElementById(job).innerHTML;
    
    
}

const submitForm = async function( e ){
    e.preventDefault();

try{
    const response = await fetch('/users');
    data = await response.json();

    console.log(data);
    
} catch(error){
    console.log("oopsie error");
     console.log(error);
     }
}
