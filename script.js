const simonPattern = [];
const playerPattern = [];
const colors = ['green', 'red', 'blue', 'yellow'];
let isStrict = false;
let isPlayerTurn = false;
let round = 0;
let rightscore = 0;

function startGame() {
    score = 0;
    round = 0;
    simonPattern.length = 0;
    playerPattern.length = 0;
    isStrict = false;
    isPlayerTurn = false;
    nextRound();
}

function nextRound() {
    round++;
    document.getElementById("message").innerHTML = "Round " + round;
    isPlayerTurn = false;
    generateNextColor();
    showPattern();
}

function generateNextColor() {
    const randomColor = colors[Math.floor(Math.random() * 4)];
    simonPattern.push(randomColor);
}

function showPattern() {
    let i = 0;
    const interval = setInterval(function () {
        if (i >= simonPattern.length) {
            clearInterval(interval);
            isPlayerTurn = true;
            document.getElementById("message").innerHTML = "Your Turn";
        } else {
            flashColor(simonPattern[i]);
            i++;
        }
    }, 1000);
}

function flashColor(color) {
    const button = document.getElementById(color);
    button.style.opacity = 1;
    setTimeout(function () {
        button.style.opacity = 0.6;
    }, 500);
}

function handleButtonClick(color) {
    if (isPlayerTurn) {
        playerPattern.push(color);
        flashColor(color);
        checkPlayerInput();
    }
}

function checkPlayerInput() {
    if (playerPattern[playerPattern.length - 1] !== simonPattern[playerPattern.length - 1]) {
        document.getElementById("message").innerHTML = "Wrong! Try Again";
        if (isStrict) {
            startGame();
        } else {
            setTimeout(function () {
                playerPattern.length = 0;
                showPattern();
            }, 1000);
        }
    } else if (playerPattern.length === simonPattern.length) {
            score += playerPattern.length;
            document.getElementById("score").innerHTML = score;
            playerPattern.length = 0;
            nextRound();
        }
    }

function toggleStrictMode() {
    isStrict = !isStrict;
    document.getElementById("strict-indicator").innerHTML = isStrict ? "Strict Mode: On" : "Strict Mode: Off";
}