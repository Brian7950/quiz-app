var startButtonEl = document.getElementById('start-btn');
var questionPromptEl = document.getElementById('question');
var questionSection = document.querySelector(".buttons");
var quizBox = document.getElementById('quiz');
var quizHeader = document.getElementById('quiz-q-t');
var submitButton = document.querySelector(".submitBtn");
var currentQuestion = 0;
var timerObj;
var timerCount = 60;
var score = 0;



var startGame = function () {
    startButtonEl.classList.add('hide');
    quizHeader.classList.remove('hide');
    quizBox.classList.remove('hide');
    timerObj = setInterval(function () {
        document.getElementById("count-down").innerText = timerCount;
        if (timerCount > 0) {
            timerCount--;
        } else {
            clearInterval(timerObj);
            alert("Time up!")

        }
    }, 1000)
    questionAsked();

}

//obejct list of questions to ask 
var questionObj = [
    {
        question: "What does DOM stand for?",
        choice: ['Dominos Over McDonalds', 'Documents Obscure Mainframe', 'Document Object Model', 'Data On Motherboard'],
        answer: 2
    },
    {
        question: "Which represents a class in CSS",
        choice: [
            "<class>",
            "#class",
            "//class",
            ".class"],
        answer: 3
    },
    {
        question: "What symbol indicates an array?",
        choice: [
            "(array)",
            "$array$",
            "/array/",
            "[array]"],
        answer: 3
    },
    {
        question: "What Does JSON stand for?",
        choice: [
            "JavaScript Object Notation",
            "Java Selects Only Null",
            "Jordans Success was Only Natural",
            "JavaScript Oriented Notation"],
        answer: 1
    }];


var questionAsked = function () {
    //Creates question to be answered 
    questionPromptEl.innerText = questionObj[currentQuestion].question;

    //list referencing options from object 
    document.getElementById("btn-a").innerText = questionObj[currentQuestion].choice[0];
    document.getElementById("btn-b").innerText = questionObj[currentQuestion].choice[1];
    document.getElementById("btn-c").innerText = questionObj[currentQuestion].choice[2];
    document.getElementById("btn-d").innerText = questionObj[currentQuestion].choice[3];
    document.getElementById("progress").innerText = `Question ${currentQuestion + 1} of  ${questionObj.length}`;


};

var checkAnswer = function (event) {
    console.log(event.target.tagName);
    if (event.target.tagName == "BUTTON") {
        var userChoice = event.target.getAttribute("data-index");
        console.log(userChoice, "User choice");
        if (userChoice == questionObj[currentQuestion].answer) {
            score += 5;
            document.getElementById("correct").innerHTML = "Correct!";
        }
        else {
            timerCount -= 10;
            document.getElementById("correct").innerHTML = "Wrong!";
        }
        if (currentQuestion < questionObj.length - 1) {
            currentQuestion++;
            questionAsked();
        }
        else {
            clearInterval(timerObj);
            alert("End of quiz");

            saveGame(score);
        }
    }
}


var saveGame = function (currentScore) {
    //create space for user name 
    var scoreBoxEl = document.createElement("div");
    var inputNameEl = document.createElement("input");
    inputNameEl.setAttribute("type", "text");
    inputNameEl.setAttribute("placeholder", "Enter your name");

    //create submit button
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.classList.add("submitBtn");
    submitBtn.setAttribute("id", "submitData");
    submitBtn.innerText = "SUBMIT";

    //attach input and submit buton to div scoreBoXEl
    scoreBoxEl.appendChild(inputNameEl);
    scoreBoxEl.appendChild(submitBtn);

    //attach the div to quiz box to diplay for user 
    quizBox.appendChild(scoreBoxEl);

    //hide other content to only display score 
    questionPromptEl.classList.add("hide");
    quizHeader.classList.add("hide");
    document.getElementById("question-choice").classList.add("hide");

    //take score and add it to display 
    document.getElementById("correct").innerHTML = "You got a score of: " + currentScore;

    //take name entered and score and add it to local storage by pressing button
    document.getElementById("submitData").addEventListener("click", userScore);

}

var userScore = function () {
    let user = document.querySelector("input");
    let userName = user.value;
    let userScore = score;

    //create and place values into player obj to keep info together
    let playerObj = {
        name: userName,
        score: userScore
    }

    //sending obj to local storage and converting to string 
    localStorage.setItem("user", JSON.stringify(playerObj));
}


//pressing start button 
startButtonEl.addEventListener("click", startGame);

//pressing quiz answer buttons 
document.getElementById("question-choice").addEventListener("click", checkAnswer);


