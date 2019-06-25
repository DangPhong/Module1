var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var ball = {
    x: 20,
    y: 20,
    radius: 10,
    dx: 5,
    dy: 2
}
var paddle = {
    width: 70,
    height: 10,
    x: canvas.width / 2 - 35,
    y: canvas.height - 10,
    speed: 15,
    isMovingLeft: false,
    isMoveingRight: false,
}

var isGameOver = false;

// nhả phím {37 trái - 39 phải}
document.addEventListener('keyup', function (event) {
    console.log('Key UP');
    if (event.keyCode == 37) {
        paddle.isMovingLeft = false;
    } else if (event.keyCode == 39) {
        paddle.isMovingRight = false;
    }
});

// nhấn phím
document.addEventListener('keydown', function (event) {
    console.log('Key DOWN');
    if (event.keyCode == 37) {
        paddle.isMovingLeft = true;
    } else if (event.keyCode == 39) {
        paddle.isMovingRight = true;
    }
});

// Vẽ bóng
function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
}

// Vẽ thanh chắn
function drawPaddle() {
    context.beginPath();
    context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    context.fill();
    context.closePath();
}

// Xử lý bóng va chạm vs tường
function handleBallCollideWall() {
    if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) {
        ball.dx = -ball.dx;
    }
    if (ball.y < ball.radius) {
        ball.dy = -ball.dy;
    }
}

// Xử lý bóng va chạm vs thanh chắn
function handleBallCollidePaddle() {
    if (ball.x + ball.radius >= paddle.x && ball.x + ball.radius <= paddle.x + paddle.width &&
        ball.y + ball.radius >= canvas.height - paddle.height) {
        ball.dy = -ball.dy;
    }
}

// cập nhật vị trí quả bóng
function updateBallPosition() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

// cập nhật vị trí thanh chắn
function updatePaddlePosition() {
    if (paddle.isMovingLeft) {
        paddle.x -= paddle.speed;
    } else if (paddle.isMovingRight) {
        paddle.x += paddle.speed;
    }

    if (paddle.x < 0) {
        paddle.x = 0;
    } else if (paddle.x > canvas.width - paddle.width) {
        paddle.x = canvas.width - paddle.width;
    }
}

// kiểm tra kết thúc
function checkGameOver() {

    if (ball.y > canvas.height - ball.radius) {
        isGameOver = true;
    }
}

// xử lí kết thúc 
function handleGameOver() {
    console.log('Game Over!');
}


function update() {
    if (!isGameOver) {
        context.clearRect(0, 0, canvas.clientWidth, canvas.height);
        drawBall();
        drawPaddle();
        updatePaddlePosition();
        handleBallCollidePaddle();
        handleBallCollideWall()
        updateBallPosition();
        checkGameOver();
        requestAnimationFrame(update);
    } else {
        handleGameOver();
    }
}
update();