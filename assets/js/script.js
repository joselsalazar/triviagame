// Series Loop - Stores Questions / Answers
var series = [
	{
		question: "In Aladdin, what is the name of Jasmine's pet tiger?",
		answer: ['Rajah', 'Tralfamador', 'Water Bear', 'Abu'],
		correct: 0
	},
	{
		question: "In Peter Pan, Captain Hook had a hook on which one of his hands?",
		answer: ["His Right", "His Left", "None"],
		correct: 1	
	},
	{
		question: "What is now considered the fastest ride in Walt Disney World?",
		answer: ["Space Mountain", "Test Track", "Indiana Jones", "Big Thunder Mountain"],
		correct: 1	
	},
	{
		question: "In the Lion King, where does Mufasa and his family live?",
		answer: ["The Ghetto", "Neverland", "The Grotto", "Pride Rock"],
		correct: 3	
	},
	{
		question: "In Dumbo, where is Mrs. Jumbo when the stork delivers her baby?",
		answer: ["The gym", "The circus", "The train", "Jail"],
		correct: 2
	},
	{
		question: "In Beauty and the Beast, how many eggs does Gaston eat for breakfast every day?",
		answer: ['5 dozen', 'Just one', '2 with ham', 'Green Eggs and Ham'],
		correct: 0
	},
	{
		question: "During the battle with Aladdin, what type of animal does Jafar transform himself into?",
		answer: ["Hamster", "Cobra", "Rabbit", "Giant Lizard"],
		correct: 1	
	},
	{
		question: "After being on earth, where did Hercules first meet his father Zeus?",
		answer: ["Mount Olympus", "Greece", "His House", "Temple of Zeus"],
		correct: 3	
	},
	{
		question: "In Toy Story, what game does the slinky play?",
		answer: ["Parchese", "Checkers", "Chess", "Etch-a-Sketch"],
		correct: 1	
	},
	{
		question: "What was the first roller coaster attraction at Walt Disney World?",
		answer: ["Alice in Wonderland Adventures", "Splash Mountain", "Space Mountain", "Big Thunder Mountain"],
		correct: 2	
	}
];

// Globals
var score = 0;
var wrongScore = 0;
var e = 0;
var timeLeft = 30;
var randomNum = 0;

// Initial Start Screen
$('.click-start').click(function() {
	$('.start').hide();
	game();
});

// Game Function
function game() {
	// Show Timer
	thirtySeconds(); // Removes Delay
	var timer = setInterval(thirtySeconds, 1000);

	function thirtySeconds() {
		if (timeLeft > 10) {
			$('.timer').html(timeLeft + " seconds remaining!");
			timeLeft--;
		} else if (timeLeft > 0) {
			$('.timer').addClass('red').html(timeLeft + " seconds remaining!");
			timeLeft--;
		} else {
			clearInterval(timer);
			loseScreen();
		}
	};

	// Random Number Generator
	function generateRandomNum() {
		randomNum = Math.floor(Math.random() * 5) + 1;
		return randomNum;
	}

	// Outcomes
	function resetScreen() {
		clearInterval(timer);
		timeLeft = 30;
		$('.trivia-game, .question, .timer').empty();
		$('.timer').removeClass('red');
		generateRandomNum();
	}

	function eCheck() {
		e++;
		if (e < series.length) {
			setTimeout(game, 2500);
		} else {
			setTimeout(gameOver, 2500);
		}
	}

	function winScreen() {
		score++;
		resetScreen();
		$('.trivia-game').html('<h2>Correct!</h2>' +
			'<img src="assets/img/winner-' + randomNum + '.gif">');
		eCheck();
	};

	function loseScreen() {
		wrongScore++;
		resetScreen();
		$('.trivia-game').html('<h2>Wrong!</h2>' +
			'<img src="assets/img/loser-' + randomNum + '.gif">' + 
			'<h2>Correct Answer:' + series[e].answer[series[e].correct] + '</h2>');
		eCheck();
	};

	// Series Loop - Loops Through Questions and Answers
	function seriesLoop() {
		// Show Question and Clear
		$('.question').html("<h1>" + series[e].question + "</h1>");
		$('.trivia-game').empty();

		// Populates Answers
		for (var i = 0; i < series[e].answer.length; i++) {
			$('.trivia-game').append('<button>' + series[e].answer[i] + '</button>');

			if (i === series[e].correct) {
				$('button:last').addClass('correct');
			}
		}
	};

	seriesLoop();

	function rankPlayer() {
		if (score >= 9) {
			$('.trivia-game').append('<h2>Your Rank:</h2><br><h3>Sorcerer Mickey! You are the nerdiest of Disney Nerds! Go back to your nerd cave!</h3><img src="assets/img/sorcerer-mickey.png">');
		} else if (score >= 7) {
			$('.trivia-game').append('<h2>Your Rank:</h2><br><h3>Woody! You are pretty savvy with Disney Trivia, but you missed a few so you ain\'t so hot.</h3><img src="assets/img/woody.png">');
		} else if (score >= 5) {
			$('.trivia-game').append('<h2>Your Rank:</h2><br><h3>Pinocchio! You really don\'t know that much, but you lie about it well!</h3><img src="assets/img/pinocchio.png">');
		} else if (score >= 3) {
			$('.trivia-game').append('<h2>Your Rank:</h2><br><h3>Donald Duck! You mean well, but no one can understand you so you get everything wrong.</h3><img src="assets/img/donald-duck.png">');
		} else if (score >= 1) {
			$('.trivia-game').append('<h2>Your Rank:</h2><br><h3>Ariel! You are a very beautiful person. But you use a fork for a brush so you\'re pretty dumb at this point.</h3><img src="assets/img/ariel.png">');
		} else {
			$('.trivia-game').append('<h2>Your Rank:</h2><br><h3>Dopey! You got all of them wrong. You\'re either really stupid, or just hate Disney.</h3><img src="assets/img/dopey.png">');
		}
	}	

	// Re-Usable Game Over
	function gameOver() {
		$('.trivia-game, .question, .timer').empty();
		$('.trivia-game').html('<h2>Game Over!</h2>' + 
			"<h2> Your Score: " + score + "</h2>" +
			'<h2>Your Wrong Answers: ' + wrongScore + '</h2>');
		rankPlayer();
		$('.timer').html('<button id="play-again">Play Again!</button>');
		$('#play-again').click(function () {
			$('.trivia-game, .timer').empty();
			e = 0;
			score = 0;
			wrongScore = 0;
			game();
		});
	};

	// Checks Selected Button
	$('button').click(function() {
		// Correct Condition
		if ($(this).hasClass('correct')) {
			winScreen();
		// Wrong Condition
		} else {
			loseScreen();
		}
	});
};