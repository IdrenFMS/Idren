const allQuestions = [
    { question: "Quelle est la clé d'une bonne relation client ?", answers: ["Empathie", "Rapidité", "Silence"], correct: "Empathie" },
    { question: "Quel canal est le plus utilisé ?", answers: ["Téléphone", "Email", "Chat"], correct: "Téléphone" },
    { question: "Comment gérer un client en colère ?", answers: ["L'ignorer", "Écouter", "Couper"], correct: "Écouter" },
    { question: "Pourquoi reformuler une demande ?", answers: ["Gagner du temps", "Montrer qu'on a compris", "Éviter de répondre"], correct: "Montrer qu'on a compris" },
    { question: "Que signifie la notion de ‘fidélisation’ ?", answers: ["Faire revenir un client", "Vendre plus cher", "Ignorer les plaintes"], correct: "Faire revenir un client" },
    { question: "Quel est l’impact d’une mauvaise relation client ?", answers: ["Perte de clients", "Augmentation des ventes", "Moins d’appels"], correct: "Perte de clients" },
    { question: "Qu’est-ce qu’une réponse assertive ?", answers: ["Respectueuse et ferme", "Agressive", "Indifférente"], correct: "Respectueuse et ferme" },
    { question: "Quel est un bon moyen d’apaiser un client mécontent ?", answers: ["L’interrompre", "Écouter et reformuler", "Raccrocher"], correct: "Écouter et reformuler" },
    { question: "Pourquoi poser des questions ouvertes ?", answers: ["Obtenir plus d’informations", "Fermer la discussion", "Déranger le client"], correct: "Obtenir plus d’informations" },
    { question: "Quelle est une bonne pratique pour gérer une réclamation ?", answers: ["Ignorer", "Faire preuve d’empathie", "Reporter la faute"], correct: "Faire preuve d’empathie" }
];

let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const startButton = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const questionText = document.getElementById("question-text");
const answersList = document.getElementById("answers-list");
const nextButton = document.getElementById("next-btn");
const resultMessage = document.getElementById("result-message");
const scoreTable = document.getElementById("score-table");
const scoreBody = document.getElementById("score-body");
const restartButton = document.getElementById("restart-btn");

// Fonction pour mélanger un tableau
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Lancer le quiz
startButton.addEventListener("click", () => {
    startButton.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    startQuiz();
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];

    // Tirage aléatoire de 5 questions
    selectedQuestions = shuffleArray([...allQuestions]).slice(0, 5);

    nextButton.innerText = "Suivant";
    resultMessage.innerText = "";
    scoreTable.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    loadQuestion();
}

function loadQuestion() {
    resetState();
    let currentQuestion = selectedQuestions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const li = document.createElement("li");
        li.innerText = answer;
        li.addEventListener("click", () => selectAnswer(li, answer, currentQuestion.correct));
        answersList.appendChild(li);
    });
}

function resetState() {
    nextButton.classList.add("hidden");
    answersList.innerHTML = "";
}

function selectAnswer(selectedLi, selectedAnswer, correctAnswer) {
    let options = document.querySelectorAll("li");
    options.forEach(option => option.classList.remove("selected"));

    selectedLi.classList.add("selected");

    userAnswers.push({ 
        question: selectedQuestions[currentQuestionIndex].question,
        selected: selectedAnswer,
        correct: correctAnswer,
        isCorrect: selectedAnswer === correctAnswer
    });

    if (selectedAnswer === correctAnswer) {
        score++;
        resultMessage.innerText = "✅ Bonne réponse !";
    } else {
        resultMessage.innerText = "❌ Mauvaise réponse...";
    }

    nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        loadQuestion();
        resultMessage.innerText = "";
    } else {
        showFinalScore();
    }
});

function showFinalScore() {
    questionText.innerText = `Quiz terminé ! Score : ${score}/${selectedQuestions.length}`;
    answersList.innerHTML = "";
    nextButton.classList.add("hidden");
    scoreTable.classList.remove("hidden");
    updateScoreTable();
}

function updateScoreTable() {
    scoreBody.innerHTML = "";
    userAnswers.forEach(entry => {
        let row = `<tr>
            <td>${entry.question}</td>
            <td>${entry.selected}</td>
            <td>${entry.correct}</td>
            <td>${entry.isCorrect ? "✅" : "❌"}</td>
        </tr>`;
        scoreBody.innerHTML += row;
    });
}

// Rejouer
restartButton.addEventListener("click", () => {
    scoreTable.classList.add("hidden");
    startButton.classList.remove("hidden");
});
