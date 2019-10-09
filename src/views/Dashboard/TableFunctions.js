const deleteRow = function(cell) {
    // alert asking to confirm changes (yes/no)
    // code me      
}

const modifyRow = function(cell){
    // alert asking to confirm change (yes/no)
    // send modification to server
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