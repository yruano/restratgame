class GameState {
  static gameOver = false;
}

// 플레이어
class Player {
  constructor() {
    this.x = center.x;
    this.y = center.y;
    this.radius = 10;
    this.moveSpeed = 5;
    this.color = '#ffffff';
    //      플레이어 움직임
    this.keyUp = false;
    this.keyDown = false;
    this.keyRight = false;
    this.keyLeft = false;

    window.addEventListener('keydown', event => {
      event.key == 'w' && (player.keyUp = true);
      event.key == 's' && (player.keyDown = true);
      event.key == 'd' && (player.keyRight = true);
      event.key == 'a' && (player.keyLeft = true);
    });
    window.addEventListener('keyup', event => {
      event.key == 'w' && (player.keyUp = false);
      event.key == 's' && (player.keyDown = false);
      event.key == 'd' && (player.keyRight = false);
      event.key == 'a' && (player.keyLeft = false);
    });
  }
  // 플레이어를 그리기위해 draw를 가져옴
  draw() {
    drawCircle(this.x, this.y, this.radius, this.color);
  }
  processInput() {
    if (player.y <= 0 + this.radius) {
      this.keyUp && (player.y = 0 + this.radius);
    } else {
      this.keyUp && (player.y -= player.moveSpeed);
    }

    if (player.y >= canvas.height - this.radius) {
      this.keyDown && (player.y = canvas.height - this.radius);
    } else {
      this.keyDown && (player.y += player.moveSpeed);
    }

    if (player.x >= canvas.width - this.radius) {
      this.keyRight && (player.x = canvas.width - this.radius);
    } else {
      this.keyRight && (player.x += player.moveSpeed);
    }

    if (player.x <= 0 + this.radius) {
      this.keyLeft && (player.x = 0 + this.radius);
    } else {
      this.keyLeft && (player.x -= player.moveSpeed);
    }
  }
  processCollision(enemy) {
    const dist = distance(player.x, player.y, enemy.x, enemy.y);
    if (dist <= player.radius + enemy.radius) {
      GameState.gameOver = true;
    }
  }
}

// 적
class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.moveSpeed = 3;
    this.color = '#ff0000';
  }
  // 적을 그리기위해 draw를 가져옴
  draw() {
    drawCircle(this.x, this.y, this.radius, this.color);
  }
  follow(target) {
    const dir = direction(this.x, this.y, target.x, target.y);
    const dist = distanceSq(this.x, this.y, target.x, target.y);
    const speed = dist < this.moveSpeed ** 2 ? Math.sqrt(dist) : this.moveSpeed;
    this.x += dir.x * speed;
    this.y += dir.y * speed;
  }
}

function spawnEnemy() {
  let enemy = new Enemy(0, 0);
  let spawnPos = randomspawn(enemy.radius);
  enemy.x = spawnPos.x;
  enemy.y = spawnPos.y;
  return enemy;
}

const player = new Player();
const enemies = [];

const spawntime = new Timer(3, () => { enemies.push(spawnEnemy()); console.log('들어와'); }, 0)

let deltatime = 0;
let calctime = 0;
let savetime = 0;


function loopGamePlay(deltatime) {
  spawntime.spawntime();

  player.processInput();
  player.draw();

  for (const enemy of enemies) {
    player.processCollision(enemy);
    enemy.follow(player);
    enemy.draw();
  }
}

function loopGameOver(deltatime) {
  player.draw();

  for (const enemy of enemies) {
    enemy.draw();
  }

  gameOver();
}


(function loop() {
  deltatime = (performance.now() - calctime) / 1000;
  gl.clearRect(0, 0, canvas.width, canvas.height);

  if (GameState.gameOver) {
    loopGameOver(deltatime);
  } else {
    loopGamePlay(deltatime);
  }

  calctime = performance.now();
  requestAnimationFrame(loop);
})();