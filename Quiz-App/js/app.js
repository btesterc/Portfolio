const questionList = [
    new Question("Which of the following is a semantic HTML element?", {a: "<div>", b: "<span>", c: "<article>", d: "<b>"}, "c" ),
    new Question("Which of these elements is used to define the main content of a document?", {a: "<aside>", b: "<header>", c: "<main>", d: " <section>"}, "c" ),
    new Question("Which tag is best used for emphasizing important text in a semantic way?", {a: "<strong>", b: "<i>", c: "<b>", d: "<span>"}, "a" )
]

const quiz = new Quiz(questionList);
const ui = new UI();

ui.btnStart.addEventListener("click", function(){
    startTimer(10);
    startTimerLine();
    ui.quizBox.classList.add("active");
    ui.buttonBox.classList.remove("active");
    ui.showQuestion(quiz.currentQuestion());
    ui.questionNumber(quiz.questionIndex + 1, quiz.questions.length);
    ui.btnNext.classList.remove("show");

})


ui.btnNext.addEventListener('click', function() {
    if(quiz.questions.length != quiz.questionIndex){
        startTimer(10);
        startTimerLine()
        ui.showQuestion(quiz.currentQuestion());
        ui.questionNumber(quiz.questionIndex + 1, quiz.questions.length)
        ui.btnNext.classList.remove("show")
       
    } else {
        ui.quizBox.classList.remove("active")
        ui.scoreBox.classList.add("active"); 
        ui.showBildboard(quiz.correctAnswer, quiz.questions.length);
    }
});


function optionSelected(e) {
    clearInterval(counter);
    clearInterval(counterline);
    let selectedElement = e.target;

    if (selectedElement.nodeName === "SPAN") {
        selectedElement = selectedElement.parentElement;
    }
    const pickedAnswer = selectedElement.textContent[0];
    const currentQuestion = quiz.currentQuestion();

    if (currentQuestion.control(pickedAnswer)) {
        quiz.correctAnswer += 1;
        selectedElement.classList.add("correct");
        selectedElement.insertAdjacentHTML("beforeend", ui.correctIcon );
    } else {
        selectedElement.classList.add("incorrect");
        selectedElement.insertAdjacentHTML("beforeend", ui.inCorrectIcon);
    }

    quiz.questionIndex += 1;
    ui.disableAlloption()
    ui.btnNext.classList.add("show")
};



ui.btnQuit.addEventListener("click", function(){
    window.location.reload()
});

ui.btnReplay.addEventListener("click", function(){
    quiz.questionIndex = 0;
    quiz.correctAnswer = 0;
    
    ui.btnStart.click()
    ui.scoreBox.classList.remove("active");
});


let counter;
function startTimer(time) {
    counter = setInterval(timer, 1000); 

    function timer () {
    ui.timeSecond.textContent = time

      time--
      
      if(time < 0) {
        clearInterval(counter);
        clearInterval(counterline);
        ui.disableAlloption();
        quiz.questionIndex += 1;
        ui.btnNext.classList.add("show")
      }
    }
}

let counterline;
function startTimerLine () {
    let lineWidth = 0;

    counterline = setInterval(timer, 20);

    function timer ( ) {
        lineWidth += 1;
        ui.timeLine.style.width = lineWidth + "px";

        if (lineWidth > 549) {
            clearInterval(counterLine);
        }
    }
}
