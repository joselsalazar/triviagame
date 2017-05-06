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
		correct: 2	
	}
];

var score = 0;
var e = 0;

$('.click-start').click(function() {
	$('.click-start').hide();
	game();
});

function game() {
	seriesLoop();

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

	// Generate Score
	$('.score').html("<h2> Your Score:" + score + "</h2>");

	// Checks Selected Button
	$('button').click(function() {
		if ($(this).hasClass('correct')) {
			console.log("Correct!");
			score++;
			$('.trivia-game').empty();
			e++;
			game();
		} else {
			console.log("Wrong!");
			$('.trivia-game').empty();
			e++;
			game();
		}

		// Adds Score
		$('.score').html("<h2> Your Score:" + score + "</h2>");
	});

};