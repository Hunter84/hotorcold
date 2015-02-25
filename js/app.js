$(document).ready(function(){
	
	var randomNumber;
	var guessFlag;
	var guessCount;
	var userChoice;
	var found = false;

	newGame();

	$("form").submit(function(event){
		
		event.preventDefault();
    	
    	if (!found) {
			userChoice = $('#userGuess').val();
			console.log("User Choice = "+ userChoice);
			clearText();
			setFocus();
			guessFlag = checkChoice(userChoice);
			if (!guessFlag) {
				guessCount++;
				setCount(guessCount);
				$("ul#guessList").append("<li>" + userChoice + "</li>");
				guessFlag = checkTemparature(Math.abs(randomNumber - userChoice));
			};
		} else {
			setFeedback("You Won this game already! You need to start a new game.");
		};
  	});

  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	$(".new").click(function(event){
  		event.preventDefault();
  		newGame();
  	});

	function newGame() {
		guessFlag = true;
		guessCount = 0;
		found = false;
		$("ul#guessList li").remove();
		setFeedback("Make your Guess!");
		setCount(guessCount);
		randomNumber = randNumb();
		setFocus();
		clearText();
	}

	function randNumb() {

		var randNumb = Math.floor((Math.random()*100)+1);
		console.log("Generated Random Number = "+ randNumb);

		return randNumb;
	}
	
	function setFocus() {
		document.getElementById("userGuess").focus();
	}

	function clearText() {
		$('#userGuess').val('');
	}

	function setCount(count) {
		$('#count').text(guessCount);
	}

	function getChoice() {
		var userChoice = prompt("Guess the Number","Your Guess");
		return userChoice;
	}

	function checkChoice(userChoice) {
		if (isNaN(userChoice)) {
			setFeedback("No luck! I accept only numbers.");
			return true;
		} else if (userChoice < 1 || userChoice > 100) {
			setFeedback("Oops! Your guess has to be a number between 1 and 100!");
			return true;
		}else if ($.trim(userChoice) == '') {
			setFeedback("Please enter your guess!");
			return true;
		} else {
			return false;
		};
	}

	function checkTemparature(guessDiff) {

		if (guessDiff == 0) {
			setFeedback("You Win");
			found = true;
			return false;
		} else if (guessDiff <= 5) {
			setFeedback("You're on fire!");
			return true;
		} else if (guessDiff <= 10){
			setFeedback("Your Guess is getting hot!");
			return true;
		} else if (guessDiff>=10 && guessDiff <= 20) {
			setFeedback("You're warming up!");
			return true;
		} else if (guessDiff>=20 && guessDiff <= 30) {
			setFeedback("You're getting cold");
			return true;
		} else if (guessDiff>=30 && guessDiff <= 40) {
			setFeedback("You're' getting very cold!");
			return true;
		} else {
			setFeedback("You're freezing cold!");
			return true;
		}

	}

	/*--- Set the feedback ---*/
	function setFeedback(feedback) {
		$('#feedback').text(feedback);
	}

});



