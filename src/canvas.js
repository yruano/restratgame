//화면들
const canvas = document.getElementById('canvas');
canvas.width = 970;
canvas.height = 500;
canvas.style.background = '#000000';

const center = {
  x: canvas.width / 2,
  y: canvas.height / 2
}

window.addEventListener('resize', event => {
  canvas.width = 1980;
  canvas.height = 890;
  center.x = canvas.width / 2;
  center.y = canvas.height / 2;
});

/** @type {CanvasRenderingContext2D} */
const gl = canvas.getContext('2d');