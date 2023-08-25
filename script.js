let score = 0;
let highScore = 0;
let timeLeft = 10;
let timerInterval;
let topScores = [];

const startButton = document.getElementById('startButton');
const clickButton = document.getElementById('clickButton');
const restartButton = document.getElementById('restartButton');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const timerDisplay = document.getElementById('timer');
const scoreList = document.getElementById('scoreList');

function handleClick() {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
}

function showStartButton() {
    startButton.style.display = 'block';
    clickButton.style.display = 'none';
    restartButton.style.display = 'none';
    startButton.addEventListener('click', startCountdownForGame);
}

function startCountdownForGame() {
    startButton.style.display = 'none';
    clickButton.style.display = 'block'; // Show the "Click Me!" button during countdown
    restartButton.style.display = 'none';
    let countdown = 3;
    const countdownInterval = setInterval(() => {
        timerDisplay.textContent = `Starting in ${countdown} seconds`;
        countdown--;
        if (countdown < 0) {
            clearInterval(countdownInterval);
            clickButton.style.display = 'none'; // Hide the "Click Me!" button after countdown
            startGame();
        }
    }, 1000);
}

function startGame() {
    clickButton.disabled = false;
    clickButton.style.display = 'block';
    restartButton.style.display = 'none';
    score = 0;
    timeLeft = 10;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time left: ${timeLeft}`;
    clickButton.addEventListener('click', handleClick);
    startTimer();
}

function restartGame() {
    clearInterval(timerInterval);
    clickButton.removeEventListener('click', handleClick);
    startButton.style.display = 'none';
    clickButton.style.display = 'none';
    restartButton.style.display = 'none';
    timeLeft = 10;
    timerDisplay.textContent = `Time left: ${timeLeft}`;
    displayTopScores();
    setTimeout(() => {
        showStartButton();
    }, 1000);
}

showStartButton(); // Show only the Start button initially

restartButton.addEventListener('click', restartGame);

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time left: ${timeLeft}`;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            clickButton.removeEventListener('click', handleClick);
            const playerName = prompt("Enter your name:");
            if (playerName) {
                updateTopScores(playerName);
            }
            alert(`Game Over! Your final score is ${score}`);
            displayTopScores();
            restartButton.style.display = 'block';
            clickButton.style.display = 'none';
            clickButton.disabled = true; // Disable the "Click Me!" button after game over
        } else if (timeLeft < 10) {
            clickButton.disabled = false;
        }
    }, 1000);
}

function updateTopScores(playerName) {
    topScores.push({ name: playerName, score });
    topScores.sort((a, b) => b.score - a.score);
    if (topScores.length > 10) {
        topScores.pop();
    }
}

function displayTopScores() {
    scoreList.innerHTML = '';
    topScores.forEach((topScore, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${topScore.name} - ${topScore.score}`;
        scoreList.appendChild(listItem);
    });
}

displayTopScores();
