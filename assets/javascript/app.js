$(document).ready(function(){
function arrayPermutation(arr){
	for(var i=0;i<arr.length;i++){
		var newIndex = Math.floor(Math.random()*arr.length);
		var temp = arr[i];
		arr[i]=arr[newIndex];
		arr[newIndex]=temp;
	}
}

function question(){
	this.question = "";
	this.correctAnswer = "";
	this.wrongAnswers = [];
	this.allAnswers = [];
	this.generateAllAnswers =function(){
		this.allAnswers = this.wrongAnswers.slice();
		this.allAnswers.push(this.correctAnswer);
		arrayPermutation(this.allAnswers);
	}
	this.explanation = "";
	this.image = "";
}
 
 var greenName = new question();
 greenName.question = "How did the green sea turtle get its name?";
 greenName.correctAnswer = "The color of its fat";
 greenName.wrongAnswers = ["Named after a person with the last name Green", "The color of its shell", "The color of the food it eats"];
 greenName.generateAllAnswers();
 greenName.explanation = "The green sea turtle was often eaten before it was placed on the endangered species list. It is named for the color of its fat."
 greenName.image ="http://www.seaturtles911.org/image/green-seaturtle-7.jpg";
 

 var lonesomeGeorge = new question();
 lonesomeGeorge.question = "What was the name of the last known pinto island giant tortoise?";
 lonesomeGeorge.correctAnswer = "Lonesome George";
 lonesomeGeorge.wrongAnswers = ["Lonely Henry","Solitary Sam", "Hans Solo"];
 lonesomeGeorge.generateAllAnswers();
 lonesomeGeorge.explanation = "Lonesome George died in 2012 at the approximate age of 100 years."
 lonesomeGeorge.image = "http://i.telegraph.co.uk/multimedia/archive/02406/lonesome-george_2406159b.jpg";

 var largestTurtle = new question();
 largestTurtle.question = "What is the largest species of turtle?";
 largestTurtle.correctAnswer = "Leatherback Turtle";
 largestTurtle.wrongAnswers = ["Galapagos Tortoise", "Aldabra Tortoise", "Loggerhead Turtle"];
 largestTurtle.generateAllAnswers();
 largestTurtle.explanation = "Adult leatherbacks average 1-1.75 m (3.3-5.7 ft) in curved carapace length (CCL), 1.83-2.2 m (6.0-7.2 ft) in total length, and 250 to 700 kg (550 to 1,540 lb) in weight."
 largestTurtle.image = "http://www.dausettrails.com/Feb2011/leatherback.gif";

 var questions = [greenName, lonesomeGeorge, largestTurtle];
 arrayPermutation(questions);

 var questionNumber = 0;
 var correctAnswers = 0;
 var wrongAnswers = 0;
var timeLeft;
var timer;
function countdown(){
	timeLeft--;
	$("#time").html("Time remaining: "+timeLeft);
	if(timeLeft==0){
		clearInterval(timer);
		timesUp();
	}
}

 function startQuestion(){
 	clear();
 	if(questionNumber == questions.length){
 		displayResults();
 	}
 	else{
	 	timeLeft = 8;
	 	timer = setInterval(countdown, 1000);
	 	$("#question").html(questions[questionNumber].question)
	 	//I want to make this nex part a for loop, and work for an arbitray number of answer choices, but can't figure out how.
	 	$(".answer").css("padding", "10px");
	 	$("#choice0").html(questions[questionNumber].allAnswers[0]);
	 	$("#choice1").html(questions[questionNumber].allAnswers[1]);
	 	$("#choice2").html(questions[questionNumber].allAnswers[2]);
	 	$("#choice3").html(questions[questionNumber].allAnswers[3]);
	 }
 }
 function rightAnswer(){
 	clear();
 	clearInterval(timer);
 	$("#rightWrong").css("color", "#00ff00");
 	$("#rightWrong").html("Correct")
 	$(".answer").css("padding", "0px");
 	$("#explanation").html(questions[questionNumber].explanation);
 	$("#image").html("<img src="+questions[questionNumber].image+">");
 	questionNumber++;
 	correctAnswers++;
 	timer = setTimeout(startQuestion, 3000);
 }
 function wrongAnswer(){
 	clearInterval(timer);
 	clear();
 	$(".answer").css("padding", "0px");
 	$("#rightWrong").css("color", "#ff0000");
 	$("#rightWrong").html("Wrong");
 	$("#explanation").html(questions[questionNumber].explanation);
 	$("#image").html("<img src="+questions[questionNumber].image+">");
 	questionNumber++;
 	wrongAnswers++;
 	timer = setTimeout(startQuestion, 3000);
 }
 function timesUp(){
 	clear();
 	$(".answer").css("padding", "0px");
 	$("#rightWrong").css("color", "#000000");
 	$("#rightWrong").html("Time's up!");
 	$("#explanation").html(questions[questionNumber].explanation);
 	$("#image").html("<img src="+questions[questionNumber].image+">");
 	questionNumber++;
 	wrongAnswers++;
 	timer= setTimeout(startQuestion, 3000);
 }
function displayResults(){
	//clearInterval(timer);
	clear();
	$(".answer").css("padding", "0px");
	$("#right").html("Correct Answers: "+ correctAnswers);
	$("#wrong").html("Wrong Answers: "+wrongAnswers);
	questionNumber = 0;
	wrongAnswers = 0;
	correctAnswers = 0;
	timer = setTimeout(startQuestion, 3000);
}
function clear(){
	$("#rightWrong").empty();
	$("#time").empty();
	$("#question").empty();
	$(".answer").empty();
	$("#explanation").empty();
	$("#image").empty();
	$("#right").empty();
	$("#wrong").empty();
}
$(".answer").click(function(){
	console.log($(this).text())
	if($(this).text()==questions[questionNumber].correctAnswer){
		rightAnswer();
	}
	else{
		wrongAnswer();
	}
});



///////////////////////////////////////////////////////////
startQuestion();


});