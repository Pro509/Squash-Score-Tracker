let player1 = {
    name: 'Player 1',
    score: 0,
    wins: 0,
    loses: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display'),
    statsTableName: document.querySelector('#p1NameStats'),
    statsTableWon: document.querySelector('#p1Won'),
    statsTableLost: document.querySelector('#p1Lost')
}

let player2 = {
    name: 'Player 2',
    score: 0,
    wins: 0,
    loses: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display'),
    statsTableName: document.querySelector('#p2NameStats'),
    statsTableWon: document.querySelector('#p2Won'),
    statsTableLost: document.querySelector('#p2Lost')
}

// Main section elements
let gameHistory = document.querySelector('#gameHistory');
const changePlayers = document.querySelector('#changePlayers')
const scoreSelector = document.querySelector('#toWin')
const resetButton = document.querySelector('#reset');
const clearHistButton = document.querySelector('#clearHistory')

// overlay elements and listener
const overlay = document.querySelector('.modal')
const overlayClose = document.querySelector('.modal-close')
const form = document.querySelector('.form')

function shutOverlay() {
    overlay.classList.remove('is-active');
    form.elements.player1Name.value = '';
    form.elements.player2Name.value = '';
}

function openOverlay() {
    overlay.classList.add('is-active');
}

overlayClose.addEventListener('click', shutOverlay)

form.addEventListener('submit', function (el) {
    // prevent page redirection and more, no default behaviour
    el.preventDefault();
    const player1Input = form.elements.player1Name.value;
    const player2Input = form.elements.player2Name.value;
    if (player1Input !== '' && player2Input !== '') {
        player1.name = `${player1Input}`;
        player2.name = `${player2Input}`;
        // Stats table and button to display new names
        for (let p of [player1, player2]){
            p.button.textContent = `+1 ${p.name}`;
            p.statsTableName.textContent = p.name;
        }
        reset();
        clearHistory();
        shutOverlay();
    } else if (player1Input === '' && player2Input === '') {
        // button display name 
        player1.button.textContent = player1.name;
        player2.button.textContent = player2.name;
        // Stats table names
        player1.statsTableName.textContent = 'Player One';
        player2.statsTableName.textContent = 'Player Two';
        reset()
        clearHistory();
        shutOverlay();
    } else {
        alert('You didn\'t enter both player names!');
    }
    // shutOverlay()
})

// Tasking
let winningScore = parseInt(scoreSelector.textContent);
let isGameOver = false;

function updateScore(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
            emptyListText.className = 'is-hidden';
            addHistory(player, opponent);
        }
        player.display.textContent = player.score;
    }
}

function addHistory(winner, loser) {
    const record = document.createElement('li');
    // record.className = 'ml-3';
    record.textContent = `${winner.name} wins ${winner.score} to ${loser.score}`;
    winner.wins += 1;
    loser.loses += 1;
    // Update player stats table
    winner.statsTableWon.textContent = winner.wins;
    loser.statsTableLost.textContent = loser.loses;
    gameHistory.appendChild(record);
}

function reset() {
    isGameOver = false;
    for (let p of [player1, player2]) {
        p.score = 0;
        p.display.textContent = p.score;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
}

function clearHistory() {
    const emptyListText = document.querySelector('#emptyListText')
    emptyListText.className = '';
    gameHistory.innerHTML = "";
    for (let p of [player1, player2]) {
        p.wins = 0;
        p.loses = 0;
        p.statsTableWon.textContent = p.wins;
        p.statsTableLost.textContent = p.loses;
    }
}

// Event Listeners
changePlayers.addEventListener('click', openOverlay);

scoreSelector.addEventListener('change', function () {
    // alert(this.value);
    winningScore = parseInt(this.value);
    reset();
    clearHistory();
})

player1.button.addEventListener('click', function () {
    updateScore(player1, player2);
})

// removes double click zoom
player1.button.addEventListener('dblclick', function (e) {
    e.preventDefault();
})

player2.button.addEventListener('click', function () {
    updateScore(player2, player1);
})

// removes double click zoom
player2.button.addEventListener('dblclick', function (e) {
    e.preventDefault();
})

resetButton.addEventListener('click', reset);

clearHistButton.addEventListener('click', clearHistory);

