const Letter = function(val, guessed = false){
    this.val = val.toUpperCase(),
    this.guessed = guessed

    this.display = function() {
        if (this.val !== ' '){
            if (this.guessed) return this.val
            else return '_'
        } else {
            this.guessed = true
            return ' '
        }
    }

    this.takeGuess = function(input) {
        if (!this.guessed) {
            if (input.toUpperCase() === this.val) {
                this.guessed = true
            }
        }
       
    }
}

module.exports = Letter