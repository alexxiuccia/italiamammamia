let questions = [];
let current = 0;
let score = 0;

fetch('frasi_lessicali_reali_base.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    showQuestion();
  });

function showQuestion() {
  document.getElementById("explanation").innerHTML = "";
  const q = questions[current];
  document.getElementById("question").innerText = q.question;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(btn, option);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(button, selected) {
    const q = questions[current];
    const buttons = document.querySelectorAll("#answers button");
    buttons.forEach(btn => btn.disabled = true);
  
    if (selected === q.answer) {
      document.getElementById("correctSound").play();
      button.classList.add("correct");
      score++;
    } else {
      document.getElementById("wrongSound").play();
      button.classList.add("wrong");
    }
  
    document.getElementById("explanation").innerText = q.explanation;
    
    // Rendi visibile il bottone "Prossima"
    document.getElementById("nextBtn").style.display = "inline-block";
  }
  
function nextQuestion() {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    document.getElementById("question").innerText = "Fine del gioco!";
    document.getElementById("answers").innerHTML = "";
    document.getElementById("explanation").innerText = "";
    document.getElementById("score").innerText = `Hai totalizzato ${score} su ${questions.length} punti.`;
  }
  document.getElementById("nextBtn").style.display = "none";
}
