// Make sure everything is explicit

// SIMPLE RECTANGLE CLASS
class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx) {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

  update(ctx) {
    this.draw(cvs);
  }
}

// Circle class, lot of explicit features to modify
class Circle {
  constructor(x, y, r, dx = 0, dy = 0, color = "green") {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.fill();
  }

  //   Updating x and y with velocity and drawing and changing velocity when collision happens
  update() {
    this.draw();

    this.updateXandY();

    // Change x velocity when horizontal collision
    if (this.HCollision()) {
      this.dx = -this.dx;
    }
    // Change y velocity when verticle collision
    if (this.UnderCanvas()) {
      this.dy = -Math.abs(this.dy);
    }
    if (this.AboveCanvas()) {
      this.dy = Math.abs(this.dy);
    }
  }

  // Update with velocities
  updateXandY() {
    this.x += this.dx;
    this.y += this.dy;
  }

  UnderCanvas() {
    return this.y + this.r >= canvas.height;
  }

  AboveCanvas() {
    return this.y - this.r <= 0;
  }

  // Detect Horizontal collision with canvas
  HCollision() {
    return this.x + this.r >= canvas.width || this.x - this.r <= 0;
  }
  // Detect verticle collision with canvas
  VCollision() {
    return this.y + this.r >= canvas.height || this.y - this.r <= 0;
  }
}
