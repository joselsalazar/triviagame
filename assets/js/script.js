var series = [
	{
		question: "What lives on your eyelashes?",
		answer: ['Mites', 'Tralfamadorians', 'Water Bears', 'Lice'],
		class: [1,2,3,4],
		correct: 0
	},
	{
		question: "Only what percent of your cells are human?",
		answer: ["75", "5", "2", "10"],
		class: [1,2,3,4],
		correct: 3	
	},
	{
		question: "On average, how much mucus does the human body produce?",
		answer: ["500 Milliliters", "2 Liters", "1 Liter", "250 Milliliters"],
		class: [1,2,3,4],
		correct: 1	
	}
];

var score = 0;
var wrongScore = 0;
var e = 0;
var timeLeft = 30;

$('.click-start').click(function() {
	$('.click-start').hide();
	game();
});

// Game Function
function game() {
	// Show Timer
	thirtySeconds(); // Removes Delay
	var timer = setInterval(thirtySeconds, 1000);

	function thirtySeconds() {
		if (timeLeft > 0) {
			$('.timer').html(timeLeft + " seconds remaining!");
			timeLeft--;
		} else {
			clearInterval(timer);
			wrong();
		}
	}

	// Series Loop - Loops Through Questions and Answers
	function seriesLoop() {
		// Show Question
		$('.question').html("<h1>" + series[e].question + "</h1>");

		// Populates Answers
		for (var i = 0; i < series[e].answer.length; i++) {
			$('.trivia-game').append('<button>' + series[e].answer[i] + '</button>');

			if (i === series[e].correct) {
				$('button:last').addClass('correct');
			}
		}
	};

	seriesLoop();

	// Re-Usable Game Over
	function gameOver() {
		$('.trivia-game, .question').empty();
		$('.trivia-game').html('<h2>Game Over!</h2>' + 
			"<h2> Your Score: " + score + "</h2>" +
			'<h2>Your Wrong Answers: ' + wrongScore + '</h2>');
	}

	function wrong() {
		console.log("Wrong!");
		clearInterval(timer);
		timeLeft = 30;
		wrongScore++;
		$('.trivia-game').empty();
		e++;
		if (e < series.length) {
			game();
		} else {
			gameOver();
		}
	}

	function right() {
		console.log("Correct!");
		clearInterval(timer);
		timeLeft = 30;
		score++;
		$('.trivia-game').empty();
		e++;
		if (e < series.length) {
			game();
		} else {
			gameOver();
		}
	}

	// Checks Selected Button
	$('button').click(function() {
		// Correct Condition
		if ($(this).hasClass('correct')) {
			right();
		// Wrong Condition
		} else {
			wrong();
		}
	});

};