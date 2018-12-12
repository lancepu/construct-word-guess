const Letter = require('./letter')
const chalk = require('chalk')

const Word = function (word) {
    this.word = word
    this.wordArr = []
    this.displayString = ''
    this.correctCount = 0
    //split the word into array and construct the letters
    this.generateLetterArr = function() {
        let tempArr = this.word.split('')
        for (i = 0; i < tempArr.length; i++) {
            this.wordArr.push(new Letter(tempArr[i]))
        }
    }

    this.displayLetters = function() {
        this.displayString = ''
        for (let i = 0; i < this.wordArr.length; i++){
            let tempStr = this.wordArr[i].display()
            this.displayString += tempStr + ' '
        }

        console.log(this.displayString)
    }

    this.guess = function(inputLetter) {
        let guessed = 0;
        for (let i = 0; i < this.wordArr.length; i++){
           this.wordArr[i].takeGuess(inputLetter)
           if (this.wordArr[i].guessed) guessed++
        }
        this.checkCorrect(guessed)
    }

    this.checkCorrect = function(guessedCount) {
        if (guessedCount > this.correctCount) {
            this.correctCount = guessedCount
            console.log(chalk.green("\n-----CORRECT!!!-----\n"))
        } else {
            console.log(chalk.red("\n-----INCORRECT!!!-----\n"))
        }
    }

    this.checkWin = function() {
        let win = true
        for (let i = 0; i < this.wordArr.length; i++){
            if (!this.wordArr[i].guessed) return win = false
        }
        return win
    }
}

module.exports = Word