const questions = [
    {
        question: "going out or staying in?",
        answers: [
            {text: "going out", correct: false},
            {text: "staying in", correct: false},
            {text: "mix of both", correct: true},
        ]
    },
    {
        question: "dogs or cats?",
        answers: [
            {text: "dogs", correct: false},
            {text: "cats", correct: false},
            {text: "both are equal", correct: true},
        ]
    },
    {
        question: "movies or youtube?",
        answers: [
            {text: "movies", correct: true},
            {text: "youtube", correct: false},
            {text: "depends on the content", correct: false},
        ]
    },
    {
        question: "how often do you listen to music?",
        answers: [
            {text: "not much", correct: false},
            {text: "all the time", correct: true},
            {text: "sometimes", correct: false},
        ]
    },
    {
        question: "are you a morning or night person?",
        answers: [
            {text: "morning person", correct: false},
            {text: "night person", correct: false},
            {text: "right in the middle", correct: true},
        ]
    },
    {
        question: "dream vacation?",
        answers: [
            {text: "france", correct: false},
            {text: "japan", correct: true},
            {text: "los angeles", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML =
        questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = "true";
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "play again") {
        startQuiz();
        return;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();

    if (score < 3) {
        questionElement.innerHTML =
            `${score} out of ${questions.length} <br>
            I don't know if we'd get along`;
    } 
    else if (score >= 3 && score < 5) {
        questionElement.innerHTML =
            `${score} out of ${questions.length} <br>
            we would probably get along!`;
    } 
    else {
        questionElement.innerHTML =
            `${score} out of ${questions.length} <br>
            BE MY FRIEND!`;
    }

    nextButton.innerHTML = "play again";
    nextButton.style.display = "block";
}

startQuiz();