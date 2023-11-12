//quiz ends with one answer problem

const infoElement = document.getElementById('randomInfo');
let correctAnswerIndex;
let correctAnswer;
let chosenProperty;
let originalInfo; // Store the original information separately
let additionalInfo; // Store the additional information separately
let filteredData;
let selectedHelpItem; // Store the selected item for the help button
let quizQuestions = [];
let score = 0;

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
// Fetch your data and set up the initial random information
fetch('/resources/foodData.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not okay');
        }
        return response.json();
    })
    .then(data => {
        filteredData = data.filter(item => 
            item["Kalória (kcal)"] && 
            item["Fehérje (g)"] && 
            item["Zsír (g)"] && 
            item["Szénhidrát (g)"] &&
            item["Élelmiszer"]
        );

        if (filteredData.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredData.length);
            const randomItem = filteredData[randomIndex];

            const baseProperties = ["Kalória (kcal)", "Fehérje (g)", "Zsír (g)", "Szénhidrát (g)"];
            const additionalProperties = Object.keys(randomItem).filter(prop => 
                !baseProperties.includes(prop) && 
                prop !== "Élelmiszer"
            );

            // Randomly choose a property for the initial random information
            chosenProperty = additionalProperties.length > 0
                ? additionalProperties[Math.floor(Math.random() * additionalProperties.length)]
                : baseProperties[Math.floor(Math.random() * baseProperties.length)];

            originalInfo = `${chosenProperty}: ${randomItem[chosenProperty]}`;
            correctAnswer = randomItem["Élelmiszer"];
            correctAnswerIndex = Math.floor(Math.random() * 4);

            // Set selectedHelpItem to the original item
            selectedHelpItem = randomItem;
            
            //new
            quizQuestions.push({
                originalInfo,
                correctAnswer,
                correctAnswerIndex,
                selectedHelpItem,
            });

            // Shuffle the quizQuestions array
            quizQuestions = shuffleArray(quizQuestions);

            infoElement.textContent = originalInfo;
        } else {
            infoElement.textContent = 'No items found with the specified properties.';
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

// ANSWER BUTTON FUNCTION

const answerButtons = document.querySelectorAll('.answer');

// Fetch your data and set up answer buttons
fetch('/resources/foodData.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not okay');
        }
        return response.json();
    })
    .then(data => {
        const filteredData = data.filter(item => 
            item["Kalória (kcal)"] && 
            item["Fehérje (g)"] && 
            item["Zsír (g)"] && 
            item["Szénhidrát (g)"] &&
            item["Élelmiszer"]
        );

        if (filteredData.length >= 4) {
            // Randomly assign correct answer to one of the buttons
            for (let i = 0; i < answerButtons.length; i++) {
                if (i === correctAnswerIndex) {
                    answerButtons[i].textContent = correctAnswer;
                } else {
                    const randomIndex = Math.floor(Math.random() * filteredData.length);
                    answerButtons[i].textContent = filteredData[randomIndex]["Élelmiszer"];
                    filteredData.splice(randomIndex, 1);
                }
            }
        } else {
            // Handle the case where there are not enough items in the data
            console.error('Not enough items in the data.');
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

// HELP BUTTON FUNCTION

const helpButton = document.getElementById('help');

function handleHelpButtonClick() {
    if (selectedHelpItem && correctAnswerIndex !== undefined) {
        const randomItem = selectedHelpItem; // Use the selectedHelpItem instead of filteredData[correctAnswerIndex]
        const properties = Object.keys(randomItem).filter(
            prop => prop !== "Élelmiszer" && prop !== chosenProperty
        );

        // Ensure that the properties are related to the originally selected "Élelmiszer"
        const originalItemProperties = Object.keys(selectedHelpItem).filter(
            prop => prop !== "Élelmiszer"
        );

        // Filter out properties that are not related to the originally selected "Élelmiszer"
        const filteredProperties = properties.filter(prop =>
            originalItemProperties.includes(prop)
        );

        // Choose a random additional property
        const randomAdditionalProperty =
            filteredProperties[Math.floor(Math.random() * filteredProperties.length)];

        additionalInfo = `${randomAdditionalProperty}: ${randomItem[randomAdditionalProperty]}`;
        infoElement.textContent = `${originalInfo}, ${additionalInfo}`;

        // Remove the event listener to prevent further clicks
        helpButton.removeEventListener('click', handleHelpButtonClick);
    } else {
        infoElement.textContent = 'No additional information available.';
    }
}

helpButton.addEventListener('click', handleHelpButtonClick);

// HELYES VÁLASZ ZÖLDDÉ CSINÁLÁSA

function handleButtonClick(event) {
    const clickedButton = event.target;
    const buttonIndex = Array.from(answerButtons).indexOf(clickedButton);

    if (buttonIndex === correctAnswerIndex) {
        // Change the background color to green for correct answer
        clickedButton.style.backgroundColor = 'green';

        // Increment the score when the answer is correct
        score++;

        // Disable all buttons after a correct answer
        disableAllButtons();

        alert('Correct answer!');
    } else {
        // Change the background color to red for wrong answer
        clickedButton.style.backgroundColor = 'red';

        // Change the background color to green for the correct answer
        answerButtons[correctAnswerIndex].style.backgroundColor = 'green';

        // Disable all buttons after a wrong answer
        disableAllButtons();

        alert('Wrong answer. Try again!');
    }
}

function disableAllButtons() {
    // Disable all buttons
    answerButtons.forEach(button => {
        button.removeEventListener('click', handleButtonClick);
        button.disabled = true;
    });
}

answerButtons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});


// QUIZZ WITH ME

// Define nextButton
const nextButton = document.getElementById('next');
let currentQuestionIndex = 0;
const totalQuestions = 5; // Set the total number of questions

// Function to load the next question
function loadQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        correctAnswerIndex = currentQuestion.correctAnswerIndex;
        correctAnswer = currentQuestion.correctAnswer;
        chosenProperty = Object.keys(currentQuestion.selectedHelpItem)[1]; // Using the first additional property

        originalInfo = currentQuestion.originalInfo;
        selectedHelpItem = currentQuestion.selectedHelpItem;

        // Check if the previous question was answered correctly
        const previousAnsweredCorrectly = answerButtons[correctAnswerIndex].style.backgroundColor === 'green';

        // Update the score based on the previous question
        if (currentQuestionIndex > 0 && previousAnsweredCorrectly) {
            score++;
        }

        console.log('Loaded question:', currentQuestion);
        console.log('Answered correctly:', previousAnsweredCorrectly);
        console.log('Score before:', score);

        infoElement.textContent = originalInfo;
        setAnswerButtons();

        // Enable the buttons for the current question
        enableButtons();

        // Remove the background colors
        resetButtonColors();
    } else {
        // Quiz ended
        infoElement.textContent = `Quiz Ended. Your score: ${score}`;
        nextButton.disabled = true;
    }
}

// Function to handle the "Next" button click
function handleNextButtonClick() {
    // Increment the question index
    currentQuestionIndex++;

    // Check if the previous question was answered correctly
    const previousAnsweredCorrectly = currentQuestionIndex > 1 && answerButtons[correctAnswerIndex].style.backgroundColor === 'green';

    console.log('currentQuestionIndex:', currentQuestionIndex);
    console.log('previousAnsweredCorrectly:', previousAnsweredCorrectly);
    console.log('score before:', score);

    // Increment the score if the previous question was answered correctly
    if (previousAnsweredCorrectly) {
        score++;
    }

    console.log('score after:', score);

    // Load the next question or display the final score
    if (currentQuestionIndex < totalQuestions) {
        loadQuestion();
    } else {
        // Quiz ended
        infoElement.textContent = `Quiz Ended. Your score: ${score}`;
        nextButton.disabled = true;
    }
}

// Set up event listeners for the "Next" button
function setUpEventListeners() {
    nextButton.addEventListener('click', handleNextButtonClick);
}

// Call the function to set up event listeners
setUpEventListeners();