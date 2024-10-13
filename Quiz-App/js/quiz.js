function Quiz(questions) {
    this.questionIndex = 0;
    this.questions = questions;
    this.correctAnswer = 0;
}

Quiz.prototype.currentQuestion = function() {
    return this.questions[this.questionIndex]

}


