// call Id and class from the dom
var timeEl = document.querySelector(".Timeleft");
var startbuttonEL = document.getElementById("startbutton");
var boxText = document.getElementById("HeaderboxText");
var queastionEl = document.getElementById("queastions")
var choicesEl = document.getElementById("choicesContainer");
var hideEL = document.querySelector(".hide");
var quizboxEl = document.getElementById("quizbox");
 
var choices1 = document.getElementById("choice1");
var choices2 = document.getElementById("choice2");
var choices3 = document.getElementById("choice3");
var choices4 = document.getElementById("choice4");

choices1.addEventListener("click", choiceClick);
choices2.addEventListener("click", choiceClick);
choices3.addEventListener("click", choiceClick);
choices4.addEventListener("click", choiceClick);

var currentQuestion = 0;
var incrementingVariable = 0;
var answerCorrect = 0;


// queastion bank container all the queastions the choices and the correct answer in that queastion. 

var queastionBank = [
    {
        queastion: "Commonly used data types DO NOT include:",
        choices: [
            "strings",
            "booleans",
            "alerts",
            "numbers",],
        answer: 3,
    },

    {
        queastion: "The condition in an if / else statement is enclosed within ____.",
        choices: [
            "quotes",
            "curly brackets",
            "parentheses",
            "square brackets",],
        answer: 3,
    },

    {
        queastion: "Arrays in JavaScript can be used to store ____.",
        choices: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above",],
        answer: 4,
    },

     {
        queastion: "String values must be enclosed within ____ when being assigned to variables.",
        choices: [
            "commas",
            "curly brackets",
            "quotes",
            "parentheses",],
        answer:3,
    },

    {
        queastion: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: [
            "JavaScript",
            "terminal / bash",
            "for loops",
            "console.log",],
        answer: 4,
    },
];

function getChoices() {
    // Calling on queastion perqueastion bank 
    boxText.textContent = queastionBank[currentQuestion].queastion;
    choices1.textContent = queastionBank[currentQuestion].choices[0];
    choices2.textContent = queastionBank[currentQuestion].choices[1];
    choices3.textContent = queastionBank[currentQuestion].choices[2];
    choices4.textContent = queastionBank[currentQuestion].choices[3];

};

function choiceClick(event){
    const correctID = "choice" +  queastionBank[currentQuestion].answer;
    if (correctID === event.target.id){
        answerCorrect ++;
    }
    else{
        secondLeft -= 30;
    }
    currentQuestion++
    getChoices()
    endQuiz()
    console.log(answerCorrect)

};

// Fix end quiz queastion.
function endQuiz(){
    if(currentQuestion == 4)
    endScreen();
};

// ------Prompts user with how many correct answer they got and to put their information ----------//
function  endScreen(){
    boxText.textContent = "Please Enter your Intials"
    choicesEl.style.display="none";

    // CREAT user score
    var scoreBox = document.createElement("div");
    scoreBox.className = "scoreBox";
    scoreBox.innerHTML = "Your Scoreboard" +  "<br>" + answerCorrect
    quizboxEl.append(scoreBox);
    
    // Create a form dynamically
    var userInput = document.createElement("div");

    var inputBox = document.createElement("input");
    inputBox.setAttribute("type", "text");
    inputBox.setAttribute("id", "intialsEl");
    inputBox.setAttribute("maxlength", "2");  
    inputBox.setAttribute("placeholder", "Intiials");

    // create a submit button
     var submitBtn = document.createElement("button");
     submitBtn.setAttribute("type", "submit");
     submitBtn.setAttribute("id", "submit");
     submitBtn.textContent = "Submit"
     // Append the full name input to the form
     userInput.appendChild(inputBox);

    // Append the submit button to the form
    userInput.appendChild(submitBtn);

    // Append everything to the quiz box//
    quizboxEl.appendChild(userInput);

let userInt;
// -------------Get user score and store it into a gobal value----//   
submitBtn.onclick = function(){
    // making sure local storage isn't empty//
    userInt = document.getElementById("intialsEl").value;

    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    newScore = {
        User: userInt,
        userScore: answerCorrect,
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    location.href = "Highscore.html"
} ;


console.log(localStorage);


};





var secondLeft = 300;
// start the timer once the button is clicked
startbuttonEL.addEventListener("click", function () {
    var timerInterval = setInterval(function () {
        secondLeft--;
        var min = Math.floor(secondLeft / 60);
        var sec = secondLeft - (min * 60);


        
        if (secondLeft < 0) {
            secondLeft = 0;
        }

        if (secondLeft === 0) {
            clearInterval(timerInterval)
        }
        // updates timer with current time
        var message = min.toString() + ":" + sec;

        timeEl.textContent = message;

    }, 1000);

    // Hides the start button 
    startbuttonEL.style.display="none";
    choicesEl.style.display="flex";
    
    // Prompts Queastion 
    getChoices();
});


