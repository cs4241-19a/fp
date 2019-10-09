let temp = [];
var quiltDataForCrafting = [];
const newQuiltInformation = function(iItem) {  
  const quilt = document.getElementById("quilt");
  const block = document.getElementById("block");
  const patch = document.getElementById("patch");
  const paletteListStatement = document.getElementById("paletteListStatement");
  const paletteArray = document.getElementById("paletteArray");
  const blocksWideByHigh = document.getElementById("blocksWideByHigh");
  const quiltTypesArray = document.getElementById("quiltTypesArray");
  const oneRowPatch = document.getElementById("oneRowPatch");
  const twoRowPatch = document.getElementById("twoRowPatch");
  const threeRowPatch = document.getElementById("threeRowPatch");
  const fourRowPatch = document.getElementById("fourRowPatch");
  const leftLetter = document.getElementById("leftLetter");
  const rightLetter = document.getElementById("rightLetter");
  const singleLetter = document.getElementById("singleLetter");
  const setBluePalette = document.getElementById("setBluePalette");
  const setRedPalette = document.getElementById("setRedPalette");
  const setYellowPalette = document.getElementById("setYellowPalette");
  const setGreenPalette = document.getElementById("setGreenPalette");
  const palette = document.getElementById("palette");
  const outputText = document.getElementById("outputText");
  const origin = document.getElementById("origin");
  quilt.innerHTML = iItem[1];
block.innerHTML = iItem[2];
patch.innerHTML = iItem[3];
paletteListStatement.innerHTML = iItem[4];
paletteArray.innerHTML = iItem[5];
blocksWideByHigh.innerHTML = iItem[6];
quiltTypesArray.innerHTML = iItem[7];
oneRowPatch.innerHTML = iItem[8];
twoRowPatch.innerHTML = iItem[9];
threeRowPatch.innerHTML = iItem[10];
fourRowPatch.innerHTML = iItem[11];
leftLetter.innerHTML = iItem[12];
rightLetter.innerHTML = iItem[13];
singleLetter.innerHTML = iItem[14];
setBluePalette.innerHTML = iItem[15];
setRedPalette.innerHTML = iItem[16];
setYellowPalette.innerHTML = iItem[17];
setGreenPalette.innerHTML = iItem[18];
palette.innerHTML = iItem[19];
outputText.innerHTML = iItem[20];
origin.innerHTML = iItem[21];
};

const qGetAllData = function(e) {
  event.preventDefault();
  fetch("/qGetAll", {
    method: "GET"
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(responseJSON) {
      
      for (let i = 0; i < responseJSON.length; i++) {
        temp = [
          responseJSON[i]._id,
          responseJSON[i].quilt,
          responseJSON[i].block,
          responseJSON[i].patch,
          responseJSON[i].paletteListStatement,
          responseJSON[i].paletteArray,
          responseJSON[i].blocksWideByHigh,
          responseJSON[i].quiltTypesArray,
          responseJSON[i].oneRowPatch,
          responseJSON[i].twoRowPatch,
          responseJSON[i].threeRowPatch,
          responseJSON[i].fourRowPatch,
          responseJSON[i].leftLetter,
          responseJSON[i].rightLetter,
          responseJSON[i].singleLetter,
          responseJSON[i].setBluePalette,
          responseJSON[i].setRedPalette,
          responseJSON[i].setYellowPalette,
          responseJSON[i].setGreenPalette,
          responseJSON[i].palette,
          responseJSON[i].outputText,
          responseJSON[i].origin
        ];
        newQuiltInformation(temp);
      }
    });
};

function saveDynamicDataToFile() { 
  const qTemp = document.querySelector("#outputSample");
  const innerQTemp = qTemp.innerHTML;
  const breaksRemoved = innerQTemp.replace(", <br>", ", ");
  console.log("saving");
  // Create a Blob object to output your file.
  // Call saveAs from the /js/FileSaver.js script.
  var blob = new Blob([breaksRemoved], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "dynamic.txt");
}//end save dynamic data

window.onload = function() {
  const button6 = document.querySelector("#getQuiltData");
  //button.onclick = submitFunction();
const button7 = document.querySelector("#saveQuilt");  
  button6.onclick = qGetAllData;
  button7.onclick = saveDynamicDataToFile;
};
