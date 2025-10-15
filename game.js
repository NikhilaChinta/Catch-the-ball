const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let paddleWidth = 80;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

let ballRadius = 10;
let ballX = Math.random() * (canvas.width - ballRadius * 2) + ballRadius;
let ballY = 0;
let ballSpeed = 2;

let score = 0;

// Move paddle with mouse
document.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  paddleX = e.clientX - rect.left - paddleWidth / 2;
  if (paddleX < 0) paddleX = 0;
  if (paddleX + paddleWidth > canvas.width) paddleX = canvas.width - paddleWidth;
});

// Draw paddle
function drawPaddle() {
  ctx.fillStyle = "#00ffea";
  ctx.fillRect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
}

// Draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#ff00ff";
  ctx.fill();
  ctx.closePath();
}

// Update game
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPaddle();
  drawBall();

  ballY += ballSpeed;

  // Ball hits paddle
  if (
    ballY + ballRadius >= canvas.height - paddleHeight - 10 &&
    ballX > paddleX &&
    ballX < paddleX + paddleWidth
  ) {
    score++;
    document.getElementById("score").textContent = score;
    resetBall();
  }

  // Ball missed
  if (ballY > canvas.height) {
    alert("Game Over! Your score: " + score);
    score = 0;
    document.getElementById("score").textContent = score;
    resetBall();
  }

  requestAnimationFrame(update);
}

// Reset ball to top
function resetBall() {
  ballX = Math.random() * (canvas.width - ballRadius * 2) + ballRadius;
  ballY = 0;
}

update();
