const inquirer = require('inquirer')
const Word = require('./word')
const chalk = require('chalk')
let wordBank = ['hello', 'my', 'name', 'computer', 'microwave', 'gadget', 'helicopter', 'boat', 'train', 'plane', 'hawk', 'light', 'chair', 'table', 'cat', 'dog', 'mouse', 'keyboard', 'window', 'door', 'exit', 'poster', 'book']
let maxGuess = 15
let guessedNum = 1
let winCount = 0
let wordToGuess
let randomWord
let round = 1
let maxRound = 0
let gameWordBank

function getRandomWord(arr){
    randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
}

function initializeWord(){
    randomWord = getRandomWord(gameWordBank)
    gameWordBank = gameWordBank.filter(w => w !== randomWord)
    wordToGuess = new Word(randomWord)
    wordToGuess.generateLetterArr()
    wordToGuess.displayLetters()
    playGame()
}

function startGame(){
    gameWordBank = wordBank
    inquirer
        .prompt([
            {
                name: 'mr',
                type: 'list',
                choices: ["5", "10", "15"],
                message: chalk.blue('How many words do you want to play? ')
            }
        ]) 
        .then (answer => {
            maxRound = parseInt(answer.mr)
            console.log(round)
            console.log(maxRound)
            if (maxRound !== 0) initializeWord()
        })
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
                gameWordBank = wordBank
                guessedNum = 1
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
                   initializeWord()
                }else {
                    console.log (chalk.blue(`\nYou have ${chalk.green(maxGuess - guessedNum)} guesses left!!!\n`))
                    guessedNum++
                    playGame()
                }
            })
        } else endGame()
    } else endGame()
    
}

startGame()
