window.addEventListener("click", function (evt) {
  console.log(`clicked at ${evt.pageX},${evt.pageY}`);
});

window.addEventListener("contextmenu", function (evt) {
  console.log("right click");
});

window.addEventListener("dblclick", function () {
  console.log("Double Click");
});

window.addEventListener("mousedown", function (evt) {
  console.log("mouse is down ");
});

let canvas = document.querySelector("canvas");
canvas.addEventListener("mouseenter", function (evt) {
  console.log("mouse is entered");
});

canvas.addEventListener("mouseleave", function (evt) {
  console.log("mouse is left");
});

canvas.addEventListener("mousemove", function (evt) {
  console.log("mouse is moving");
});

canvas.addEventListener("mouseover", function (evt) {
  console.log("mouse came");
});

canvas.addEventListener("mouseout", function (evt) {
  console.log("mouse left");
});

window.addEventListener("mouseup", function (evt) {
  console.log("mouseup");
});

window.addEventListener("wheel", function (evt) {
  console.log("scrolling with two fingers");
});
