const Letter = require('./letter')

const Word = function (word) {
    this.word = word
    this.wordArr = []
    this.displayString = ''
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
        for (let i = 0; i < this.wordArr.length; i++){
           this.wordArr[i].takeGuess(inputLetter)
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