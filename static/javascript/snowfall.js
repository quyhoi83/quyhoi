// Snowflake mixin
class Snowflake {
  constructor(ctx, size, image) {
    this.ctx = ctx;
    this.size = size;
    this.image = image;
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.speed = Math.random() * 2 + 1; // Speed between 1 and 3
  }

  fall() {
    this.y += this.speed;
    if (this.y > window.innerHeight) {
      this.y = 0 - this.size; // Reset snowflake if it goes off the bottom
      this.x = Math.random() * window.innerWidth;
    }
  }

  draw() {
    const aspectRatio = this.image.width / this.image.height;
    const height = this.size;
    const width = this.size * aspectRatio;
    this.ctx.drawImage(this.image, this.x, this.y, width, height);
  }
}

const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set canvas background to transparent
ctx.fillStyle = 'rgba(0, 0, 0, 0)';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Load snowflake images
const smallSnowflake = new Image();
smallSnowflake.src = 'https://nkvs.vn/static/intro/maychutiemlong/assets/images/popup/snow-3.png';

const mediumSnowflake = new Image();
mediumSnowflake.src = 'https://nkvs.vn/static/intro/maychutiemlong/assets/images/popup/snow-2.png';

const largeSnowflake = new Image();
largeSnowflake.src = 'https://nkvs.vn/static/intro/maychutiemlong/assets/images/popup/snow-1.png';

// Create snowflakes
const smallSnowflakes = Array.from({ length: 30 }, () => new Snowflake(ctx, 15, smallSnowflake));
const mediumSnowflakes = Array.from({ length: 20 }, () => new Snowflake(ctx, 20, mediumSnowflake)); // Adjust size here
const largeSnowflakes = Array.from({ length: 10 }, () => new Snowflake(ctx, 40, largeSnowflake));

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw and update small snowflakes
  smallSnowflakes.forEach((snowflake) => {
    snowflake.fall();
    snowflake.draw();
  });

  // Draw and update medium snowflakes
  mediumSnowflakes.forEach((snowflake) => {
    snowflake.fall();
    snowflake.draw();
  });

  // Draw and update large snowflakes
  largeSnowflakes.forEach((snowflake) => {
    snowflake.fall();
    snowflake.draw();
  });

  requestAnimationFrame(animate);
}

// Start animation loop
animate();
