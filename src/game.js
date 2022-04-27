class Game {
    #learningWords = [];
    #words = [];
    #currentWord = null;
    constructor(words) {
        this.#learningWords = words;
        this.#words = words;
    }
    updateWords(newWords) {
        this.#words = newWords;
    }
    nextWord() {
        if (this.#learningWords.length) {
            this.#currentWord = this.#learningWords.pop();
            return this.#currentWord;
        } else {
            alert('The game is finished');
            this.#currentWord = null;
        }
    }
    getCurrentWord() {
        return this.#currentWord;
    }
    start(options) {
        this.#learningWords = this.#words;
    }

}

export {
    Game
}