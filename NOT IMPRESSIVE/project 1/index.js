const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(cvs) {
    cvs.beginPath();
    cvs.strokeRect(this.x, this.y, this.width, this.height);
    cvs.stroke();
  }

  update(cvs) {
    this.draw(cvs);
  }
}
const rectObj = new Rectangle(20, 20, 50, 50);
assignChangesToRectObj(rectObj);

function animate() {
  requestAnimationFrame(animate);
  clearCanvas(ctx);

  rectObj.update(ctx);
}

makeCanvasSizeOfWindow(canvas);
animate();

// ----------------------------------------------------------

function makeCanvasSizeOfWindow(cvs) {
  cvs.width = window.innerWidth;
  cvs.height = window.innerHeight;
}

function clearCanvas(cvs) {
  cvs.clearRect(0, 0, window.innerWidth, window.innerHeight);
}

// ---------------------------------------------------------------

window.addEventListener("resize", function () {
  makeCanvasSizeOfWindow(canvas);
});

function assignChangesToRectObj(rectObj) {
  const valueList = document.querySelectorAll(".value");

  valueList.forEach((element) => {
    element.addEventListener("input", function () {
      rectObj[element.id] = element.value;
    });
  });
}
