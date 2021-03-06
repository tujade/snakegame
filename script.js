// Variáveis
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
}
let direction = "right";
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
};

// Background
function criarBG() {
  context.fillStyle = 'lightgreen';
  context.fillRect(0, 0, 16 * box, 16 * box);
}

// Cobrinha
function criarCobrinha() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = "black";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

// Criar comida da cobrinha
function drawFood() {
  context.fillStyle = "red"
  context.fillRect(food.x, food.y, box, box);
}

// Evento de movimento/click
document.addEventListener('keydown', update);


// Função Movimento a partir do teclado
function update(event) {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
}

// Iniciar Jogo 
function iniciarJogo() {
  //Regra para que a cobrinha não suma da tela ao passar do limite
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

  // Encerrar o jogo se o a cabeça se chocar com o corpo
  for(i = 1; i < snake.length; i++) {
      if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
        clearInterval(jogo);
        alert('Você perdeu! :( Recarregue a página e continue jogando!')
      }
  }

  criarBG();
  criarCobrinha();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  //Condição para a cobrinha crescer ou não
  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();

  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }


  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);