const infoElement = document.getElementById('randomInfo');
let correctAnswerIndex;
let correctAnswer;
let chosenProperty;
let originalInfo;
let additionalInfo;
let filteredData;
let selectedHelpItem;
let quizQuestions = [];
let score = 0;
let currentQuestionIndex = 0;

// Function to shuffle an array
function shuffleArray(array) {
    // Check if the array is defined
    if (array && Array.isArray(array)) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    } else {
        console.error("Input is not a valid array.");
    }

    return array;
}

// Reset the background colors of all answer buttons
function resetButtonColors() {
    answerButtons.forEach(button => {
        button.style.backgroundColor = '';
    });
}

// Function to load the next question
function loadQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
        const currentQuestion = quizQuestions[currentQuestionIndex];

        // Ensure that the current question is defined
        if (currentQuestion) {
            // Set correctAnswerIndex and correctAnswer for the current question
            correctAnswerIndex = currentQuestion.correctAnswerIndex;
            correctAnswer = currentQuestion.correctAnswer;

            // Check if the previous question was answered correctly
            const previousAnsweredCorrectly = answerButtons[correctAnswerIndex].style.backgroundColor === 'green';

            // Update the score based on the previous question
            if (currentQuestionIndex > 0 && previousAnsweredCorrectly) {
                score++;
            }

            console.log('Loaded question:', currentQuestion);
            console.log('Answered correctly:', previousAnsweredCorrectly);
            console.log('Score before:', score);

            // Display the new question and answer choices
            originalInfo = currentQuestion.originalInfo;
            selectedHelpItem = currentQuestion.selectedHelpItem;
            infoElement.textContent = originalInfo;

            // Set new answer choices
            setAnswerButtons();

            // Enable the buttons for the current question
            enableButtons();

            // Remove the background colors
            resetButtonColors();
        } else {
            console.error("Current question is undefined.");
        }
    } else {
        // Quiz ended
        infoElement.textContent = `Quiz Ended. Your score: ${score}`;
        nextButton.disabled = true;
    }
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
        // Ensure that data is an array and not empty
        if (Array.isArray(data) && data.length > 0) {
            filteredData = data.filter(item => 
                item["Kalória (kcal)"] && 
                item["Fehérje (g)"] && 
                item["Zsír (g)"] && 
                item["Szénhidrát (g)"] &&
                item["Élelmiszer"]
            );

            // Ensure that filteredData is an array and not empty
            if (Array.isArray(filteredData) && filteredData.length > 0) {
                // Create quiz questions
                for (let i = 0; i < 5; i++) {
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

                    // Create an array of answer choices including the correct answer
                    const answerChoices = [correctAnswer];

                    // Ensure that answerChoices is an array and not empty
                    if (Array.isArray(answerChoices) && answerChoices.length > 0) {
                        // Add incorrect answer choices
                        while (answerChoices.length < 4) {
                            const randomIncorrectIndex = Math.floor(Math.random() * filteredData.length);
                            const randomIncorrectItem = filteredData[randomIncorrectIndex]["Élelmiszer"];

                            // Ensure that the incorrect answer is not already in answerChoices
                            if (!answerChoices.includes(randomIncorrectItem)) {
                                answerChoices.push(randomIncorrectItem);
                            }
                        }

                        // Shuffle the answer choices
                        const shuffledChoices = shuffleArray(answerChoices);

                        // Set correctAnswerIndex based on the new position of the correct answer
                        correctAnswerIndex = shuffledChoices.indexOf(correctAnswer);

                        // Add the question to the quizQuestions array
                        quizQuestions.push({
                            originalInfo,
                            correctAnswer,
                            correctAnswerIndex,
                            selectedHelpItem,
                            answerChoices: shuffledChoices, // Assign shuffled choices to answerChoices
                        });
                    } else {
                        console.error("answerChoices is not a valid array or is empty:", answerChoices);
                    }
                }


                // Shuffle the quizQuestions array
                quizQuestions = shuffleArray(quizQuestions);

                // Display the first question
                loadQuestion();
            } else {
                infoElement.textContent = 'No items found with the specified properties.';
            }
        } else {
            console.error("Fetched data is not a valid array or is empty:", data);
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });


// ANSWER BUTTON FUNCTION

const answerButtons = document.querySelectorAll('.answer');

// Function to set up answer buttons for the current question
function setAnswerButtons() {
    // Get the current question
    const currentQuestion = quizQuestions[currentQuestionIndex];

    // Ensure that the current question is defined
    if (currentQuestion) {
        // Log the current question to the console for debugging
        console.log('Current Question:', currentQuestion);

        // Create an array of answer choices including the correct answer
        const answerChoices = currentQuestion.answerChoices;

        // Ensure that answerChoices is an array and not empty
        if (Array.isArray(answerChoices) && answerChoices.length > 0) {
            // Log the answer choices to the console for debugging
            console.log('Answer Choices:', answerChoices);

            // Shuffle the array
            const shuffledChoices = shuffleArray(answerChoices);

            // Ensure that shuffledChoices is an array and not empty
            if (Array.isArray(shuffledChoices) && shuffledChoices.length > 0) {
                //Log the shuffles choices to the console for debugging
                console.log('Shuffled Choices:', shuffledChoices);
                
                // Assign the shuffled choices to the buttons
                for (let i = 0; i < answerButtons.length; i++) {
                    answerButtons[i].textContent = shuffledChoices[i];
                }
            } else {
                console.error("shuffledChoices is not a valid array or is empty:", shuffledChoices);
            }
        } else {
            console.error("answerChoices is not a valid array or is empty:", answerChoices);
        }
    } else {
        console.error("Current question is undefined.");
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
    if (currentQuestionIndex < quizQuestions.length) {
        // Load a new question
        loadQuestion();
    } else {
        // Quiz ended
        infoElement.textContent = `Quiz Ended. Your score: ${score}`;
        nextButton.disabled = true;
    }
}

// Set up event listener for the "Next" button
const nextButton = document.getElementById('next');
nextButton.addEventListener('click', handleNextButtonClick);

// HELP BUTTON FUNCTION

const helpButton = document.getElementById('help');

function handleHelpButtonClick() {
    if (selectedHelpItem && correctAnswerIndex !== undefined) {
        const randomItem = selectedHelpItem;
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
    const selectedAnswer = clickedButton.textContent;

    // Find the index of the selected answer
    const selectedAnswerIndex = quizQuestions[currentQuestionIndex].answerChoices.indexOf(selectedAnswer);

    if (selectedAnswerIndex === quizQuestions[currentQuestionIndex].correctAnswerIndex) {
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

        // Find the correct answer button and change its background color to green
        answerButtons[quizQuestions[currentQuestionIndex].correctAnswerIndex].style.backgroundColor = 'green';

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

function enableButtons() {
    // Enable all buttons
    answerButtons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
        button.disabled = false;
    });
}