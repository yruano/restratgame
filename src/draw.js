//원을그리는 함수
function drawCircle(x, y, radius, color = null) {
    color && (gl.fillStyle = color);
    gl.beginPath();
    gl.arc(x, y, radius, 0, Math.PI * 180);
    gl.fill();
}

// 게임 종료
function gameOver() {
    gl.fillStyle = 'black';
    gl.fillRect(center.x - 700/2, center.y - 220/2, 700, 150);
    gl.textAlign = 'center';
    gl.font = '100px Arial';
    gl.fillStyle = 'red';
    gl.fillText('GAME OVER', center.x, center.y);

}