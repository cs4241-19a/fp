const ObjectClass = require('./object');
const Bullet = require('./bullet');
const Constants = require('../shared/constants');


class Player extends ObjectClass {
  constructor(id, username, x, y, obstacle_list, image, map_number) {
    super(id, x, y, 0, Constants.PLAYER_SPEED, map_number);
    this.username = username;
    this.hp = Constants.PLAYER_MAX_HP;
    this.fireCooldown = 0;
    this.score = 0;
	 this.drive = 0; // 1 = foward, -1 = reverse
	 this.shoot = 0; // 0 = don't shoot, 1 = shoot
	 this.obstacles = obstacle_list;
	 this.oldX = x;
	 this.oldY = y;
	 this.image = image;
  }

  // Returns a newly created bullet, or null.
  update(dt) {
    let { speed } = this;

	 // Fire a bullet, if needed
    if (this.shoot === 1) {
		 speed *= 0.5;
		 this.fireCooldown -= dt;
		 if (this.fireCooldown <= 0) {
        this.fireCooldown += Constants.PLAYER_FIRE_COOLDOWN;
        return new Bullet(this.id, this.x, this.y, this.direction, this.map_number);
		 }
	 }

	 if (this.drive === 1) {
		 this.x += dt * speed * Math.sin(this.direction);
		 this.y -= dt * speed * Math.cos(this.direction);
	 }
	 if (this.drive === -1) {
      this.x += -dt * 1.15 * speed * Math.sin(this.direction);
      this.y -= -dt * 1.15 * speed * Math.cos(this.direction);
	 }

    // Make sure the player stays in bounds
    this.x = Math.max(25, Math.min(Constants.MAP_SIZE_X - 25, this.x));
    this.y = Math.max(25, Math.min(Constants.MAP_SIZE_Y - 25, this.y));

	 this.avoidObsticles();


    return null;
  }

  avoidObsticles() {
	 let overlap = false;
	 for (let j = 0; j < this.obstacles.length; j++) {
      if (this.noOverlap(this.obstacles[j])) {
        overlap = true;
      }
	 }

	 if (overlap) {
      this.x = this.oldX;
      this.y = this.oldY;
	 } else {
      this.oldX = this.x;
      this.oldY = this.y;
	 }
  }

  noOverlap(obstacle) {
    if ((obstacle.containsPoint(this.x + 15, this.y) ||
			obstacle.containsPoint(this.x - 15, this.y) ||
			obstacle.containsPoint(this.x, this.y + 15) ||
			obstacle.containsPoint(this.x, this.y - 15)) && 
      obstacle.map_number == this.map_number) {
      return true;
    }
    return false;
  }


  setDirection(dir) {
    this.direction = dir.direction;
    this.drive = dir.drive;
    this.shoot = dir.shoot;
  }

  takeBulletDamage() {
    this.hp -= Constants.BULLET_DAMAGE;
  }

  onDealtDamage() {
    this.score += Constants.SCORE_BULLET_HIT;
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      drive: this.drive,
      direction: this.direction,
      shoot: this.shoot,
      hp: this.hp,
      image: this.image,
    };
  }
}

module.exports = Player;
