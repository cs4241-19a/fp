const CONSTANTS={
  // display settings
  WIDTH: 800,
  HEIGHT: 800,
  SETUP_AREA_HEIGHT: 100,
  TILE_SIZE: 10,
  //states and resource constants
  INIT_RESOURCES: 20,
  STATES : {
    buy: 'buy',
    setup: 'setup',
    fight: 'fight',
    gameOver: 'gameOver'
  },
  TURN:{
    p1: 0,
    p2: 1,
  },
  P1: 1,
  P2: 2
};
//object.freeze incurs a performance penalty but its nice for
//making sure the values don't change.
Object.freeze(CONSTANTS);
export default CONSTANTS;