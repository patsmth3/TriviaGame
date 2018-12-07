var panel = $('#quiz-area');
var countStartNumber = 30;


///////////////////////////////////////////////////////////////////////////////

//CLICK EVENTS

///////////////////////////////////////////////////////////////////////////////

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

///////////////////////////////////////////////////////////////////////////////


//Question set


///////////////////////////////////////////////////////////////////////////////

var questions = [{
  question: "Who was the first Saints player to lead the NFL in rushing after a regular season?",
  answers: ["Jim Everett", "Aaron Brooks", "George Rogers", "Archie Manning"],
  correctAnswer: "George Rogers",
}, {
  question: "Who was the first Saints quarterback to pass for over 400 yards in a NFL season?",
  answers: ["Bobby Herbert", "Brew Brees", "Jim everett", "Archie Manning"],
  correctAnswer: "Drew Brees",
}, {
  question: "Over the course of 9 NFL seasons, Saints quarterback Drew Brees has thrown 316 touchdown passes. After he joined NO in 2006 who was the Saint player that caught a touchdown pass from him?",
  answers: ["Marques Colston", "Billy Miller", "Reggie Bush", "Terrence Cooper"],
  correctAnswer: "Marques Colston",
}, {
  question: "Who did the Saints beat in their first ever overtime victory?",
  answers: ["Seattle, 1977", "St. Louis, 1974", "Green Bay, 1981", "Chicago, 1983"],
  correctAnswer: "Chicago, 1983",
}, {
  question: "The Saints began play in the Louisiana Super Dome in 1975. Who was the first opponent they defeated at the Super Dome?",
  answers: ["Tampa Bay", "Denver", "Pittsburgh", "Breen Bay", "Atlanta"],
  correctAnswer: "Green Bay",
}, {
  question: "Back in the day, we didn't have many players that made the Pro Bowl but we had a few.  Who was the first Saint player to make the Pro Bowl",
  answers: ["Archie Manning", "Dave Whitshell", "Rickey Jackson", "Chuck Muncie", "Tommy Myers"],
  correctAnswer: "Dave Whitshell",
}, {
  question: "What was the year the Saints finally did not have a loosing season?",
  answers: ["1990", "1979", "1980", "1985", "1977"],
  correctAnswer: "1979",
}, {
  question: "Who wa the first Saint player to have over 1000 yards receiving in a season?",
  answers: ["Danny Abramowicz", "Joe Horn", "Eric Martin", "Dave Parks", "Wes Chandler"],
  correctAnswer: "Danny Abramowicz",
}];



var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },

  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },

  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer is: ' + questions[this.currentQuestion].correctAnswer);

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
  },

  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer is: ' + questions[game.currentQuestion].correctAnswer + '</h3>');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};