const CONSTANTS={
  WIDTH: 800,
  HEIGHT: 800,
  SETUP_AREA_HEIGHT: 100,
  TILE_SIZE: 10
};
//object.freeze incurs a performance penalty but its nice for
//making sure the values don't change.
Object.freeze(CONSTANTS);
export default CONSTANTS;