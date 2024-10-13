function Question(text, answers, corretAnswer) {
    this.text = text;
    this.answers = answers;
    this. corretAnswer = corretAnswer;
}

Question.prototype.control = function(answer) {
    return  answer === this.corretAnswer;
}



