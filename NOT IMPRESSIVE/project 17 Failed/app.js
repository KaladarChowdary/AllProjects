const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function (evt) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  animate();
});

// rectangle class
class Rect {
  constructor(x, y, height, width, color) {
    this.x = x;
    this.y = y;

    this.height = height;
    this.width = width;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.draw();
  }
}

// CODE THAT FILLS CANVAS WITH APPROPRIATE RECTANGLES
let objArr = [];

let width = 15;
let height = 15;
let gap = 1;
let targetArr = [];

for (let i = 0; i + height <= canvas.height; i += gap) {
  for (let j = 0; j + width <= canvas.width; j += gap) {
    targetArr.push([j, i]);

    j += width;
  }
  i += height;
}

let index = 0;

// GIVEN TWO SETS OF POINTS, CHANGE ONE POINT TO THE OTHER

// Converts x,y into x1 and y1: 1 pixel at a time
// Only integers both of them
// function genPath(x, y, x1, y1, step = 1) {
//   x = Math.floor(x);
//   y = Math.floor(y);
//   x1 = Math.floor(x1);
//   y1 = Math.floor(y1);
//   step = Math.abs(step);
//   let pArr = [];

//   // Add or subtract step until x, y equals to x1 and y1
//   pArr.push([x, y]);
//   while (x != x1 || y != y1) {
//     if (x < x1) {
//       x += step;
//     } else if (x > x1) {
//       x -= step;
//     }

//     if (y < y1) {
//       y += step;
//     } else if (y > y1) {
//       y -= step;
//     }

//     pArr.push([x, y]);
//     // console.log(x, y);
//   }
//   pArr.push([x, y]);

//   return pArr;
// }

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (!(index >= targetArr.length)) {
    objArr.push(
      new Rect(targetArr[index][0], targetArr[index][1], width, height, "green")
    );
    index++;
    objArr.push(
      new Rect(targetArr[index][0], targetArr[index][1], width, height, "green")
    );
    index++;
  }

  objArr.forEach((rect) => {
    rect.update();
  });
}

animate();
