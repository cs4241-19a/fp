const deleteRow = async function(cell, cb) {
    // alert asking to confirm changes (yes/no)
    let data = cell._row.data;
    let id = data.id;
    console.log(id);
    const response = await fetch('/api/deleteBudget', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id}),
    });
    const body = await response;
    if (body) {
        cb(true);
    } else {
        console.log('could not delete');
    }
}

const modifyRow = async function(cell, cb){
    // alert asking to confirm change (yes/no)
    let data = cell._row.data;

    console.log(data);
    const response = await fetch('/api/editBudget', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const body = await response;
    if (body) {
        cb(true);
    } else {
        console.log('could not edit');
    }
}

// download csv
const dnCSV = function(table) {
    var dnCSV = document.getElementById("dnCSV")
    dnCSV.addEventListener("click", function download() {
    table.download("csv", "expense_report.csv");
    })
}

// download json
const dnJSON = function(table) {
    var dnJSON = document.getElementById("dnJSON")
    dnJSON.addEventListener("click", function download() {
    table.download("json", "expense_report.json");
    })
}

// download pdf
const dnPDF = function(table) {
    var dnPDF = document.getElementById("dnPDF")
    dnPDF.addEventListener("click", function download() {
        table.download("pdf", "expense_report.pdf", {
            orientation:"portrait", //set page orientation to portrait
            autoTable:function(doc){
                //doc - the jsPDF document object
        
                //add some text to the top left corner of the PDF
                doc.text("SOME TEXT", 1, 1);
        
                //return the autoTable config options object
                return {
                    styles: {
                    },
                };
            },
        });
    })  
}

// download xslx
const dnXLSX = function(table) {
    var dnXSLX = document.getElementById("dnXLSX")
    dnXSLX.addEventListener("click", function download() {
    table.download("xlsx", "expense_report.xlsx", {sheetName:"MyExpenses"});
    })
}

export {deleteRow, modifyRow, dnCSV, dnJSON, dnPDF, dnXLSX}