var startButtonEl = document.getElementById('start-btn');
var questionPromptEl = document.getElementById('question');
var questionSection = document.querySelector(".buttons");
var quizBox = document.getElementById('quiz');
var quizHeader = document.getElementById('quiz-q-t');
var currentQuestion = 0;
var timerObj;
var timerCount = 60;
var score = 0;

var startGame = function () {
    startButtonEl.classList.add('hide');
    quizHeader.classList.remove('hide');
    quizBox.classList.remove('hide');
    timerObj = setInterval(function(){
        document.getElementById("count-down").innerText = timerCount;
        if(timerCount > 0){
            timerCount--;
        }else{
            clearInterval(timerObj);
            alert("Time up!")

            //make function to save to local storage
        }
    },1000)
    questionAsked();

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
    document.getElementById("progress").innerText = `Question ${currentQuestion+1} of  ${questionObj.length}`;


};

var checkAnswer = function(event){
    console.log(event.target.tagName);
    if(event.target.tagName == "BUTTON"){
        var userChoice = event.target.getAttribute("data-index");
        console.log(userChoice,"User choice");
        if(userChoice == questionObj[currentQuestion].answer){
            score+=5;
            document.getElementById("correct").innerHTML="Correct!";
        }
        else{
            timerCount -=5;
            document.getElementById("correct").innerHTML="Wrong!";
        }
        if(currentQuestion < questionObj.length - 1 ){
            currentQuestion++;
            questionAsked();
        }
        else{
            console.log(score,"score");
            clearInterval(timerObj);
            alert("End of quiz");


            saveGame(score); 


        }
    }
}

var saveGame = function(currentScore){
    //create space for user name 
    var scoreBoxEl = document.createElement("div");
    var inputNameEl = document.createElement("input");
    inputNameEl.setAttribute("type","text");
    inputNameEl.setAttribute("placeholder", "Enter your name");

    //create submit button
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.innerText = "SUBMIT";

    scoreBoxEl.appendChild(inputNameEl);
    scoreBoxEl.appendChild(submitBtn);


    quizBox.appendChild(scoreBoxEl);
    console.log("test");

    //hide other content to only display score 
    questionPromptEl.classList.add("hide");
    quizHeader.classList.add("hide");
    document.getElementById("question-choice").classList.add("hide");

    //take score and add it to display 
    document.getElementById("correct"). innerHTML = "You got a score of: " + currentScore; 

    //take user name and score and save it to local storage
    submitBtn.addEventListener("click", function(){
        localStorage.setItem("name", inputNameEl.innerText);
        localStorage.setItem("score", score);

    });

    console.log(inputNameEl.innerText);
    console.log(score);


}








startButtonEl.addEventListener("click", startGame);
// questionAsked();

document.getElementById("question-choice").addEventListener("click", checkAnswer);
