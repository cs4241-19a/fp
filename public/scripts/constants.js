const CONSTANTS={
  // display settings
  WIDTH: 800,
  HEIGHT: 800,
  SETUP_AREA_HEIGHT: 100,
  TILE_SIZE: 10,
  SPRITE_SIZE: 75,
  //setup state constants
  PLACEMENT_TEXTURE: 'placement',
  //states and resource constants
  INIT_RESOURCES: 20,
  STATES : {
    buy: 'buy',
    setup: 'setup',
    fight: 'fight',
    gameOver: 'gameOver'
  },
  P1: 1,
  P2: 2,
  // make sure the player, and the turn values are the same here
  TURN:{
    p1: 1,
    p2: 2
  },
  MAX_PIECES: 6
};
//object.freeze incurs a performance penalty but its nice for
//making sure the values don't change.
Object.freeze(CONSTANTS);
export default CONSTANTS;