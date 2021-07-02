let min = 1, max = 100, winningNum = getRandomNum(min,max), totalGuesses = 5, guessLeft = totalGuesses;

const
	game = document.querySelector('#game'),
	minNum = document.querySelector('.min-num'),
	maxNum = document.querySelector('.max-num'),
	guessBtn = document.querySelector('#guess-btn'),
	guessInput = document.querySelector('#guess-input'),
	message = document.querySelector('.message');

// Assign Min and Max
minNum.textContent = min;
maxNum.textContent = max;

// Play Again Event Listener
game.addEventListener('mousedown',function(e){
	if(e.target.classList.contains('play-again'))
	{
		window.location.reload();
	}
});

// Listen for guess
guessBtn.addEventListener('click',function(){
	let guess = parseInt(guessInput.value);
	if(isNaN(guess) || guess < min || guess > max)
	{
		setMessage(`Please enter a number between ${min} and ${max}`,'red');
		setTimeout(clearMessage,5000);
	}
	else if(guess === winningNum)
	{
		// disable input
		guessLeft--;
		// guessBtn.value = 'Restart';
		// guessBtn.disabled = true;
		// guessInput.disabd = true;
		// guessInput.style.borderColor = 'green';
		if(totalGuesses - guessLeft === 1)
		{
			gameOver(true,`Congrats you have guessed the correct number in ${totalGuesses - guessLeft} guess!!`);
		}
		else{
			gameOver(true,`Congrats you have guessed the correct number in ${totalGuesses - guessLeft} guesses!!`);
		}
	}
	else if(guess < winningNum)
	{
		guessLeft--;
		guessInput.value = '';
		if(guessLeft === 0)
		{
			// guessBtn.value = 'Restart';
			// guessInput.disabled = true;
			// guessInput.style.borderColor = 'red';
			gameOver(false,`You have lost. The winning number was ${winningNum}.`);
		}
		else
		{
			guessInput.style.borderColor = 'red';
			guessBtn.style.borderColor = 'red' ;
			setMessage(`${guess} is less than Winning Number. You have ${guessLeft} guesses left.`,'red');
		}
	}
	else if(guess > winningNum)
	{
		guessLeft--;
		guessInput.value = '';
		if(guessLeft === 0)
		{
			// guessBtn.value = 'Restart';
			// guessInput.disabled = true;
			// guessInput.style.borderColor = 'red';
			gameOver(false,`You have lost. The winning number was ${winningNum}.`);
		}
		else
		{
			guessInput.style.borderColor = 'red';
			guessBtn.style.borderColor = 'red' ;
			setMessage(`${guess} is more than Winning Number. You have ${guessLeft} guesses left.`,'red');
		}	
	}
});

function setMessage(msg,color){
	message.style.color = color;
	message.textContent = msg;
}

function clearMessage(){
	message.textContent = '';
	guessInput.style.borderColor = '#bbb';
	guessBtn.style.borderColor = '#bbb';
}

function gameOver(won,msg){
	let color;
	won === true ? color = 'green' : color = 'red';

	guessBtn.value = 'Play Again';
	guessInput.disabled = true;
	guessInput.style.borderColor = color;
	guessBtn.style.borderColor = color;
	setMessage(msg,color);
	guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(min,max){
	return Math.floor(Math.random()*(max - min+1) + min);
}