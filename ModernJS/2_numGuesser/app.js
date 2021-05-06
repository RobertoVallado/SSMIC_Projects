//values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// use rinterface
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//min and max by html input 
minNum.textContent = min;
maxNum.textContent = max;

// Play again listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){ //DOM targeting only if game is over..good stuff
    window.location.reload();
  }
});
      
// listen guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  
  // input validation
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  if(guess === winningNum){ //then ...
    gameOver(true, `${winningNum} cool, YOU WIN!`);//game over
  } else {
    // Wrong number
    guessesLeft -= 1;

    if(guessesLeft === 0){
      gameOver(false, `Game Over! Correct number was ${winningNum}`);
    } else {
      guessInput.style.borderColor = 'red';
      guessInput.value = '';
      setMessage(`${guess} is incorrect!, ${guessesLeft} guesses left`, 'red');
    }
  }
});

// Game over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color;
  setMessage(msg);

  // try again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

function getRandomNum(min, max){ //random number generator
  return Math.floor(Math.random()*(max-min+1)+min);
}

function setMessage(msg, color){ //message color edits
  message.style.color = color;
  message.textContent = msg;
}