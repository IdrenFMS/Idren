const questions = [
    { question: "Quel est le premier réflexe face à un client en colère ?", answers: ["Couper l'appel", "Écoute active", "Expliquer immédiatement la politique de l'entreprise"], correct: 1 },
    { question: "Quelle technique permet de désamorcer un conflit ?", answers: ["Hausser le ton", "Reformulation", "Ignorer"], correct: 1 },
    { question: "Quelle est la meilleure attitude face à une réclamation ?", answers: ["Rester calme et empathique", "Rappeler les conditions générales", "Reporter le problème"], correct: 0 },
    { question: "Pourquoi est-il important de reformuler les propos du client ?", answers: ["Gagner du temps", "Vérifier la compréhension", "Démontrer son expertise"], correct: 1 },
    { question: "Que faire si un client refuse la solution proposée ?", answers: ["Le menacer", "Proposer une alternative", "Mettre fin à l'appel"], correct: 1 },
    { question: "Quelle est la clé d'une bonne relation client ?", answers: ["Empathie", "Rapidité", "Silence"], correct: "Empathie" },
    { question: "Quel canal est le plus utilisé ?", answers: ["Téléphone", "Email", "Chat"], correct: "Email" },
    { question: "Comment gérer un client en colère ?", answers: ["L'ignorer", "Écouter", "Couper"], correct: "Écouter" },
    { question: "Pourquoi reformuler une demande ?", answers: ["Gagner du temps", "Montrer qu'on a compris", "Éviter de répondre"], correct: "Montrer qu'on a compris" },
    { question: "Que signifie la notion de ‘fidélisation’ ?", answers: ["Faire revenir un client", "Vendre plus cher", "Ignorer les plaintes"], correct: "Faire revenir un client" },
    { question: "Quel est l’impact d’une mauvaise relation client ?", answers: ["Perte de clients", "Augmentation des ventes", "Moins d’appels"], correct: "Perte de clients" },
    { question: "Qu’est-ce qu’une réponse assertive ?", answers: ["Respectueuse et ferme", "Agressive", "Indifférente"], correct: "Respectueuse et ferme" },
    { question: "Quel est un bon moyen d’apaiser un client mécontent ?", answers: ["L’interrompre", "Écouter et reformuler", "Raccrocher"], correct: "Écouter et reformuler" },
    { question: "Pourquoi poser des questions ouvertes ?", answers: ["Obtenir plus d’informations", "Fermer la discussion", "Déranger le client"], correct: "Obtenir plus d’informations" },
    { question: "CRCD ?", answers: ["Conseil Relation Distance", "Conseiller Relation Clientèle à Distance" "Caribou Rapide Cours à Dakar"], correct: "Conseiller Relation Clientèle à Distance" },
    { question: "Quelle est une bonne pratique pour gérer une réclamation ?", answers: ["Ignorer", "Faire preuve d’empathie", "Reporter la faute"], correct: "Faire preuve d’empathie" }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswerIndex = null;
let availableQuestions = [];

function startGame() {
    score = 0;
    currentQuestionIndex = 0;
    availableQuestions = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("result-container").style.display = "none";
    showQuestion();
}

function showQuestion() {
    const questionData = availableQuestions[currentQuestionIndex];
    document.getElementById("question-container").textContent = questionData.question;
    
    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";
    
    questionData.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => selectAnswer(button, index);
        answersContainer.appendChild(button);
    });

    document.getElementById("next-btn").style.display = "none";
    selectedAnswerIndex = null;
}

function selectAnswer(button, index) {
    if (selectedAnswerIndex !== null) return;

    selectedAnswerIndex = index;
    const correctIndex = availableQuestions[currentQuestionIndex].correct;

    document.querySelectorAll("#answers-container button").forEach((btn, i) => {
        btn.classList.add(i === correctIndex ? "correct" : "wrong");
        btn.disabled = true;
    });

    if (index === correctIndex) score++;

    document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
    if (currentQuestionIndex < availableQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    document.getElementById("score").textContent = score;
}

document.getElementById("next-btn").onclick = nextQuestion;
document.getElementById("retry-btn").onclick = startGame;

startGame();
