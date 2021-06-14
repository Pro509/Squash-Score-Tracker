const player1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
}

const player2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
}

const scoreSelector = document.querySelector('#toWin')
const resetButton = document.querySelector('#reset');

// overlay elements
const overlay = document.querySelector('.modal')
const overlayClose = document.querySelector('.modal-close')
const form = document.querySelector('.form')

function shutOverlay() {
    overlay.classList.remove('is-active');
}

overlayClose.addEventListener('click', shutOverlay)

form.addEventListener('submit', function (el) {
    // prevent page redirection and more, no default behaviour
    el.preventDefault();
    const player1Input = form.elements.player1Name.value;
    const player2Input = form.elements.player2Name.value;
    if (player1Input !== '' && player2Input !== '') {
        player1.button.textContent = `+1 ${player1Input}`;
        player2.button.textContent = `+1 ${player2Input}`;
        shutOverlay();
    } else {
        alert('You didn\'t enter both player names!');
        shutOverlay();
    }
    // shutOverlay()
})

// Tasking
let winningScore = parseInt(scoreSelector.innerText);
let isGameOver = false;

function updateScore(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        if (player.score == winningScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
    }
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

// Event Listeners
scoreSelector.addEventListener('change', function () {
    // alert(this.value);
    winningScore = parseInt(this.value);
    reset();
})

player1.button.addEventListener('click', function () {
    updateScore(player1, player2);
})

player2.button.addEventListener('click', function () {
    updateScore(player2, player1);
})

resetButton.addEventListener('click', reset)



