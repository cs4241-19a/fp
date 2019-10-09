const shortid = require('shortid');
const ObjectClass = require('./object');
const Constants = require('../shared/constants');

class Bullet extends ObjectClass {
  constructor(parentID, x, y, dir, map_number) {
    super(shortid(), x, y, dir, Constants.BULLET_SPEED, map_number);
    this.parentID = parentID;
  }

  // Returns true if the bullet should be destroyed
  update(dt) {
	 this.x += dt * this.speed * Math.sin(this.direction);
    this.y -= dt * this.speed * Math.cos(this.direction);
    return this.x < 0 || this.x > Constants.MAP_SIZE_X || this.y < 0 || this.y > Constants.MAP_SIZE_Y;
  }
}

module.exports = Bullet;
