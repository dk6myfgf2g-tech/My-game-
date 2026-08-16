const player = document.getElementById("player");
const game = document.getElementById("game");
const scoreText = document.getElementById("score");
const gameOver = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");

let jumping = false;
let gameEnded = false;
let score = 0;
let playerBottom = 30;

function jump() {
  if (jumping || gameEnded) return;

  jumping = true;

  let up = setInterval(() => {
    playerBottom += 1.5;
    player.style.bottom = playerBottom + "%";

    if (playerBottom >= 55) {
      clearInterval(up);

      let down = setInterval(() => {
        playerBottom -= 1.5;
        player.style.bottom = playerBottom + "%";

        if (playerBottom <= 30) {
          playerBottom = 30;
          player.style.bottom = "30%";
          clearInterval(down);
          jumping = false;
        }
      }, 20);
    }
  }, 20);
}

function createObstacle() {
  if (gameEnded) return;

  const obstacle = document.createElement("div");
  obstacle.className = "obstacle";
  obstacle.style.right = "-50px";
  game.appendChild(obstacle);

  let position = -50;

  const move = setInterval(() => {
    if (gameEnded) {
      clearInterval(move);
      obstacle.remove();
      return;
    }

    position += 5;
    obstacle.style.right = position + "px";

    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      endGame();
      clearInterval(move);
    }

    if (position > window.innerWidth + 100) {
      clearInterval(move);
      obstacle.remove();
      score++;
      scoreText.textContent = "النقاط: " + score;
    }
  }, 20);
}

function endGame() {
  gameEnded = true;
  finalScore.textContent = "النقاط: " + score;
  gameOver.style.display = "flex";
}

setInterval(() => {
  if (!gameEnded) {
    createObstacle();
  }
}, 1800);

document.addEventListener("touchstart", jump);
document.addEventListener("click", jump);
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    jump();
  }
});
