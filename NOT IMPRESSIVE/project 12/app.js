//
//
//
//
// Classes are declared here
//
//
//
//
// Event Listeners are declared here
window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

window.addEventListener("resize", maxifyCanvas);
//
//
//
//
// Functions are declared here
function maxifyCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function clearScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function animate() {
  requestAnimationFrame(animate);
  clearScreen();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(mouse.x, mouse.y);
  ctx.lineWidth = 2;
  ctx.stroke();

  console.log(mouse.x, mouse.y);
}
//
//
//
//
// code runs from here
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const mouse = { x: undefined, y: undefined };

maxifyCanvas();
animate();
