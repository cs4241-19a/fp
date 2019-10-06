function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const createMap = function(height, width, tileSetLength, tileSize){
  const heightCount = height/tileSize;
  const widthCount = width/tileSize;
  let map = new Array(heightCount);
  for(let i =0; i<heightCount; i++){
    map[i] = new Array(widthCount);
    for(let j=0; j<widthCount; j++){
      //generate a random number for the tile
      map[i][j] = getRandomInt(tileSetLength);
    }
  }
  return map;
};

export default createMap;