const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
/**
  컴퓨터가 1px을 표현할때 dpr을 사용한다.
  dpr은 device pixel ratio의 약자로, 디바이스의 화면에 표시되는 픽셀의 개수를 의미합니다.
  레티나 디스플레이와 같이 고해상도 화면을 가진 디바이스에서는 1px을 표현하기 위해 여러 개의 실제 픽셀을 사용합니다.
  dpr을 아는방법은 window.devicePixelRatio를 사용하면 된다.
 */
const dpr = window.devicePixelRatio;
const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";
//MEMO: 캔버스의 크기를 지정해주지 않으면 기본값으로 300 * 150이 설정된다.

canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;

ctx.scale(dpr, dpr);

/**
 * 웹에서 애니메이션 동작원리:
 * 하나의 프레임을 그리는데 걸리는 시간을 프레임 속도라고 합니다. 프레임 속도는 초당 프레임 수(FPS)로 표시되며, 1초에 그려지는 프레임의 개수를 의미합니다. 예를 들어, 60FPS는 1초에 60개의 프레임을 그린다는 뜻입니다.
 * 프레임으로 다음 캐릭터의 위치를 계산하고 그리는 방법을 사용하면, 캐릭터가 부드럽게 움직이는 것처럼 보입니다. 이를 애니메이션(Animation)이라고 합니다.
 */

class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
    this.acc = 1.1;
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

const total = 20;
const randomNumBtw = (min, max) => Math.random() * (max - min) + min;
let particles = [];
for (let i = 0; i < total; i++) {
  const x = randomNumBtw(0, canvas.width);
  const y = randomNumBtw(0, canvas.height);
  const radius = randomNumBtw(100, 120);
  const vy = randomNumBtw(1, 5);
  particles.push(new Particle(x, y, radius, vy));
}

const interval = 1000 / 60;
let now;
let delta;
let then = Date.now();

function animate() {
  /**
   * requestAnimationFrame은 1초에 주사율 화면을 그리는 함수입니다. 이 함수를 사용하면 브라우저가 화면을 그리는 주기에 맞춰 애니메이션을 구현할 수 있습니다.
    => animate 함수는 모니터에 주사율에 맞춰 화면을 그리는 함수이다.
   */
  window.requestAnimationFrame(animate);
  now = Date.now();
  delta = now - then;
  if (delta < interval) {
    return;
    // then = now - (delta % interval);
    // draw();
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
/**
 * fps란?
 * frame per second의 약자로, 초당 프레임 수를 의미합니다. fps는 애니메이션의 부드러움과 선명도에 영향을 미치는 중요한 요소입니다. fps가 높을수록 애니메이션은 더 부드럽고 선명하게 보이지만, 그만큼 더 많은 컴퓨팅 자원을 사용하게 됩니다.
 */

animate();
