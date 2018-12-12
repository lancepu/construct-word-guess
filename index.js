const inquirer = require('inquirer')
const Word = require('./word')
const chalk = require('chalk')
let wordBank = ['hello', 'my', 'name', 'computer', 'microwave', 'gadget', 'helicopter']
let maxGuess = 15
let guessedNum = 1
let winCount = 0
let wordToGuess
let randomWord
let round = 1
let maxRound = 5

function getRandomWord(arr){
    randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
}

function initializeWord(){
    randomWord = getRandomWord(wordBank)
    wordToGuess = new Word(randomWord)
    wordToGuess.generateLetterArr()
    wordToGuess.displayLetters()
}

function startGame(){
    initializeWord()
    playGame()
}

function endGame() {
    console.log (chalk.blue(`Game over, you won ${chalk.green(winCount)} games!!!`))
    inquirer
        .prompt ([
            {
                name: 'confirm',
                type: 'list',
                choices: ['Yes', 'No'],
                message: chalk.blue('New Game? ')
            }
        ])
        .then (answer => {
            if (answer.confirm === "Yes") {
                round = 1
                startGame()
            }
            else console.log(chalk.green('GG, Good Bye!'))
        })
}

function playGame(){
    //make sure the input is a valid letter
    // regex /^[a-zA-Z]+$/
    let letters = /^[a-zA-Z]+$/
    if (round <= maxRound){
        if (guessedNum <= maxGuess) {
            inquirer
            .prompt ([
                {
                    name: 'guess',
                    message: 'Guess a letter: ',
                    validate: function(value) {
                        if (value.match(letters) && value.length === 1) {
                          return true;
                        }
                        console.log(chalk.red(' One character letters ONLY'));
                      }
                }
            ])
            .then (answer => {
                wordToGuess.guess(answer.guess)
                wordToGuess.displayLetters()

                if (wordToGuess.checkWin()) {
                   console.log(chalk.green('\nYou guessed the word!\n'))
                   winCount++
                   round++
                   guessedNum = 1
                   startGame()
                }else {
                    console.log (chalk.blue(`You have ${chalk.green(maxGuess - guessedNum)} guesses left!!!`))
                    guessedNum++
                    playGame()
                }
            })
        } else endGame()
    } else endGame()
    
}

startGame()
