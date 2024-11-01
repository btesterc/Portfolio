const APIKEY = config.API;
 const questionList = [];

 fetch(`https://quizapi.io/api/v1/questions?apiKey=${APIKEY}&limit=10`)
    .then((promise) => promise.json())
    .then((data) => {
        console.log(data[0])
        for (question of data) {
            const qText = question.question;
            const qAnswers = {
                a: question.answers.answer_a,
                b: question.answers.answer_b,
                c: question.answers.answer_c,
                d: question.answers.answer_d};
                
            const correctAnswers = question.correct_answers;
            console.log(correctAnswers)
            let correctA;
            for (let key in correctAnswers) {
                if (correctAnswers[key] === "true") {
                    correctA = key[7]; 
                    break;
                }
            }

            
            const newQuestion = new Question(qText, qAnswers, correctA)

            questionList.push(newQuestion)

        }  
        console.log(questionList)
    })
    

    function Question(text, answers, corretAnswer) {
        this.text = text;
        this.answers = answers;
        this. corretAnswer = corretAnswer;
    }
    
    Question.prototype.control = function(answer) {
        return  answer === this.corretAnswer;
    }
    

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
