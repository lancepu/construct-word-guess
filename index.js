const inquirer = require('inquirer')
const Word = require('./word')
let wordBank = ['hello', 'my', 'name', 'computer', 'microwave']
let maxGuess = 10
let guessedNum = 1
let winCount
let wordToGuess
let randomWord
let round = 1
let maxRound = 3

function getRandomWord(arr){
    randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
}

// function getGameRound() {
//     inquirer.prompt([
//         {
//             name: 'round',
//             message: 'how many rounds do you want to play?',
//             validate: function(value) {
//                 if (isNaN(value) === false && parseInt(value) <= 5) {
//                   return true;
//                 }
//                 console.log('Enter a number less than 5');
//               }
//         }
//     ]).then(answer => {
//         return parseInt(answer.round)
//     })
// }

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
    inquirer
        .prompt ([
            {
                name: 'confirm',
                type: 'list',
                choices: ['Yes', 'No'],
                message: 'Game Over. New Game? '
            }
        ])
        .then (answer => {
            if (answer.confirm === "Yes") {
                round = 1
                startGame()
            }
            else console.log('GG, Good Bye!')
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
                        console.log('One character letters ONLY');
                      }
                }
            ])
            .then (answer => {
                wordToGuess.guess(answer.guess)
                wordToGuess.displayLetters()
                if (wordToGuess.checkWin()) {
                   console.log('Correct')
                   round++
                   guessedNum = 1
                   startGame()
                }else {
                    guessedNum++
                    playGame()
                }
            })
        }
    } else {
        console.log('you win!')
        endGame()
    }
    
}

startGame()
