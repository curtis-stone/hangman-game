class Hangman {
    constructor(word, remainingGuesses) {
    this.word = word.toLowerCase().split('') /* converts words to lower case 
    and splits out each string (word) into its own array */
    this.remainingGuesses = remainingGuesses // object property
    this.guessedLetters = [] // object property
    this.status = 'playing'
}
get puzzle() { // "get" is used for when code fetches data in app"
    let puzzle = ''
    this.word.forEach((letter) => { // creates astrics if guessedLetters are not in puzzle 
        if (this.guessedLetters.includes(letter) || letter === ' ') {
            puzzle += letter // if guessedLetter is in puzzle, it fills the astric
        } else {
            puzzle += '*' // if guessedLetter not in puzzle, there is an astric
        }
    }) 

    return puzzle
}
calculateStatus() {
    const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')
    if (this.remainingGuesses === 0) {
        this.status = 'failed'
    } else if (finished) {
        this.status = 'finished'
    } else {
        this.status = 'playing'
    }
}
makeGuess(guess) {
    guess = guess.toLowerCase() // makes the guess case insensitive since this game will be case insensitive!
    const uniqueGuess = !this.guessedLetters.includes(guess) // variable is true guess is not in guessedLEtters array (for adding to guessedLetters)
    const badGuess = !this.word.includes(guess) // variable is true guess is not in guessedLEtters array, (for subtracting num of guesses)
    // const goodGuess = this.guessedLetters.includes(guess)
    
    if (this.status !== 'playing') {
        return // returning nothing stops code from running and going to negative guesses
    }
    if (uniqueGuess) {
        this.guessedLetters= [...this.guessedLetters, guess]
    } // if not included already, guess is pushed to guessedLetters
    if (uniqueGuess && badGuess) {
        this.remainingGuesses--
    } // if unique && badGuess is true, the total num of guesses is decremented by 1
    
    this.calculateStatus()
}
get statusMessage() { // "get" is used for when code fetches data in app"
    if (this.status === 'playing') {
        return `Guesses left: ${this.remainingGuesses}`
    }

    else if (this.status === 'failed') {
    return `Oops, you lost! the word was "${this.word.join('')}".`
     }
     
     else { 
         return 'Congrats, you guessed the word!'}
}
}

export { Hangman as default }