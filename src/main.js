class Player {
    constructor(){
        this.x = center.x;
        this.y = center.y;
        this.radius = 10;
        this.moveSpeed = 5;
        this.color = '#000000';

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
    draw() {
        drawCircle(this.x, this.y, this.radius, this.color);
    }
    
}