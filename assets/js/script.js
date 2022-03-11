var startButtonEl = document.getElementById('start-btn');
var questionPromptEl = document.getElementById('question');
var questionSection = document.querySelector(".buttons");
var quizBox = document.getElementById('quiz');
var quizHeader = document.getElementById('quiz-q-t');
var currentQuestion = 0;


var startGame = function () {
    startButtonEl.classList.add('hide');
    quizHeader.classList.remove('hide');
    quizBox.classList.remove('hide');
    questionAsked();
}




var grabQuestion = function () {

}





var questionObj = [
    {
        question: "What does DOM stand for?",
        choice: ['Dominos Over McDonalds', 'Documents Obscure Mainframe', 'Document Object Model', 'Data On Motherboard'],
        answer:2
    },
    {
        question: "Which represents a class in CSS",
        choice: [
            "<class>",
            "#class",
            "//class",
            ".class"],
        answer:3
    },
    {
        question: "What symbol indicates an array?",
        choice: [
            "(array)",
            "$array$",
            "/array/",
            "[array]"],
            answer:3
    }
];


var questionAsked = function () {
    //Creates question to be answered 
    questionPromptEl.innerText = questionObj[currentQuestion].question;

    document.getElementById("btn-a").innerText = questionObj[currentQuestion].choice[0];
    document.getElementById("btn-b").innerText = questionObj[currentQuestion].choice[1];
    document.getElementById("btn-c").innerText = questionObj[currentQuestion].choice[2];
    document.getElementById("btn-d").innerText = questionObj[currentQuestion].choice[3];



};



startButtonEl.addEventListener("click", startGame);
// questionAsked();


