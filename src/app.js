import { Game } from "./game.js";

async function takeWords() {
    const respond = await fetch('http://localhost:3000/words');
    const json = respond.json();
    return json;
}

async function updateWord(word, data) {
    const respond = await fetch('http://localhost:3000/words' + '/' + word, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const json = respond.json();
    return json;
}

const fromTag = document.querySelector('.from');
const toTag = document.querySelector('.to');
const actionButton = document.querySelector('.action');

function addNewWord(word) {
    const { from } = word;
    fromTag.value = from;
}
async function check(game) {
    const toWord = toTag.value;
    const currWord = game.getCurrentWord();
    const isCorrect = currWord
        .to.toLowerCase() === toWord.toLowerCase();

    if (isCorrect) {
        alert('Correct!');
        currWord.repeated += 1;
        await updateWord(currWord.id, currWord);
        const nextWord = game.nextWord();
        if (nextWord) {
            addNewWord(nextWord);
        } else {
            alert('You\'re great!');
        }
    } else {
        alert('Not correct =(');
    }
}


(async function start() {
    const words = await takeWords();
    const game = new Game(words);
    const checkWords = check.bind(null, game);

    actionButton.addEventListener('click', checkWords);

    game.start();
    addNewWord(game.nextWord());
})();