const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");

let score = 0;

const player = {
  x: 220,
  y: 640,
  width: 60,
  height: 20,
  speed: 7
};

const coins = [];

const keys = {
  left: false,
  right: false
};

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") keys.left = true;
  if (e.key === "ArrowRight") keys.right = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") keys.left = false;
  if (e.key === "ArrowRight") keys.right = false;
});

function spawnCoin() {
  coins.push({
    x: Math.random() * (canvas.width - 30),
    y: -30,
    size: 26,
    speed: 2 + Math.random() * 3
  });
}

function update() {

  if (keys.left) {
    player.x -= player.speed;
  }

  if (keys.right) {
    player.x += player.speed;
  }

  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) {
    player.x = canvas.width - player.width;
  }

  for (let i = coins.length - 1; i >= 0; i--) {
    const coin = coins[i];

    coin.y += coin.speed;

    const hit =
      coin.x < player.x + player.width &&
      coin.x + coin.size > player.x &&
      coin.y < player.y + player.height &&
      coin.y + coin.size > player.y;

    if (hit) {
      coins.splice(i, 1);
      score++;
      scoreEl.textContent = score;
      continue;
    }

    if (coin.y > canvas.height) {
      coins.splice(i, 1);
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = "#00ff99";
  ctx.fillRect(
    player.x,
    player.y,
    player.width,
    player.height
  );
}

function drawCoins() {
  for (const coin of coins) {

    ctx.beginPath();
    ctx.arc(
      coin.x + coin.size / 2,
      coin.y + coin.size / 2,
      coin.size / 2,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "gold";
    ctx.fill();

    ctx.strokeStyle = "#b8860b";
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  drawCoins();
}

function gameLoop() {
  update();
  draw();

  requestAnimationFrame(gameLoop);
}

setInterval(spawnCoin, 800);

gameLoop();