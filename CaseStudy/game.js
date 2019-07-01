var soundBackground = new Audio("audio/background.mp3")
var soundGameOver = new Audio("audio/gameover.wav")
var soundWall = new Audio("audio/wall.wav");
var soundBrick = new Audio("audio/brick.wav");
var soundWin = new Audio("audio/win.wav")
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var ball = {
    x: canvas.width / 2,
    y: canvas.height - 40,
    radius: 10,
    dx: 5,
    dy: 2
}

var paddle = {
    width: 500,
    height: 10,
    x: canvas.width / 2 - 35,
    y: canvas.height - 10,
    speed: 15,
    isMovingLeft: false,
    isMoveingRight: false,
}

var brickConfig = {
    offSetX: 0,
    offSetY: 40,
    margin: 5,
    width: 70,
    height: 15,
    totalRow: 5,
    totalCol: 7
}

var heartConfig = {
    x: 0,
    y: 0,
    margin: 5,
    width: 30,
    height: 30,
    totalHeart: 3
}

function drawHeart(num) {
    var x = 0;
    var image = new Image();
    image.src = 'heart.png';
    for (let i = 0; i < num; i++) {
        context.drawImage(image, x, 0, 30, 30);
        x += 40;
    }
}

function drawHeart2(num) {
    var x = 0;
    var image = new Image();
    image.src = 'heart2.png';
    for (let i = 0; i < num; i++) {
        context.drawImage(image, x, 0, 30, 30);
        x += 40;
    }
}

function drawHeartPos(pos) {
    drawHeart2(3 - pos);
}
var isGameOver = false;
var isGameWin = false;
var userScore = 0;
var maxScore = brickConfig.totalCol * brickConfig.totalRow;

// mảng chứa gạch
var brickList = [];
for (let i = 0; i < brickConfig.totalRow; i++) {
    for (let j = 0; j < brickConfig.totalCol; j++) {
        brickList.push({
            x: brickConfig.offSetX + j * (brickConfig.width + brickConfig.margin),
            y: brickConfig.offSetY + i * (brickConfig.height + brickConfig.margin),
            isBroken: false
        });
    }
}

//Sinh màu ngẫu nhiên
function getRandomHex() {
    return Math.floor(Math.random() * 255);
}

function getRandomColor() {
    var red = getRandomHex();
    var green = getRandomHex();
    var blue = getRandomHex();
    return "rgb(" + red + "," + blue + "," + green + ")";
}
var color = getRandomColor();

// Vẽ những viên gạch
function drawBricks() {
    brickList.forEach(function (brick) {
        if (!brick.isBroken) {
            context.beginPath();
            context.fillStyle = color;
            context.rect(brick.x, brick.y, brickConfig.width, brickConfig.height);
            context.fill();
            context.closePath();
        }
    })
}

// nhả phím {37 trái - 39 phải}
document.addEventListener('keyup', function (event) {
    //console.log('Key UP');
    if (event.keyCode == 37) {
        paddle.isMovingLeft = false;
    } else if (event.keyCode == 39) {
        paddle.isMovingRight = false;
    }
});

// nhấn phím
document.addEventListener('keydown', function (event) {
    //console.log('Key DOWN');
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
    context.fillStyle = '#4646b9';
    context.fill();
    context.closePath();
}

// Vẽ thanh chắn
function drawPaddle() {
    context.beginPath();
    context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    context.fillStyle = "#63b946";
    context.fill();
    context.closePath();
}

// Xử lý bóng va chạm vs tường
function handleBallCollideWall() {
    //kiểm tra va chạm 2 biên
    if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) {
        ball.dx = -ball.dx;
        soundWall.load();
        soundWall.play();
    }
    //kiểm tra va chạm phía trên
    if (ball.y < ball.radius) {
        ball.dy = -ball.dy;
        soundWall.load();
        soundWall.play();
    }
}

// Xử lý bóng va chạm vs thanh chắn
function handleBallCollidePaddle() {
    if ((ball.x + ball.radius >= paddle.x && ball.x + ball.radius <= paddle.x + paddle.width &&
            ball.y + ball.radius >= canvas.height - paddle.height) || lifeAgain) {
        ball.dy = -ball.dy;
        lifeAgain = false;
    }
}

// Xử lý bóng va chạm vs gạch
function handleBallColideBricks() {
    brickList.forEach(function (brick) {
        if (!brick.isBroken) {
            if (ball.x >= brick.x && ball.x <= brick.x + brickConfig.width &&
                ball.y + ball.radius >= ball.y && ball.y - ball.radius <= brick.y + brickConfig.height) {
                ball.dy = -ball.dy;
                brick.isBroken = true;
                userScore++;
                console.log('score: ' + userScore);
                document.getElementById("score").innerHTML = "Score: " + userScore;

                if (userScore % 10 == 0) {
                    v++;
                    paddle.width = paddle.width / 2;
                };

                if (userScore >= maxScore) {
                    isGameOver = true;
                    isGameWin = true;
                }
                soundBrick.load();
                soundBrick.play();
            }
        }
    })
}

// cập nhật vị trí quả bóng
var v = 1;

function updateBallPosition() {
    ball.x += (v * ball.dx);
    ball.y += (v * ball.dy);
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
var life = 3;
var lifeAgain = false;
// kiểm tra kết thúc
function checkGameOver() {
    drawHeart(3);
    if (ball.y > canvas.height - ball.radius) {
        {
            life--;
        }
        if (life) {
            lifeAgain = true;
        }
        console.log('life: ' + life);
    }
    drawHeartPos(life);
    if (life == 0) {
        isGameOver = true;
    }
}

// xử lí kết thúc 
function handleGameOver() {

    if (isGameWin) {
        console.log("you win!");
        soundWin.load();
        soundWin.play();
    } else {
        console.log('Game Over!');
        soundBackground.pause();
        soundGameOver.play();
    }
}

// chạy nhạc nền 
function playBackgroudSound() {
    // soundBackground.load();
    soundBackground.play();
    soundBackground.volume = .5;
}

function update() {
    if (!isGameOver) {
        context.clearRect(0, 0, canvas.clientWidth, canvas.height);
        drawBall();
        drawPaddle();
        drawBricks();
        updatePaddlePosition();
        handleBallCollidePaddle();
        handleBallCollideWall();
        handleBallColideBricks();
        updateBallPosition();
        checkGameOver();
        requestAnimationFrame(update);
    } else {
        handleGameOver();
    }
}
playBackgroudSound();
update();