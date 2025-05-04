const quizData = [
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Mars"
    },
    {
      question: "What is the largest ocean on Earth?",
      choices: ["Atlantic", "Indian", "Pacific", "Arctic"],
      answer: "Pacific"
    },
    {
      question: "What language is used for web apps?",
      choices: ["Python", "JavaScript", "C++", "Java"],
      answer: "JavaScript"
    },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionEl = document.getElementById("question");
  const choicesEl = document.getElementById("choices");
  const nextBtn = document.getElementById("next-btn");
  const resultEl = document.getElementById("result");
  const scoreEl = document.getElementById("score");
  const restartBtn = document.getElementById("restart-btn");
  
  function loadQuestion() {
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
  
    currentQuestion.choices.forEach(choice => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = choice;
      button.classList.add("choice-btn");
      button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
      li.appendChild(button);
      choicesEl.appendChild(li);
    });
  }
  
  function resetState() {
    nextBtn.classList.add("hidden");
    choicesEl.innerHTML = "";
  }
  
  function selectAnswer(button, correctAnswer) {
    const isCorrect = button.textContent === correctAnswer;
    if (isCorrect) score++;
  
    Array.from(document.getElementsByClassName("choice-btn")).forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === correctAnswer) {
        btn.style.backgroundColor = "#28a745"; // Green for correct
      } else if (btn === button) {
        btn.style.backgroundColor = "#dc3545"; // Red for incorrect
      }
    });
  
    nextBtn.classList.remove("hidden");
  }
  
  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  });
  
  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultEl.classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    loadQuestion();
  });
  
  function showResult() {
    document.getElementById("quiz").classList.add("hidden");
    resultEl.classList.remove("hidden");
    scoreEl.textContent = `You scored ${score} out of ${quizData.length}!`;
  }
  
  loadQuestion();
  