window.onload = async function(){
    console.log("hi");
    const names = [];
    try{
        const response = await fetch('/users');
        data = await response.json();
        data.forEach(function(result){ names.push(result.name); })
    } 
    catch(error){
         console.log(error);
    }
    
    if(location.href.split("/").slice(-1)[0] === "admin"){
        autocomplete(document.getElementById("name"), names);
    }
    
    fillBoard();
}


const fillBoard = async function(){
    try{ 
        const jobR = await this.fetch('/jobList');
        jobs = await jobR.json();

        jobs.forEach(function(job){
            document.getElementById(job.jobCode).cells[1].innerHTML = job.name;
        });
    }
    catch(error){
         console.log(error);
    }
}
