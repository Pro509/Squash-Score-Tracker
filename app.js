const p1Display = document.querySelector('#p1Display');
const p2Display = document.querySelector('#p2Display');

const scoreSelector = document.querySelector('#toWin')
const p1Button = document.querySelector('#p1Button');
const p2Button = document.querySelector('#p2Button');
const resetButton = document.querySelector('#reset');

let p1Score = parseInt(p1Display.innerText);
let p2Score = parseInt(p2Display.innerText);
let winningScore = 5;
let isGameOver = false;

scoreSelector.addEventListener('change', function(){
    // alert(this.value);
    winningScore = parseInt(this.value)
    reset()
})

p1Button.addEventListener('click', function () {
    if (!isGameOver) {
        p1Score += 1;
        if (p1Score == winningScore) {
            isGameOver = true;
            p1Display.classList.add('has-text-success');
            p2Display.classList.add('has-text-danger');
            p1Button.disabled = true;
            p2Button.disabled = true;
        }
        p1Display.textContent = p1Score;
    }
})

p2Button.addEventListener('click', function () {
    if (!isGameOver) {
        p2Score += 1;
        if (p2Score == winningScore) {
            isGameOver = true;
            p2Display.classList.add('has-text-success')
            p1Display.classList.add('has-text-danger')
            p1Button.disabled = true;
            p2Button.disabled = true;
        }
        p2Display.textContent = p2Score;
    }
})
// p2Button.addEventListener('click', addScore(p2Score))

resetButton.addEventListener('click', reset)

function reset() {
    isGameOver = false;
    p1Score = 0;
    p2Score = 0;
    p1Display.textContent = p1Score;
    p2Display.textContent = p2Score;
    p1Display.classList.remove('has-text-success', 'has-text-danger')
    p2Display.classList.remove('has-text-success', 'has-text-danger')
    p1Button.disabled = false;
    p2Button.disabled = false;
}