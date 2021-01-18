var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Score related
var score = 0;

// Ball related
var ballRadius = 10;
var ballColor = "red";
var x = canvas.width / 2;
var y = canvas.height - 30;
var ballDiag = Math.sqrt(2) * ballRadius / 2;
var dx = 2;
var dy = -2;

// Paddle related
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleY = canvas.height - 20;
var paddleVelocity = 4;
var paddleColor = "lime";

// Brick related
var bricks = [];
var brickRowCount = 3;
var brickColumnCount = 5;
var brickHeight = 20;
var brickWidth = 75;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var brickColor = "orange";

// Init bricks
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: brickOffsetLeft + c * (brickWidth + brickPadding), y: brickOffsetTop + r * (brickHeight + brickPadding), visible: true };
    }
}

// Key related
var leftPressed = false;
var rightPressed = false;

// Functions

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function brickCollision() {
    var collision = false;
    for (var c = 0; c < brickColumnCount && !collision; c++) {
        for (var r = 0; r < brickRowCount && !collision; r++) {
            var b = bricks[c][r];
            if (b.visible) {
                // 2 cas possible :
                // On rebondit sur un axe vertical
                if (y + dy + ballRadius > b.y && y + dy - ballRadius < b.y + brickHeight
                    && x > b.x && x < b.x + brickWidth) {
                    collision = true;
                    b.visible = false;
                    dy *= -1;
                }
                // On rebondit sur un axe horizontal
                else if (x + dx + ballRadius > b.x && x + dx - ballRadius < b.x + brickWidth
                    && y > b.y && y < b.y + brickHeight) {
                    collision = true;
                    b.visible = false;
                    dx *= -1;
                }
            }
        }
    }
    if (collision) {
        score++;
        if (score == brickColumnCount * brickRowCount) {
            alert("FELICITATION ! TU AS GAGNE !");
            document.location.reload();
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawBall() {
    ctx.beginPath();
    // Check for collision with bricks
    brickCollision();
    // Check for collision with walls
    if (x + dx + ballRadius >= canvas.width || x + dx - ballRadius < 0) {
        dx *= -1;
    }
    if (y + dy - ballRadius < 0 || (y + dy + ballRadius > paddleY && (x > paddleX && x < paddleX + paddleWidth))) {
        dy *= -1;
    } else if (y + dy + ballRadius >= canvas.height) {
        alert("PERDU !");
        document.location.reload();
    }

    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, true);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    if (leftPressed && paddleX - paddleVelocity >= 0) {
        paddleX -= paddleVelocity;
    } else if (rightPressed && paddleX + paddleWidth + paddleVelocity <= canvas.width) {
        paddleX += paddleVelocity;
    }
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = paddleColor;
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].visible) {
                ctx.beginPath();
                ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
                ctx.fillStyle = brickColor;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    x += dx;
    y += dy;

    requestAnimationFrame(draw);
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

draw();