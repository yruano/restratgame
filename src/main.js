// 플레이어
class Player {
    constructor() {
        this.x = center.x;
        this.y = center.y;
        this.radius = 10;
        this.moveSpeed = 5;
        this.color = '#000000';
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
        let { x, y } = wall(this.x, this.y, this.radius);
        this.x = x;
        this.y = y;
        drawCircle(this.x, this.y, this.radius, this.color);
    }
    processInput() {
        this.keyUp && (player.y -= player.moveSpeed);
        this.keyDown && (player.y += player.moveSpeed);
        this.keyRight && (player.x += player.moveSpeed);
        this.keyLeft && (player.x -= player.moveSpeed);
    }
    processCollision(enemy) {
        const dist = distance(player.x, player.y, enemy.x, enemy.y);
        if (dist <= player.radius + enemy.radius) {
            gameOver();
            console.log("hit");
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
        wall(this.x, this.y, this.radius);
    }
    follow(target) {
        const dir = direction(this.x, this.y, target.x, target.y);
        const dist = distanceSq(this.x, this.y, target.x, target.y);
        const speed = dist < this.moveSpeed ** 2 ? Math.sqrt(dist) : this.moveSpeed;
        this.x += dir.x * speed;
        this.y += dir.y * speed;
    }
    randomspawn() {

    }
}

const player = new Player();
const enemies = [
    new Enemy(100, 100),
    new Enemy(200, 200),
    new Enemy(300, 300),
    new Enemy(400, 400),
];

(function loop() {
    gl.clearRect(0, 0, canvas.width, canvas.height);

    player.processInput();
    player.draw();

    for (const enemy of enemies) {
        player.processCollision(enemy);
        enemy.follow(player);
        enemy.draw();
    }

    requestAnimationFrame(loop);
})();