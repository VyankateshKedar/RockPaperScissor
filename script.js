const choices = ['rock', 'paper', 'scissors'];
const playerScore = document.getElementById('player-score');
const computerScore = document.getElementById('computer-score');
const choiceBtns = document.querySelectorAll('.choice-btn');
const resultContainer = document.querySelector('.result-container');
const resultMessage = document.querySelector('.result-message');
const playerChoiceDisplay = document.getElementById('player-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const playAgainBtn = document.querySelector('.play-again-btn');
const rulesBtn = document.getElementById('rules-btn');
const nextBtn = document.getElementById('next-btn');
const rulesModal = document.getElementById('rules-modal');
const closeBtn = document.querySelector('.close');
const winScreen = document.querySelector('.win-screen');
const winPlayAgainBtn = document.getElementById('play-again-btn');
const winRulesBtn = document.getElementById('win-rules-btn');

let scores = JSON.parse(localStorage.getItem('scores')) || { player: 0, computer: 0 };
playerScore.textContent = scores.player;
computerScore.textContent = scores.computer;

choiceBtns.forEach(button => {
    button.addEventListener('click', () => playRound(button.dataset.choice));
});

function playRound(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    const winner = getWinner(playerChoice, computerChoice);
    
    displayChoices(playerChoice, computerChoice);
    
    if (winner === 'player') {
        scores.player++;
        resultMessage.textContent = "YOU WIN AGAINST PC";
        document.getElementById('player-choice').classList.add('winner-highlight');
    } else if (winner === 'computer') {
        scores.computer++;
        resultMessage.textContent = "YOU LOSE AGAINST PC";
        document.getElementById('computer-choice').classList.add('winner-highlight');
    } else {
        resultMessage.textContent = "IT'S A TIE";
    }
    
    updateScores();
    showResult();
}

function getWinner(player, computer) {
    if (player === computer) return 'tie';
    if ((player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')) {
        return 'player';
    }
    return 'computer';
}

function updateScores() {
    playerScore.textContent = scores.player;
    computerScore.textContent = scores.computer;
    localStorage.setItem('scores', JSON.stringify(scores));
    if (scores.player >= 5 || scores.computer >= 5) {
        showWinScreen();
    }
}

function displayChoices(playerChoice, computerChoice) {
    const playerChoiceEl = document.getElementById('player-choice');
    const computerChoiceEl = document.getElementById('computer-choice');
    
    playerChoiceEl.textContent = getChoiceEmoji(playerChoice);
    computerChoiceEl.textContent = getChoiceEmoji(computerChoice);
    
    playerChoiceEl.dataset.choice = playerChoice;
    computerChoiceEl.dataset.choice = computerChoice;
    
    playerChoiceEl.classList.remove('winner-highlight');
    computerChoiceEl.classList.remove('winner-highlight');
}

function getChoiceEmoji(choice) {
    if (choice === 'rock') return '✊';
    if (choice === 'paper') return '✋';
    return '✌️';
}

function showWinScreen() {
    document.querySelector('.game-container').style.display = 'none';
    const winMessage = document.querySelector('.win-message');
    const winSubmessage = document.querySelector('.win-submessage');

    if (scores.player > scores.computer) {
        winMessage.textContent = 'HURRAY!!';
        winSubmessage.textContent = 'YOU WON THE GAME';
    } else if (scores.computer > scores.player) {
        winMessage.textContent = 'OH NO!';
        winSubmessage.textContent = 'YOU LOST THE GAME';
    } else {
        winMessage.textContent = 'IT\'S A TIE!';
        winSubmessage.textContent = 'NO ONE WINS';
    }

    winScreen.style.display = 'block';
}

winPlayAgainBtn.addEventListener('click', () => {
    winScreen.style.display = 'none';
    document.querySelector('.game-container').style.display = 'block';
    scores = { player: 0, computer: 0 };
    updateScores();
    localStorage.setItem('scores', JSON.stringify(scores));
    playAgainBtn.click(); 
});

winRulesBtn.addEventListener('click', () => {
    rulesModal.style.display = "block";
});

function showResult() {
    document.querySelector('.choices').style.display = 'none';
    resultContainer.style.display = 'block';
}

playAgainBtn.addEventListener('click', () => {
    resultContainer.style.display = 'none';
    document.querySelector('.choices').style.display = 'block';
    document.getElementById('player-choice').classList.remove('winner-highlight');
    document.getElementById('computer-choice').classList.remove('winner-highlight');
});

rulesBtn.onclick = () => rulesModal.style.display = "block";
closeBtn.onclick = () => rulesModal.style.display = "none";
window.onclick = (event) => {
    if (event.target == rulesModal) {
        rulesModal.style.display = "none";
    }
}