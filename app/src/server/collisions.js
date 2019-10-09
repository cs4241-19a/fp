const Constants = require('../shared/constants');


class Collisions {
  constructor() {}

  // Returns an array of bullets to be destroyed.
  applyCollisions(players, bullets) {
	  const destroyedBullets = [];
	  for (let i = 0; i < bullets.length; i++) {
		 // Look for a player (who didn't create the bullet) to collide each bullet with.
		 // As soon as we find one, break out of the loop to prevent double counting a bullet.
		 for (let j = 0; j < players.length; j++) {
        const bullet = bullets[i];
        const player = players[j];
        if (
			  bullet.parentID !== player.id &&
			  player.distanceTo(bullet) <= Constants.PLAYER_RADIUS + Constants.BULLET_RADIUS &&
        bullet.map_number == player.map_number
        ) {
			  destroyedBullets.push(bullet);
			  player.takeBulletDamage();
			  break;
        }
		 }
	  }
	  return destroyedBullets;
  }

  // Returns an array of bullets to be destroyed.
  applyObstacleCollisions(obstacles, bullets) {
	  const destroyedBullets = [];
	  for (let i = 0; i < bullets.length; i++) {
		 // Look for a player (who didn't create the bullet) to collide each bullet with.
		 // As soon as we find one, break out of the loop to prevent double counting a bullet.
		 for (let j = 0; j < obstacles.length; j++) {
        const bullet = bullets[i];
        const obstacle = obstacles[j];
        if (obstacle.contains(bullet) && obstacle.map_number == bullet.map_number) {
			    destroyedBullets.push(bullet);
			    break;
        }
		 }
	  }
	  return destroyedBullets;
  }
}

module.exports = Collisions;
