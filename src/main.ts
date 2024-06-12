import { DIMENSIONS, DOODLER__HEIGHT, DOODLER__WIDTH, PLATFORM__HEIGHT, PLATFORM__WIDTH } from "./constants/constants";
import Doodler from "./objects/doodler";
import { ctx, canvas, startWindow, startButton } from "./html-elements";
import Platform from "./objects/platform";
import generateRandomNumber from "./utils/getRandomNumber";
import { detectCollision } from "./helper";

canvas.width = DIMENSIONS.CANVAS__WIDHT;
canvas.height = DIMENSIONS.CANVAS__HEIGHT;

// Doodler
const doodlerRightImg = "./images/doodler-right.png";
const doodlerLeftImg = "./images/doodler-left.png";

let highScore = Number(localStorage.getItem("high__score")) || 0;
let currentScore = 0;

function drawScore() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(`Score: `, 10, 50);

    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(currentScore.toString(), 110, 50);
}

function gameOver() {
    ctx.font = "50px Arial";
    ctx.fillStyle = "#red";
    ctx.fillText(`Game Over`, 120, canvas.height / 2);

    ctx.font = "30px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(`Score: ${currentScore}`, 175, canvas.height / 2 + 40);

    ctx.font = "30px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(`Highscore: ${highScore}`, 160, canvas.height / 2 + 80);

    ctx.font = "20px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(`Press Enter to Restart the game`, 110, canvas.height / 2 + 120);
}

const doodler = new Doodler(doodlerRightImg, canvas.width / 2 - DOODLER__WIDTH / 2, (canvas.height * 7) / 8, DOODLER__WIDTH, DOODLER__HEIGHT, 8);

let moveRight = false;
let moveLeft = false;
// let restart = false;

window.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
        moveRight = true;
        doodler.img = doodlerRightImg;
    } else if (e.key === "ArrowLeft") {
        moveLeft = true;
        doodler.img = doodlerLeftImg;
    }
});

window.addEventListener("keyup", function (e) {
    if (e.key === "ArrowRight") {
        moveRight = false;
    } else if (e.key === "ArrowLeft") {
        moveLeft = false;
    }
});

// Platform
const platformImg = "./images/platform.png";
const platforms: Platform[] = [];
for (let i = 0; i < 20; i++) {
    const randX = generateRandomNumber(0, canvas.width - PLATFORM__WIDTH);
    platforms.push(new Platform(platformImg, randX, canvas.height - 75 * i - 150, PLATFORM__WIDTH, PLATFORM__HEIGHT, 8));
}

const addPlatforms = function () {
    const randX = generateRandomNumber(0, canvas.width - PLATFORM__WIDTH);
    platforms.push(new Platform(platformImg, randX, -canvas.height - 150, PLATFORM__WIDTH, PLATFORM__HEIGHT, 8));
    currentScore += platform.height + 150; //distance covered = height of all passed platforms + gap between platform
};

const platform = new Platform(platformImg, canvas.width / 2 - PLATFORM__WIDTH / 2, canvas.height + 250, PLATFORM__WIDTH, PLATFORM__HEIGHT, 8);
platforms.push(platform);

const animate = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // doodler
    doodler.updatePosition(moveRight, moveLeft);
    doodler.draw();

    if (doodler.ypose >= canvas.height) {
        if (currentScore > highScore) {
            highScore = currentScore;
            localStorage.setItem("high__score", "" + highScore);
        }
        gameOver();
        return;
    }

    // platform
    platforms.forEach((platform) => {
        if (doodler.dy < 0 && doodler.ypose < (canvas.height * 3) / 4) {
            platform.ypose -= doodler.dy;
        }
        if (detectCollision(doodler, platform)) {
            doodler.dy = -12;
        }
        // console.log(platform);
        platform.draw();
    });

    while (platforms.length > 0 && platforms[0].ypose >= canvas.height) {
        platforms.shift();
        addPlatforms();
    }

    drawScore();
    requestAnimationFrame(animate);
};

startButton.addEventListener("click", function () {
    startWindow.style.display = "none";
    canvas.style.display = "block";
    animate();
});
