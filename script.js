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

// Fetch scores from localStorage or initialize to 0
let scores = JSON.parse(localStorage.getItem('scores')) || { player: 0, computer: 0 };
playerScore.textContent = scores.player;
computerScore.textContent = scores.computer;

// Handle each button choice
choiceBtns.forEach(button => {
    button.addEventListener('click', () => playRound(button.dataset.choice));
});

function playRound(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    const winner = getWinner(playerChoice, computerChoice);
    
    displayChoices(playerChoice, computerChoice);
    
    if (winner === 'player') {
        scores.player++;
        resultMessage.textContent = "YOU WIN THIS ROUND";
        document.getElementById('player-choice').classList.add('winner-highlight');
    } else if (winner === 'computer') {
        scores.computer++;
        resultMessage.textContent = "PC WINS THIS ROUND";
        document.getElementById('computer-choice').classList.add('winner-highlight');
    } else {
        resultMessage.textContent = "IT'S A TIE";
    }

    updateScores();
    showResult();
}

// Determine the winner of each round
function getWinner(player, computer) {
    if (player === computer) return 'tie';
    if ((player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')) {
        return 'player';
    }
    return 'computer';
}

// Show the final winner screen when the "Next" button is clicked
nextBtn.addEventListener('click', showWinScreen);

function showWinScreen() {
    document.querySelector('.game-container').style.display = 'none';

    const winMessage = document.querySelector('.win-message');
    const winSubmessage = document.querySelector('.win-submessage');

    // Compare the current scores to determine the winner
    if (scores.player > scores.computer) {
        winMessage.textContent = 'HURRAY!!';
        winSubmessage.textContent = 'YOU WON THE GAME';
    } else if (scores.computer > scores.player) {
        winMessage.textContent = 'OH NO!';
        winSubmessage.textContent = 'PC WON THE GAME';
    } else {
        winMessage.textContent = 'IT\'S A TIE!';
        winSubmessage.textContent = 'NO ONE WINS';
    }

    winScreen.style.display = 'block';
}

// Add one point to the winner's score and reset the game when "Play Again" is clicked
winPlayAgainBtn.addEventListener('click', () => {
    // Increment the score of the winner
    if (scores.player > scores.computer) {
        scores.player++; // Increment player score
    } else if (scores.computer > scores.player) {
        scores.computer++; // Increment computer score
    }

    // Save the updated scores to localStorage
    localStorage.setItem('scores', JSON.stringify(scores));

    // Update the scores on the screen
    updateScores();

    // Reset the game state
    winScreen.style.display = 'none';
    document.querySelector('.game-container').style.display = 'block';

    // Reset the UI for the next round
    playAgainBtn.click(); 
});

// Function to update score display
function updateScores() {
    playerScore.textContent = scores.player;
    computerScore.textContent = scores.computer;
    localStorage.setItem('scores', JSON.stringify(scores)); // Persist the scores
}

// Display the selected choices
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

function showResult() {
    document.querySelector('.choices').style.display = 'none';
    resultContainer.style.display = 'block';
}

// Resetting for a new round
playAgainBtn.addEventListener('click', () => {
    resultContainer.style.display = 'none';
    document.querySelector('.choices').style.display = 'block';
    document.getElementById('player-choice').classList.remove('winner-highlight');
    document.getElementById('computer-choice').classList.remove('winner-highlight');
});

// Rules modal handling
rulesBtn.onclick = () => rulesModal.style.display = "block";
closeBtn.onclick = () => rulesModal.style.display = "none";
window.onclick = (event) => {
    if (event.target == rulesModal) {
        rulesModal.style.display = "none";
    }
};
