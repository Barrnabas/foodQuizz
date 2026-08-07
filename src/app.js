const hungarianLabels = {
    calories: "kalória",
    protein: "fehérje",
    fat: "zsír",
    carbs: "szénhidrát",
    calcium: "kalcium",
    cholesterol: "koleszterin",
    fiber: "élelmi rost",
    potassium: "kálium",
    vitaminC: "c-vitamin",
    sodium: "nátrium",
    caffeine: "koffein",
    phosphoricAcid: "foszforsav"
};
let myGame = {
    score: 0,
    questionNumber: 0,
    currentCorrectFood: null,
    currentQuestionNutrient: null,
    database: [],
    roundIsActive: false,
    maxQuestions: 10,
};
const hintTextElement = document.getElementById('randomInfo');
const scoreElement = document.getElementById('scoreText');
const questionElement = document.getElementById('questionText');
const answerButtons = document.querySelectorAll('.answer');
const optionsContainer = document.getElementById('options');
const helpButton = document.getElementById('help');
const nextButton = document.getElementById('next');
const restartButton = document.getElementById('restart');
async function fetchDatabase() {
    const response = await fetch('https://api.npoint.io/51a68cb2d9a6e9dd8924');
    return await response.json();
}
async function startGame() {
    myGame.database = await fetchDatabase();
    dealNewRound();
}
function getRandomFood(foods) {
    if (foods.length === 0) {
        throw new Error("The food array cannot be empty!");
    }
    let randomizedIndex = Math.floor(Math.random() * foods.length);
    return foods[randomizedIndex];
}
function generateRoundOptions(database) {
    let optionsBucket = [];
    for (let i = 0; i < 4; i++) {
        let randomChoice = getRandomFood(database);
        optionsBucket.push(randomChoice);
    }
    return optionsBucket;
}
function getAllFoodNames(foods) {
    let names = [];
    for (const item of foods) {
        names.push(item.name);
    }
    return names;
}
function isRightAnswer(selectedFood, correctFood) {
    return selectedFood === correctFood.name;
}
function handleGuess(selectedFood, correctFood) {
    if (isRightAnswer(selectedFood, correctFood)) {
        myGame.score += 1;
    }
    myGame.questionNumber += 1;
}
function createQuestion(food) {
    let allKeys = Object.keys(food);
    let nutrientKeys = allKeys.filter(key => key !== "name");
    let randomIndex = Math.floor(Math.random() * nutrientKeys.length);
    let selectedNutrient = nutrientKeys[randomIndex];
    if (selectedNutrient === undefined) {
        throw new Error("Could not find any nutrients for this food!");
    }
    myGame.currentQuestionNutrient = selectedNutrient;
    let amount = food[selectedNutrient];
    let hungarianName = hungarianLabels[selectedNutrient];
    return `Melyik élelmiszerben van ${amount} ${hungarianName}?`;
}
function dealNewRound() {
    myGame.roundIsActive = true;
    resetButtonColors();
    if (nextButton !== null) {
        nextButton.style.display = 'none';
    }
    if (helpButton !== null) {
        helpButton.style.display = 'inline-block';
    }
    const roundFoods = generateRoundOptions(myGame.database);
    const targetFood = getRandomFood(roundFoods);
    myGame.currentCorrectFood = targetFood;
    const question = createQuestion(targetFood);
    const optionNames = getAllFoodNames(roundFoods);
    updateScreen(question, optionNames);
}
function endGame() {
    if (optionsContainer !== null) {
        optionsContainer.style.display = 'none';
    }
    if (helpButton !== null) {
        helpButton.style.display = 'none';
    }
    if (nextButton !== null) {
        nextButton.style.display = 'none';
    }
    if (restartButton !== null) {
        restartButton.style.display = 'inline-block';
    }
    if (hintTextElement !== null) {
        let titleElement = hintTextElement.previousElementSibling;
        if (titleElement)
            titleElement.textContent = "Eredmény:";
        hintTextElement.innerHTML = `<strong>Vége a játéknak!</strong><br><br>Végső pontszámod: <strong>${myGame.score} / ${myGame.maxQuestions}</strong>`;
    }
}
function handleRestartClick() {
    myGame.score = 0;
    myGame.questionNumber = 0;
    if (helpButton !== null) {
        helpButton.disabled = false;
    }
    if (restartButton !== null) {
        restartButton.style.display = 'none';
    }
    if (optionsContainer !== null) {
        optionsContainer.style.display = 'flex';
    }
    if (hintTextElement !== null) {
        let titleElement = hintTextElement.previousElementSibling;
        if (titleElement)
            titleElement.textContent = "Egy információ rólam:";
    }
    dealNewRound();
}
function updateScreen(question, options) {
    if (hintTextElement !== null) {
        hintTextElement.textContent = question;
    }
    for (let i = 0; i < answerButtons.length; i++) {
        let currentOption = options[i];
        let button = answerButtons[i];
        if (currentOption !== undefined && button !== undefined) {
            button.textContent = currentOption;
        }
    }
}
function updateScoreBoard() {
    if (scoreElement != null && questionElement !== null) {
        scoreElement.textContent = myGame.score.toString();
        questionElement.textContent = myGame.questionNumber.toString();
    }
}
function resetButtonColors() {
    for (let i = 0; i < answerButtons.length; i++) {
        let button = answerButtons[i];
        if (button !== undefined) {
            button.classList.remove('correct', 'wrong');
        }
    }
}
function handleAnswerClick(button) {
    if (!myGame.roundIsActive)
        return;
    let guessedName = button.textContent;
    if (guessedName === null || myGame.currentCorrectFood === null)
        return;
    myGame.roundIsActive = false;
    let isCorrect = isRightAnswer(guessedName, myGame.currentCorrectFood);
    if (isCorrect) {
        button.classList.add('correct');
    }
    else {
        button.classList.add('wrong');
        for (let j = 0; j < answerButtons.length; j++) {
            let btn = answerButtons[j];
            if (btn && btn.textContent === myGame.currentCorrectFood.name) {
                btn.classList.add('correct');
            }
        }
    }
    handleGuess(guessedName, myGame.currentCorrectFood);
    updateScoreBoard();
    if (nextButton !== null) {
        nextButton.style.display = 'inline-block';
    }
    if (helpButton !== null) {
        helpButton.style.display = 'none';
    }
}
function handleHelpClick() {
    if (!myGame.roundIsActive || myGame.currentCorrectFood === null || myGame.currentQuestionNutrient === null)
        return;
    let food = myGame.currentCorrectFood;
    let allKeys = Object.keys(food);
    let hintKeys = allKeys.filter(key => key !== "name" && key !== myGame.currentQuestionNutrient);
    if (hintKeys.length === 0)
        return;
    let randomHintIndex = Math.floor(Math.random() * hintKeys.length);
    let hintNutrient = hintKeys[randomHintIndex];
    if (hintNutrient === undefined)
        return;
    let amount = food[hintNutrient];
    let hungarianName = hungarianLabels[hintNutrient];
    if (hintTextElement !== null) {
        hintTextElement.innerHTML += `<br><br>Segítség: ${amount} ${hungarianName} is van benne`;
    }
    if (helpButton !== null) {
        helpButton.disabled = true;
    }
}
function handleNextClick() {
    if (myGame.questionNumber >= myGame.maxQuestions) {
        endGame();
    }
    else {
        dealNewRound();
    }
}
function setupClickListeners() {
    for (let i = 0; i < answerButtons.length; i++) {
        let button = answerButtons[i];
        if (button === undefined)
            continue;
        button.addEventListener('click', () => handleAnswerClick(button));
    }
    if (helpButton !== null) {
        helpButton.addEventListener('click', handleHelpClick);
    }
    if (nextButton !== null) {
        nextButton.addEventListener('click', handleNextClick);
    }
    if (restartButton !== null) {
        restartButton.addEventListener('click', handleRestartClick);
    }
}
setupClickListeners();
startGame();
export {};
//# sourceMappingURL=app.js.map