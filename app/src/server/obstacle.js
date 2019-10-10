const Constants = require('../shared/constants');

class Obstacle {
  constructor(x, y, direction, width, height, map_number) {
	 this.x = x;
	 this.y = y;
	 this.direction = Math.PI / 180 * direction; // only between -90 thru 90 degrees
	 this.width = width;
	 this.height = height;
   this.map_number = map_number;
    
    // find the rotated lines
    this.top_opp_vertex_X = this.width * Math.cos(this.direction) + this.x;
    this.top_opp_vertex_Y = this.width * Math.sin(this.direction) + this.y;
    this.bottom_vertex_X = this.height * Math.cos(this.direction + Math.PI / 2) + this.x;
    this.bottom_vertex_Y = this.height * Math.sin(this.direction + Math.PI / 2) + this.y;
    this.bottom_opp_vertex_X = this.top_opp_vertex_X + this.height * Math.cos(this.direction + Math.PI / 2);
    this.bottom_opp_vertex_Y = this.top_opp_vertex_Y + this.height * Math.sin(this.direction + Math.PI / 2);

    this.top_slope = this.getSlope(this.x, this.y, this.top_opp_vertex_X, this.top_opp_vertex_Y);
    this.top_x_intercept = this.getIntercept(this.y, this.x, 1 / this.top_slope);
    this.top_y_intercept = this.getIntercept(this.x, this.y, this.top_slope);

    this.bottom_slope = this.getSlope(this.bottom_vertex_X, this.bottom_vertex_Y, this.bottom_opp_vertex_X, this.bottom_opp_vertex_Y);
    this.bottom_x_intercept = this.getIntercept(this.bottom_vertex_Y, this.bottom_vertex_X, 1 / this.bottom_slope);
    this.bottom_y_intercept = this.getIntercept(this.bottom_vertex_X, this.bottom_vertex_Y, this.bottom_slope);

    this.left_slope = this.getSlope(this.x, this.y, this.bottom_vertex_X, this.bottom_vertex_Y);
    this.left_x_intercept = this.getIntercept(this.y, this.x, 1 / this.left_slope);
    this.left_y_intercept = this.getIntercept(this.x, this.y, this.left_slope);

    this.right_slope = this.getSlope(this.top_opp_vertex_X, this.top_opp_vertex_Y, this.bottom_opp_vertex_X, this.bottom_opp_vertex_Y);
    this.right_x_intercept = this.getIntercept(this.top_opp_vertex_Y, this.top_opp_vertex_X, 1 / this.right_slope);
    this.right_y_intercept = this.getIntercept(this.top_opp_vertex_X, this.top_opp_vertex_Y, this.right_slope);
  }

  serializeForUpdate() {
    return {
      x: this.x,
      y: this.y,
      direction: this.direction,
      width: this.width,
      height: this.height,
      map_number: this.map_number,
    };
  }

  getSlope(x1, y1, x2, y2) {
	  return (y2 - y1) / (x2 - x1);
  }

  getIntercept(x, y, slope) {
    return y - x * slope;
  }

  contains(bullet) {
    let intersect = false;

    for (let dt = 0; dt < 10; dt++) {
      let bulletX = bullet.x;
      let bulletY = bullet.y;

      bulletX += dt * 0.00015 * bullet.speed * Math.sin(bullet.direction);
      bulletY -= dt * 0.00015 * bullet.speed * Math.cos(bullet.direction);


      const bullet_top_x_intercept = this.getIntercept(bulletY, bulletX, 1 / this.top_slope);
      const bullet_top_y_intercept = this.getIntercept(bulletX, bulletY, this.top_slope);
      const bullet_bottom_x_intercept = this.getIntercept(bulletY, bulletX, 1 / this.bottom_slope);
      const bullet_bottom_y_intercept = this.getIntercept(bulletX, bulletY, this.bottom_slope);
      const bullet_left_x_intercept = this.getIntercept(bulletY, bulletX, 1 / this.left_slope);
      const bullet_left_y_intercept = this.getIntercept(bulletX, bulletY, this.left_slope);
      const bullet_right_x_intercept = this.getIntercept(bulletY, bulletX, 1 / this.right_slope);
      const bullet_right_y_intercept = this.getIntercept(bulletX, bulletY, this.right_slope);


      if (this.direction > 0) {
        if ((bullet_top_y_intercept > this.top_y_intercept || bullet_top_x_intercept < this.top_x_intercept) &&
				(bullet_bottom_y_intercept < this.bottom_y_intercept || bullet_bottom_x_intercept > this.bottom_x_intercept) &&
				(bullet_left_y_intercept > this.left_y_intercept || bullet_left_x_intercept > this.left_x_intercept) &&
				(bullet_right_y_intercept < this.right_y_intercept || bullet_right_x_intercept < this.right_x_intercept)) {
          intersect = true;
        }
      } else if ((bullet_top_y_intercept > this.top_y_intercept || bullet_top_x_intercept > this.top_x_intercept) &&
				(bullet_bottom_y_intercept < this.bottom_y_intercept || bullet_bottom_x_intercept < this.bottom_x_intercept) &&
				(bullet_left_y_intercept < this.left_y_intercept || bullet_left_x_intercept > this.left_x_intercept) &&
				(bullet_right_y_intercept > this.right_y_intercept || bullet_right_x_intercept < this.right_x_intercept)) {
        intersect = true;
      }
    }

    return intersect;
  }


  containsPoint(x, y) {
    let intersect = false;

    const X = x;
    const Y = y;

    const top_x_intercept = this.getIntercept(Y, X, 1 / this.top_slope);
    const top_y_intercept = this.getIntercept(X, Y, this.top_slope);
    const bottom_x_intercept = this.getIntercept(Y, X, 1 / this.bottom_slope);
    const bottom_y_intercept = this.getIntercept(X, Y, this.bottom_slope);
    const left_x_intercept = this.getIntercept(Y, X, 1 / this.left_slope);
    const left_y_intercept = this.getIntercept(X, Y, this.left_slope);
    const right_x_intercept = this.getIntercept(Y, X, 1 / this.right_slope);
    const right_y_intercept = this.getIntercept(X, Y, this.right_slope);

    if (this.direction > 0) {
      if ((top_y_intercept > this.top_y_intercept || top_x_intercept < this.top_x_intercept) &&
			(bottom_y_intercept < this.bottom_y_intercept || bottom_x_intercept > this.bottom_x_intercept) &&
			(left_y_intercept > this.left_y_intercept || left_x_intercept > this.left_x_intercept) &&
			(right_y_intercept < this.right_y_intercept || right_x_intercept < this.right_x_intercept)) {
        intersect = true;
      }
    } else if ((top_y_intercept > this.top_y_intercept || top_x_intercept > this.top_x_intercept) &&
			(bottom_y_intercept < this.bottom_y_intercept || bottom_x_intercept < this.bottom_x_intercept) &&
			(left_y_intercept < this.left_y_intercept || left_x_intercept > this.left_x_intercept) &&
			(right_y_intercept > this.right_y_intercept || right_x_intercept < this.right_x_intercept)) {
      intersect = true;
    }

    return intersect;
  }
}

module.exports = Obstacle;
