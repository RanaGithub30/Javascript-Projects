let yourAnswers = {};
let yourTotalMarks = 0;
let timerInterval;
const questionTimeLimit = 15; // seconds


const questionsData = {
  html: {
    questions: [
      'What is the correct HTML element for inserting a line break?',
      'Which HTML element is used for the largest heading?',
      'What does the <a> tag define?',
      'Which attribute is used to specify an image source in HTML?',
      'Which property is used to change the background color?'
    ],
    options: [
      ['<br>', '<lb>', '<break>', '<line>'],
      ['<heading>', '<h6>', '<h1>', '<head>'],
      ['An anchor/link', 'A paragraph', 'A line break', 'A header'],
      ['href', 'alt', 'src', 'image'],
      ['background', 'color', 'background-color', 'bg']
    ],
    answers: ['<br>', '<h1>', 'An anchor/link', 'src', 'background-color']
  },
  php: {
    questions: [
      'What does PHP stand for?',
      'Which symbol is used to define a variable in PHP?',
      'Which method is used to retrieve data in Laravel controller?',
      'Which command creates a Laravel project?',
      'What file stores Laravel environment configuration?'
    ],
    options: [
      ['Personal Home Page', 'Private Home Page', 'PHP Hypertext Preprocessor', 'Predefined Hyper Processor'],
      ['#', '$', '&', '%'],
      ['input()', 'request()', 'fetch()', 'data()'],
      ['php laravel:new', 'laravel new projectname', 'create laravel', 'laravel start'],
      ['.env', 'config.php', 'settings.ini', 'env.config']
    ],
    answers: ['PHP Hypertext Preprocessor', '$', 'request()', 'laravel new projectname', '.env']
  },
  node: {
    questions: [
      'Which command initializes a Node.js project?',
      'What is Express.js?',
      'Which method is used to read a file in Node.js?',
      'Which object is used to handle file paths?',
      'How do you export a function in Node.js?'
    ],
    options: [
      ['npm start', 'node init', 'npm init', 'node start'],
      ['A JavaScript library', 'A database', 'A framework for Node.js', 'A CSS framework'],
      ['fs.read()', 'fs.readFile()', 'fs.open()', 'fs.loadFile()'],
      ['os', 'fs', 'path', 'dir'],
      ['export = myFunc', 'module.export', 'exports.myFunc', 'module.exports = myFunc']
    ],
    answers: ['npm init', 'A framework for Node.js', 'fs.readFile()', 'path', 'module.exports = myFunc']
  },
  sql: {
    questions: [
      'Which SQL keyword is used to retrieve data?',
      'Which clause is used to filter records?',
      'What does JOIN do in SQL?',
      'Which keyword deletes all records from a table?',
      'What is the default port for MySQL?'
    ],
    options: [
      ['GET', 'RETRIEVE', 'SELECT', 'PULL'],
      ['WHERE', 'FILTER', 'GROUP', 'HAVING'],
      ['Combines columns', 'Combines rows from tables', 'Deletes duplicates', 'Indexes the table'],
      ['REMOVE', 'DELETE', 'TRUNCATE', 'DROP'],
      ['3306', '8080', '5432', '1433']
    ],
    answers: ['SELECT', 'WHERE', 'Combines rows from tables', 'TRUNCATE', '3306']
  }
};

let currentTopic = '';
let currentQuestion = 1;
let totalQuestions = 0;

document.getElementById('topic_submit').addEventListener('click', selectTopic);
document.getElementById('save_next').addEventListener('click', saveAndNext);
document.getElementById('skip').addEventListener('click', skip);
document.getElementById('previous').addEventListener('click', previous);
document.getElementById('submit').addEventListener('click', submit);
document.getElementById('cancel').addEventListener('click', cancel);

function selectTopic() {
  const topic = document.getElementById('topics').value;
  if (!topic) {
    alert('Please select a topic');
    return;
  }

  currentTopic = topic;
  totalQuestions = questionsData[topic].questions.length;

  displayAndHideDivs('topic');
  loadQuestion(currentQuestion);
}

function loadQuestion(qNo) {
  if (qNo < 1 || qNo > totalQuestions) return;

  const questionData = questionsData[currentTopic];
  const questionText = document.getElementById('question_text');
  const questionNoElem = document.getElementById('question_no');
  const currentQno = document.getElementById('current_ques');

  const question = questionData.questions[qNo - 1];
  const options = questionData.options[qNo - 1];

  questionText.textContent = question;
  questionNoElem.textContent = qNo;
  currentQno.textContent = `${qNo} of ${totalQuestions}`;

  options.forEach((option, index) => {
    document.querySelector(`label[for="option${index + 1}"]`).textContent = option;
    document.getElementById(`option${index + 1}`).value = option;
    document.getElementById(`option${index + 1}`).checked = false;
  });

  document.getElementById('previous').disabled = qNo <= 1;
}

function saveAndNext() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (selected) {
    yourAnswers[currentQuestion] = selected.value;
  }

  if (currentQuestion < totalQuestions) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  }
}

function skip() {
  if (currentQuestion < totalQuestions) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  }
}

function previous() {
  if (currentQuestion > 1) {
    currentQuestion--;
    loadQuestion(currentQuestion);
  }
}

function cancel() {
  displayAndHideDivs('cancle');
}

function submit() {
  const correctAnswers = questionsData[currentTopic].answers;
  let correct = 0;
  let incorrect = 0;

  for (let i = 1; i <= totalQuestions; i++) {
    if (yourAnswers[i] === correctAnswers[i - 1]) {
      correct++;
    } else {
      incorrect++;
    }
  }

  const scorePercent = ((correct / totalQuestions) * 100).toFixed(2);

  document.getElementById('quiz').style.display = 'none';
  document.getElementById('marks_div').style.display = 'block';

  let resultHTML = `
    <h2>Result</h2>
    <p>Total Questions: ${totalQuestions}</p>
    <p>Correct Answers: ${correct}</p>
    <p>Incorrect Answers: ${incorrect}</p>
    <p>Score: ${scorePercent}%</p>
  `;

  // Show a congratulatory effect if user passes (>= 60%)
  if (scorePercent >= 60) {
    resultHTML += `<div class="alert alert-success mt-3"><strong>🎉 Congratulations! You passed the quiz!</strong></div>`;

    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  } else {
    resultHTML += `<div class="alert alert-danger mt-3"><strong>😞 You did not pass. <a href="index.html">Try again!</a></strong></div>`;
  }

  document.getElementById('marks_div').innerHTML = resultHTML;
}

function displayAndHideDivs(type) {
  const topicDiv = document.getElementById('select_topic');
  const quizDiv = document.getElementById('quiz');
  const resultDiv = document.getElementById('marks_div');

  if (type === 'topic') {
    topicDiv.style.display = 'none';
    quizDiv.style.display = 'block';
  } else {
    topicDiv.style.display = 'block';
    quizDiv.style.display = 'none';
    resultDiv.style.display = 'none';
  }
}