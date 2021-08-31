function drawCircle(x, y, radius, color = null) {
    color && (gl.fillStyle = color);
    gl.beginPath();
    gl.arc(x, y, radius, 0, Math.PI * 180);
    gl.fill();
}