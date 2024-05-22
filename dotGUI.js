const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;
let canvasWidth;
let canvasHeight;
let particles;
/**
  컴퓨터가 1px을 표현할때 dpr을 사용한다.
  dpr은 device pixel ratio의 약자로, 디바이스의 화면에 표시되는 픽셀의 개수를 의미합니다.
  레티나 디스플레이와 같이 고해상도 화면을 가진 디바이스에서는 1px을 표현하기 위해 여러 개의 실제 픽셀을 사용합니다.
  dpr을 아는방법은 window.devicePixelRatio를 사용하면 된다.
 */

function init() {
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";

  const TOTAL = canvasWidth / 10;

  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;

  ctx.scale(dpr, dpr);
  particles = [];
  for (let i = 0; i < TOTAL; i++) {
    const x = randomNumBtw(0, canvas.width);
    const y = randomNumBtw(0, canvas.height);
    const radius = randomNumBtw(100, 120);
    const vy = randomNumBtw(1, 5);
    particles.push(new Particle(x, y, radius, vy));
  }
}

const feGaussianBlur = document.querySelector("feGaussianBlur");
const feColorMatrix = document.querySelector("feColorMatrix");
const controls = new (function () {
  this.blurValue = 10;
  this.alphaChannel = 40;
  this.alphaOffset = -23;
  this.acc = 1.0;
})();

let gui = new dat.GUI();

const f1 = gui.addFolder("Gooey Effect");
f1.open();
f1.add(controls, "blurValue", 0, 100).onChange((value) => {
  feGaussianBlur.setAttribute("stdDeviation", value);
});
f1.add(controls, "alphaChannel", 0, 200).onChange((value) => {
  feColorMatrix.setAttribute(
    "values",
    `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${value} ${controls.alphaOffset}`
  );
});
f1.add(controls, "alphaOffset", -40, 40).onChange((value) => {
  feColorMatrix.setAttribute(
    "values",
    `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controls.alphaChannel} ${value}`
  );
});
const f2 = gui.addFolder("Particle");
f2.open();
f2.add(controls, "acc", 1, 1.5, 0.01).onChange((value) => {
  particles.forEach((particle) => {
    particle.acc = value;
  });
});

class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
    this.acc = 1.0;
  }
  update() {
    this.vy *= this.acc;
    this.y += this.vy;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  }
}

const randomNumBtw = (min, max) => Math.random() * (max - min) + min;

const interval = 1000 / 60;
let now;
let delta;
let then = Date.now();

function animate() {
  window.requestAnimationFrame(animate);
  now = Date.now();
  delta = now - then;
  if (delta < interval) {
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
    if (particle.y > canvas.height + particle.radius) {
      particle.y = -particle.radius;
      particle.x = randomNumBtw(0, canvas.width);
      particle.vy = randomNumBtw(1, 5);
      particle.radius = randomNumBtw(20, 120);
    }
  });
  then = now - (delta % interval);
}
window.addEventListener("load", () => {
  init();
  animate();
});
window.addEventListener("resize", () => {
  init();
});
