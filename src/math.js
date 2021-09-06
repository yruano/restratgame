function distance(x1, y1, x2, y2) {
  const a = (x1 - x2) ** 2;
  const b = (y1 - y2) ** 2;
  const c = a + b;
  return Math.sqrt(c);
}

function distanceSq(x1, y1, x2, y2) {
  const a = (x1 - x2) ** 2;
  const b = (y1 - y2) ** 2;
  const c = a + b;
  return c;
}

function normalize(x, y) {
  const result = { x: 0, y: 0 };
  const dist = distance(0, 0, x, y);
  if (dist != 0) {
    result.x = x / dist;
    result.y = y / dist;
  }
  return result;
}

function direction(x1, y1, x2, y2) {
  const result = { x: 0, y: 0 };
  result.x = x2 - x1;
  result.y = y2 - y1;
  return normalize(result.x, result.y);
}

//랜덤 스폰
function randomspawn(radius) {
  const spawnX = Math.floor(Math.random() * (canvas.width - radius)) + radius;
  const spawnY = Math.floor(Math.random() * (canvas.height - radius)) + radius;
  return { x: spawnX, y: spawnY };
}

//시간
class Timer {
  constructor(interval, fn, countr) {
    this.interval = interval;
    this.fn = fn;
    this.countr = countr
    this.timer = 0;
    this.val = 2;
  }
  spawnenemy() {
    this.timer += deltatime;
    if (this.timer >= this.interval) {
      this.fn();
      this.timer = 0;
      this.countr += 0.2;
    }
    if (this.countr >= this.val) {
      if (this.val <= 1) {
        return;
      }
      this.interval -= 0.86;
      this.val -= 0.4;
      this.countr = 0;
    }
  }
  spawnitem(){
    this.timer += deltatime;
    if (this.timer >= this.interval) {
      this.fn();
      console.log(this.timer);
      this.timer = 0;
    }
  }
}