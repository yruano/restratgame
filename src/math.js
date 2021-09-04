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

function wall(x, y, radius) {
  const result = { x: x, y: y };
  let dx = 2;
  let dy = -2;
  if (x + dx > canvas.width - radius || x + dx < radius) {
    dx = -dx;
  }
  if (y + dy > canvas.height - radius || y + dy < radius) {
    dy = -dy;
  }

  result.x = dx;
  result.y = dy;
  return result;
}

//랜덤 스폰
function randomspawn(radius) {
  const spawnX = Math.floor(Math.random() * (canvas.width - radius)) + radius;
  const spawnY = Math.floor(Math.random() * (canvas.height - radius)) + radius;
  return { x: spawnX, y: spawnY };
}

//시간
