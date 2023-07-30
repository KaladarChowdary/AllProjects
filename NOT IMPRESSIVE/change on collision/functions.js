// Make sure everything is explicit

// Clear entire canvas
function clearCanvas(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Make canvas of the size windows
function maxifyCanvas(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Return distence between two points
function findDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Return random numbers from given range
function randInRange(min, max) {
  return min + Math.random() * (max - min);
}

export { clearCanvas, maxifyCanvas, findDistance, randInRange };
