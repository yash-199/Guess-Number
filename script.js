let randomNumber = parseInt(Math.random() * 100 + 1);
console.log(randomNumber);

const loworhigh_Msg = document.querySelector('.alertMsg');
const userGuess = document.querySelector('#number');
const submitBtn = document.querySelector('#submitGuess');
const guessesSlot = document.querySelector('.preGuess');
const chanceLeft = document.querySelector('.remainingChance');
const startOver = document.querySelector('.result');

let prevGuess = [];
let numGuess = 1;

const p = document.createElement('p');

let playGame = true;

if (playGame) {
    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(userGuess.value);
        console.log(guess);
        validateGuess(guess);
    })
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Please enter valid number')
    } else if (guess < 1) {
        alert('Please enter more than one')
    } else if (guess > 100) {
        alert('Please enter number less than 100');
    } else {
        prevGuess.push(guess);
        if (numGuess === 11) {
            displayGuess(guess);
            loworhigh_Msg.innerHTML = `Game over. Random number was ${randomNumber}`;
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        loworhigh_Msg.innerHTML = `You Guessed right Number`;
        endGame();
    } else if (guess > randomNumber) {
        loworhigh_Msg.innerHTML = `Your Guessed is to HIGH`;
    } else if (guess < randomNumber) {
        loworhigh_Msg.innerHTML = `Your Guesses is to LOW`;
    }
}

function displayGuess(guess) {
    userGuess.value = '';
    guessesSlot.innerHTML += `${guess},`;
    numGuess++;
    chanceLeft.innerHTML = `:${12 - numGuess}`;
}

function endGame() {
    userGuess.value = '';
    userGuess.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame" class="heading">Start New Game</h2>`;
    startOver.appendChild(p);
    newGame(); // Call newGame() inside endGame()
}

function newGame() {
    const newGame = document.querySelector('#newGame');
    newGame.addEventListener('click', function () {
        window.location.reload(); 
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;
        guessesSlot.innerHTML = '';
        chanceLeft.innerHTML = `${11 - numGuess}`; // Corrected number of chances
        loworhigh_Msg.innerHTML = `Start Game`;
        userGuess.removeAttribute('disabled', '');
        startOver.removeChild(p);
        playGame = true;
    });
}