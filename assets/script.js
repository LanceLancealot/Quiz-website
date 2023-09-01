// Array of questions with options and correct answers
const questions = [
  {
    question: 'What is the correct syntax for declaring a variable in JavaScript?',
    options: ['variable x;', 'var x;', 'v x;', 'var = x;'],
    correctAnswer: 1
  },
  {
    question: 'What is the result of the expression: 3 + 2 + "7"?',
    options: ['12', '57', '37', '5'],
    correctAnswer: 2
  },
  {
    question: 'Which JavaScript keyword is used to create a function?',
    options: ['method', 'function', 'def', 'create'],
    correctAnswer: 1
  },
  {
    question: 'What is the purpose of the "return" statement in a function?',
    options: ['To end the function', 'To print a value', 'To declare a variable', 'To return the function itself'],
    correctAnswer: 1
  },
  {
    question: 'What is the output of the following code:\nconsole.log(2 + "2" - 1);',
    options: ['22', '21', '1', '3'],
    correctAnswer: 1
  }
];

// Getting references to HTML elements
var questionContainer = document.getElementById('question');
var optionsContainer = document.getElementById('options');
var resultContainer = document.getElementById('result-container');
var scoreSpan = document.getElementById('score');
var initialsInput = document.getElementById('initials');
var saveScoreButton = document.getElementById('save-score');
var timerValue = document.getElementById('timer-value'); // Timer display

// Initialize variables for quiz and timer
var currentQuestionIndex = 0;
var score = 0;
var timeLeft = 60;
var timerInterval;

// Function to display the saved scores as a scoreboard
function displayScoreboard() {
  var scoreboard = document.getElementById('scoreboard');
  var scoreList = document.getElementById('score-list');
  scoreboard.classList.remove('hidden');
  
  // Retrieve saved scores from local storage
  var savedScores = JSON.parse(localStorage.getItem('savedScores'));
  scoreList.innerHTML = ''; // Clear previous content
  
  if (savedScores) {
    savedScores.forEach(function(savedScore) {
      var listItem = document.createElement('li');
      listItem.textContent = savedScore.initials + ': ' + savedScore.score + '/' + savedScore.totalQuestions;
      scoreList.appendChild(listItem);
    });
  } else {
    var noScoresItem = document.createElement('li');
    noScoresItem.textContent = 'No scores available.';
    scoreList.appendChild(noScoresItem);
  }
  
  // Hide other sections
  resultContainer.style.display = 'none';
  quizContainer.style.display = 'none';
}

// Event listener for the "Save" button
saveScoreButton.addEventListener('click', function() {
  var initials = initialsInput.value;
  if (initials) {
    var savedData = {
      initials: initials,
      score: correctAnswers,
      totalQuestions: questions.length
    };
    
    // Retrieve existing scores from local storage
    var savedScores = JSON.parse(localStorage.getItem('savedScores')) || [];
    savedScores.push(savedData);
    
    // Store updated scores in local storage
    localStorage.setItem('savedScores', JSON.stringify(savedScores));
    
    // Provide a message or any other action you want to take after saving
    alert('Score saved successfully!');
    
    // Clear input and show scoreboard
    initialsInput.value = '';
    displayScoreboard();
  } else {
    alert('Please enter your initials before saving.');
  }
});

// Function to start the quiz
function startQuiz() {
  startTimer();
  displayQuestion(currentQuestionIndex);
}

// Function to display a question and its options
function displayQuestion(questionIndex) {
  var question = questions[questionIndex];
  questionContainer.innerHTML = ''; // Clear previous content

  // Create and append question element
  var questionElement = document.createElement('h2');
  questionElement.textContent = question.question;
  questionContainer.appendChild(questionElement);

  // Create and append options list with buttons
  var optionsList = document.createElement('ul');
  optionsList.id = 'options-' + questionIndex;
  question.options.forEach(function(option, index) {
    var optionItem = document.createElement('li');
    var optionButton = document.createElement('button');
    optionButton.textContent = option;
    optionButton.onclick = function() {
      checkAnswer(index);
    };
    optionItem.appendChild(optionButton);
    optionsList.appendChild(optionItem);
  });
  optionsContainer.innerHTML = ''; // Clear previous content
  optionsContainer.appendChild(optionsList);
}

var correctAnswers = 0; // Counter for correct answers

// Function to check the selected answer
function checkAnswer(selectedOption) {
  var question = questions[currentQuestionIndex];
  if (selectedOption === question.correctAnswer) {
    correctAnswers++; // Increment correct answers
  } else {
    timeLeft -= 10; // Penalty for wrong answer
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion(currentQuestionIndex);
  } else {
    endQuiz();
  }
}


// Function to end the quiz and display the score
function endQuiz() {
  clearInterval(timerInterval);
  questionContainer.innerHTML = '';
  optionsContainer.innerHTML = '';

  // Display the fraction of correct answers over total questions
  var fraction = correctAnswers + ' / ' + questions.length;
  scoreSpan.textContent = fraction;
  resultContainer.style.display = 'block';
}

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(function() {
      timeLeft--;
      if (timeLeft <= 0) {
          endQuiz();
      }
      // Update timer display
      timerValue.textContent = timeLeft;
  }, 1000);
}



saveScoreButton.addEventListener('click', function() {
  var initials = initialsInput.value;
  if (initials) {
    var savedData = {
      initials: initials,
      score: correctAnswers,
      totalQuestions: questions.length
    };

    var savedScores = JSON.parse(localStorage.getItem('savedScores')) || [];
    savedScores.push(savedData);
    localStorage.setItem('savedScores', JSON.stringify(savedScores));

    // Provide a message or any other action you want to take after saving
    alert('Score saved successfully!');
    initialsInput.value = ''; // Clear input
    displayScoreboard();
  } else {
    alert('Please enter your initials before saving.');
  }
});

// Start the quiz when the page loads
startQuiz();